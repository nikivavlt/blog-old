import type IArticle from 'models/article'

export interface IDispatch {
  type: string
  payload: IArticle[]
}

export const getArticles = (category: string): { type: string, payload: { category: string } } => {
  return {
    type: 'GET_ARTICLES',
    payload: { category }
  }
}
