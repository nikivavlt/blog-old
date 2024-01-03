import { database } from '../configurations/database.js'
import jwt from 'jsonwebtoken'

export const getArticles = (request, response) => {

  const { category } = request.query;

  // Article.getArticles((error, data) => {
  //   if (error) {
  //     response.status(500).send(error);
  //     return;
  //   }

  //   if (data.length === 0) {
  //     response.status(204).send();
  //     return;
  //   }

  //   response.status(200).json(data);
  // }, categoryName);

  const testQuery = request.query.category
    ? 'SELECT a.*, c.name as category FROM articles a JOIN categories c ON a.category_id=c.id WHERE c.name=?'
    : 'SELECT * FROM articles'

  const query = request.query.category
    ? 'SELECT * FROM articles WHERE category=?'
    : 'SELECT * FROM articles'

    // check if it exists and return 204 `No employee matches ID ${req.body.id}.`

  database.query(testQuery, [request.query.category], (error, data) => {
    if (error) return response.status(500).send(error)

    return response.status(200).json(data)
  })
}

export const getArticle = (request, response) => {
  const query = 'SELECT `username` as author, u.id as author_id, `title`, `description`, `url`, a.id, a.image, u.image AS authorImage, c.name AS category, `created_at` FROM users u JOIN articles a ON u.id=a.author_id JOIN categories c ON a.category_id=c.id WHERE a.url = ?'
  // check if article id required - send 400
  // if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

  database.query(query, [request.params.url], (error, data) => {
    if (error) return response.status(500).send(error);
    // 204 instead
  //   if (!employee) {
  //     return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
  // }
    if (data.length === 0) return response.status(404).json('Article not found!')

    // update field "views" increment it

    return response.status(200).json(data[0])
  })
}

// createArticle
export const addArticle = (request, response) => {
  // const currentDate = generateCurrentDate(new Date());
  // const articleUrl = generateArticleUrl(request.body.title);
  const token = request.cookies.access_token

  if (!token) return response.status(401).json('Not authenticated!')

  jwt.verify(token, 'jwt', (error, userData) => {
    if (error) return response.status(403).json('Token is not valid!')

    // generate articles url function
    // add is_admin boolean value or roles
    // rename image as avatar

    const query = 'INSERT INTO articles(`title`, `description`, `image`, `category_id`, `date`, `author_id`) VALUES (?)'

    const values = [
      request.body.title,
      request.body.description,
      request.body.image,
      request.body.categoryId,
      request.body.date,
      userData.id
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
      return response.json('Post has been created.')
    });
  
  });
}

export const deleteArticle = (request, response) => {
  const token = request.cookies.refresh_token

  if (!token) return response.status(401).json('Not authenticated!') // CHANGE STATUS CODE

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, userData) => {
    if (error) return response.status(403).json('Token is not valid!')

    const url = request.params.url;

    // check if id provided - send 400

    const query = 'DELETE FROM articles WHERE `url` = ? AND `author_id` = ?'

    // add check if it exists and return 204 `No employee matches ID ${req.body.id}.`

    database.query(query, [url, userData.id], (error, data) => {
      if (error) return response.status(403).json('You can delete only your articles!')

      return response.json(`Post ${url} has been deleted!`)
    })
  })
}

export const updateArticle = (request, response) => {
  const token = request.cookies.refresh_token
  // check if ID provided

  if (!token) return response.status(401).json('Not authenticated!')

  // add service here or middleware instead
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, userData) => {
    if (error) return response.status(403).json('Token is not valid!')

    const postId = request.params.id
    // if didn't find send 204 not found `No employee matches ID ${req.body.id}.`

    const query = 'UPDATE articles SET `title`=?, `description`=? WHERE `id` = ? AND `author_id` = ?'
    // also update image_url if upload photo

    const values = [
      request.body.title,
      request.body.description
    ]

    database.query(query, [...values, postId, userData.id], (error, data) => {
      if (error) return response.status(500).json(error)
      return response.json('Post has been updated.')
    })
  })
}
