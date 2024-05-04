import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import dateToString from 'utils/helpers/date-to-string.helper';
import './Editor.styles.scss';
import ArticleService from 'services/article';
import { axiosInstance } from 'utils/axios';

const Editor = (): JSX.Element => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title ?? '');
  const [description, setDescription] = useState(state?.desription ?? '');
  const [image, setImage] = useState();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState(state?.category ?? 0);

  const upload = async (): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await axiosInstance.post('/upload', formData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const descriptionDiv = useRef(null);

  useEffect(() => {
    descriptionDiv.current.innerHTML = description;

    const fetchCategories = async (): Promise<void> => {
      try {
        const categories = await ArticleService.getCategories()
        setCategories(categories);
      } catch (error) {
        console.log(error)

        navigate('*')
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = './editor.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const navigate = useNavigate();

  const handleClick = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    const imageName: string = await upload();

    try {
      const date = dateToString(new Date());
      state !== null
        ? await ArticleService.updateArticle(state.id, [title, description, imageName])
        : await ArticleService.createArticle({ title, description, image: imageName, category, date });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='editor'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={(event) => { setTitle(event.target.value); }} />

        <div className="editor-container">
          <div className="editor">
            <div className="container">
              <div className="options">
                <button id="bold" className="option-button format">
                  <i className="fa-solid fa-bold"></i>
                </button>
                <button id="italic" className="option-button format">
                  <i className="fa-solid fa-italic"></i>
                </button>
                <button id="underline" className="option-button format">
                  <i className="fa-solid fa-underline"></i>
                </button>
                <button id="strikethrough" className="option-button format">
                  <i className="fa-solid fa-strikethrough"></i>
                </button>
                <button id="superscript" className="option-button script">
                  <i className="fa-solid fa-superscript"></i>
                </button>
                <button id="subscript" className="option-button script">
                  <i className="fa-solid fa-subscript"></i>
                </button>
                <button id="insertOrderedList" className="option-button">
                  <div className="fa-solid fa-list-ol"></div>
                </button>
                <button id="insertUnorderedList" className="option-button">
                  <i className="fa-solid fa-list"></i>
                </button>
                <button id="undo" className="option-button">
                  <i className="fa-solid fa-rotate-left"></i>
                </button>
                <button id="redo" className="option-button">
                  <i className="fa-solid fa-rotate-right"></i>
                </button>
                <button id="createLink" className="adv-option-button create-link">
                  <i className="fa fa-link"></i>
                </button>
                <button id="unlink" className="option-button">
                  <i className="fa fa-unlink"></i>
                </button>
                <button id="justifyLeft" className="option-button align">
                  <i className="fa-solid fa-align-left"></i>
                </button>
                <button id="justifyCenter" className="option-button align">
                  <i className="fa-solid fa-align-center"></i>
                </button>
                <button id="justifyRight" className="option-button align">
                  <i className="fa-solid fa-align-right"></i>
                </button>
                <button id="justifyFull" className="option-button align">
                  <i className="fa-solid fa-align-justify"></i>
                </button>
                <button id="indent" className="option-button spacing">
                  <i className="fa-solid fa-indent"></i>
                </button>
                <button id="outdent" className="option-button spacing">
                  <i className="fa-solid fa-outdent"></i>
                </button>
                <select id="formatBlock" className="adv-option-button">
                  <option value="H1">H1</option>
                  <option value="H2">H2</option>
                  <option value="H3">H3</option>
                  <option value="H4">H4</option>
                  <option value="H5">H5</option>
                  <option value="H6">H6</option>
                </select>
                <select id="fontName" className="adv-option-button"></select>
                <select id="fontSize" className="adv-option-button"></select>
                <div className="input-wrapper">
                  <input type="color" id="foreColor" className="adv-option-button" />
                  <label htmlFor="foreColor">Font Color</label>
                </div>
                <div className="input-wrapper">
                  <input type="color" id="backColor" className="adv-option-button" />
                  <label htmlFor="backColor">Highlight Color</label>
                </div>
              </div>
              <div id="text-input" ref={descriptionDiv} contentEditable="true" onInput={(event) => { setDescription(event.currentTarget.innerHTML); }}></div>
            </div>
          </div>
        </div>
        <script>
    </script>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: 'none' }} type="file" id="file" onChange={(event) => { setImage(event.target.files[0]); } } />
          <label className='file' htmlFor="file">Upload image</label>

          <div className="buttons">
            <button>
              Save as a draft
            </button>
            <button onClick={handleClick}>
              Publish
            </button>
          </div>
        </div>
        <div className="item">
          <h1>
            Category
          </h1>
          {categories?.map((category) => (
            <div className="category" key={category.id}>
              <input type="radio" name="cat" value={category.name} id="test" onChange={(event) => { setCategory(category.id); }}/>
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}
          {/* <div className="category">
            <input type="radio" checked={category === 'Art'} name="category" value="Art" data-id={1} onChange={(event) => { setCategory(console.log(event.target.getAttribute('data-id'))); }} />
            <label htmlFor="Art">Art</label>
          </div>
          <div className="category">
            <input type="radio" name="cat" value="science" id="science"/>
            <label htmlFor="art">Science</label>
          </div>
          <div className="category">
            <input type="radio" name="cat" value="technology" id="technology"/>
            <label htmlFor="art">Technology</label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Editor;
