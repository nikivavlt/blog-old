import { database } from '../config/database.js'

export const getCategories = (request, response) => {
  const query = 'SELECT * FROM categories'

  database.query(query, (error, data) => {
    if (error) return response.status(500).send(error)

    return response.status(200).json(data)
  })
}