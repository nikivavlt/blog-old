import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import articleReducer from 'store/reducers/article'
import { articleMiddleware } from 'store/middlewares/article'
import type IArticle from 'models/article'

export interface IState {
  articles: IArticle[]
}

const rootReducer = combineReducers({
  articles: articleReducer
})

// You can remove composeWithDevTools after development
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(articleMiddleware)
  )
)

export default store