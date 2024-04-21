import { axiosInstance } from "utils/axios"

const getLikes = async (id: number): Promise<number> => {
  try {
    const response = await axiosInstance.get(`/likes/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const addLike= async (article_id: number, user_id): Promise<number> => {
  try {
    const response = await axiosInstance.post('/likes/', {
      article_id,
      user_id
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export { getLikes, addLike }
