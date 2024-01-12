import { axiosInstance } from 'utils/axios'
import type IArticle from 'models/article'

class ArticleService {
  async getArticles (category: string): Promise<IArticle[]> {
    try {
      const response = await axiosInstance.get(`/articles${category}`)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async getArticle (url: string): Promise <IArticle | never> {
    try {
      const response = await axiosInstance.get(`/articles/${url}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async createArticle(data: IArticle) {
    const { title, description, image, categoryId, date } = data

    try {
      const response = await axiosInstance.post('/articles/', {
        title,
        description,
        image,
        categoryId,
        date
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async updateArticle(id: number, data) {
    const [title, description] = data

    try {
      const response = await axiosInstance.put(`/articles/${id}`, {
        title,
        description
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteArticle (url: string): Promise<void> {
    try {
      await axiosInstance.delete(`/articles/${url}`)
    } catch (error) {
      console.log(error)
    }
  }

  async getArticlesByString(queryString: string) {
    // const queryValue = encodeURIComponent(searchString);

    try {
      const response = await axiosInstance.get(`/search${queryString}`); // query string
      console.log(response)
      return response;
    } catch {
      console.log(error)
    }
  }
}

export default new ArticleService();
// Connect service to the project
