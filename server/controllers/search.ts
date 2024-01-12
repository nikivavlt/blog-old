import database from '../config/database.js';

const search = (request, response) => { //  Express automatically decodes request.query
  const pattern: string = request.query.inputQuery; // inputQuery, inputText, searchInput or just query

  const query = // DISTINCT - statement is used to return only different values (without duplicates)
  `
  SELECT DISTINCT 
    articles.* 
  FROM 
    articles
    JOIN categories
    JOIN users
  WHERE 
    articles.title LIKE '%${pattern}%' 
    OR articles.description LIKE '%${pattern}%'
    OR articles.created_at LIKE '%${pattern}%'
    OR articles.updated_at LIKE '%${pattern}%'
    OR (
      categories.name LIKE '%${pattern}%' 
      AND categories.id = articles.category_id
    ) 
    OR (
      users.username LIKE '%${pattern}%' 
      AND users.id = articles.author_id
    )
  `;

  database.query(query, (error, data) => {
    if (error !== null) console.log(error)
    response.status(200).json(data);
  });
};

export default search;
