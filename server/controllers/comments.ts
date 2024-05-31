import jwt from 'jsonwebtoken'
import dateToString from "../utils/date-to-string.js";
import database from '../config/database.js';

const getComments = (request, response) => {
  const query = 'SELECT * FROM comments WHERE article_id = ?'
  // check if article id required - send 400
  // if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });
  
  database.query(query, [request.params.id], (error, data) => { // HARDCODED request.params.url!!!
    if (error) return response.status(500).send(error);
    // 204 instead
    //   if (!employee) {
    //     return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    // }
    if (data.length === 0) return response.status(404).json('Comments not found!')
    // implement different service and model
    return response.status(200).send(data)
  });
};

const createComment = (request, response) => {
  // const currentDate = generateCurrentDate(new Date());
  // const articleUrl = generateArticleUrl(request.body.title);
  const token = request.cookies.refresh_token

  if (!token) return response.status(401).json('Not authenticated!')

    // async await try catch
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, userData) => {
    if (error) return response.status(403).json('Token is not valid!')

    const query = 'INSERT INTO comments(`content`, `article_id`, `user_id`, `created_at`, `updated_at`, `likes`) VALUES (?)'
    // desctructure request.body object since you will use model instead this

    const currentDate = dateToString(new Date());
    // if category not selected - set default category
    const values = [
      request.body.content,
      request.body.article_id,
      request.body.user_id,
      currentDate,
      currentDate,
      0 // hardcoded value
    ]
    // const values = {
    //   title: request.body.title,
    //   description: request.body.description,
    //   image: request.body.image,
    //   url: request.body.url,
    //   categoryId: request.body.categoryId,
    //   authorId: request.body.authorId,
    //   createdAt: currentDate,
    //   updatedAt: currentDate,
    // };

    // Article.createArticle((error, data) => {
    //   if (error) {
    //     response.status(500).send(error);
    //     return;
    //   }

    //   response.status(201).json('The article was successfully created');
    // }, values);

    database.query(query, [values], (error, data) => {
      if (error) return response.status(500).json(error)
      // status 201
      return response.json('Comment has been created.')
    });

  });
};

// toggleCommentLike
// move it likes endpoint
const likeComment = (request, response) => {
  const token = request.cookies.refresh_token

  if (!token) return response.status(401).json('Not authenticated!');

  const query = 'SELECT * FROM comments WHERE id = ?';
  const commentId = request.params.id;
  const userId = request.body.user_id;

  database.query(query, [commentId], (error, data) => {
    if (error) return response.status(500).send(error)

      // or !data instead this
    if (data.length === 0) return response.status(404).json('Comment not found!')

    const queryTwo = 'SELECT * FROM likes WHERE `liked_type` = "Comment" AND `liked_id` = ? AND `user_id` = ?';
    // const queryTwo = 'UPDATE comments SET `likes` = `likes` + 1 WHERE id = ?'

    database.query(queryTwo, [commentId, userId], (error, results) => {
      if (error) return response.status(500).send(error)

      if (results.length > 0) {
        const deleteLikeQuery = 'DELETE FROM likes WHERE `liked_id` = ? AND `user_id` = ? AND `liked_type` = "Comment"';

        database.query(deleteLikeQuery, [commentId, userId], (error, results) => {
          if (error) return response.status(500).send(error)
            console.log(results)
          return response.status(200).json(`Like successfully removed to article with id ${request.params.id}!`);
        })
      } else { 

        const currentDate = dateToString(new Date());

        const addLikeQuery = `
          INSERT INTO likes (liked_id, user_id, created_at, type) 
          VALUES (?, ?, ?, 'Comment')
        `;

        database.query(addLikeQuery, [commentId, userId, currentDate], (error, results) => {
          if (error) return response.status(500).send(error)

          return response.status(200).json(`Like successfully added to article with id ${request.params.id}!`);
        })
      }
    })
  })
};

export {
  getComments,
  createComment,
  likeComment
};
