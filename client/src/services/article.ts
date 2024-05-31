import { axiosInstanceOne } from 'utils/axios'
import type IArticle from 'models/article'

class ArticleService {
  async getArticles (category: string): Promise<IArticle[]> {
    try {
      const response = await axiosInstanceOne.get(`/articles${category}`)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async getArticle (url: string): Promise <IArticle | never> {
    try {
      const response = await axiosInstanceOne.get(`/articles/${url}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async createArticle(data: IArticle) {
    const { title, description, image, categoryId, date } = data

    // use response ok/ sucess
    try {
      const response = await axiosInstanceOne.post('/articles/', {
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
    const [title, description, image] = data

    try {
      const response = await axiosInstanceOne.put(`/articles/${id}`, {
        title,
        description,
        image
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteArticle (url: string): Promise<void> {
    try {
      await axiosInstanceOne.delete(`/articles/${url}`)
    } catch (error) {
      console.log(error)
    }
  }

  async getArticlesByString(queryString: string) {
    // const queryValue = encodeURIComponent(searchString);

    try {
      const response = await axiosInstanceOne.get(`/search${queryString}`); // query string
      return response;
    } catch {
      console.log(error)
    }
  }

  async getCategories (): Promise<any> {
    try {
      const response = await axiosInstanceOne.get('/categories')
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default new ArticleService();
// Connect service to the project
