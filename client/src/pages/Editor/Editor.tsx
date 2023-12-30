import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Category } from 'models/category'
import dateToString from 'utils/helpers/date-to-string.helper'
import './Editor.styles.scss'
import ArticleService from 'services/article'

const Editor = (): JSX.Element => {
  const state = useLocation().state
  const [value, setValue] = useState(state?.description || '')
  const [title, setTitle] = useState(state?.title || '')
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState(state?.category || '')

  const descriptionDiv = useRef(null)

  useEffect(() => {
    descriptionDiv.current.innerHTML = value
  }, [])

  useEffect(() => {
    const script = document.createElement('script')

    script.src = './editor.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const navigate = useNavigate()

  const handleClick = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault()

    try {
      const categoryId = Category[category]
      const date = dateToString(new Date())

      state !== null
        ? await ArticleService.updateArticle(state.id, [title, value])
        : await ArticleService.createArticle({ title, value, image, categoryId, date })

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='editor'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={(event) => { setTitle(event.target.value) }} />

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
              <div id="text-input" ref={descriptionDiv} contentEditable="true" onInput={(event) => { setValue(event.currentTarget.innerHTML) }}></div>
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
          <input style={{ display: 'none' }} type="file" id="file" onChange={(event) => { setImage(event.target.files[0])} } />
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
          <div className="category">
            <input type="radio" checked={category === 'Art'} name="category" value="Art" id="Art" onChange={(event) => { setCategory(event.target.value) }} />
            <label htmlFor="Art">Art</label>
            {/* Make for all the same tags */}
          </div>
          <div className="category">
            <input type="radio" name="cat" value="science" id="science"/>
            <label htmlFor="art">Science</label>
          </div>
          <div className="category">
            <input type="radio" name="cat" value="technology" id="technology"/>
            <label htmlFor="art">Technology</label>
          </div>
          <div className="category">
            <input type="radio" name="cat" value="cinema" id="cinema"/>
            <label htmlFor="art">Cinema</label>
          </div>
          <div className="category">
            <input type="radio" name="cat" value="design" id="design"/>
            <label htmlFor="art">Design</label>
          </div>
          <div className="category">
            <input type="radio" name="cat" value="food" id="food"/>
            <label htmlFor="art">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
