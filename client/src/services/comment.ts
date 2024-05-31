import { axiosInstanceOne } from "utils/axios";


// FOREIGN KEYS/ Primary keys - CommentLikes/ ArticleLikes
const createComment = async (data) => {
  try {
    const response = await axiosInstanceOne.post('/comments/', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getComments = async (id: number): Promise<number> => {
  try {
    const response = await axiosInstanceOne.get(`/comments/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const likeComment = async (id: number, userId: number): Promise<string> => {
  const user_id = userId;

  try {
    console.log(id)
    const response = await axiosInstanceOne.put(`/comments/like/${id}`, { user_id });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  createComment,
  getComments,
  likeComment
};
