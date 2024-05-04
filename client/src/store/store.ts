import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import tokenReducer from './reducers/token'
import articleReducer from 'store/reducers/article'
import { articleMiddleware } from 'store/middlewares/article'
import type IArticle from 'models/article'


// Make lazy loading for Redux store
export interface IState {
  token: string
  articles: IArticle[]
}

const rootReducer = combineReducers({
  token: tokenReducer,
  articles: articleReducer
});

// You can remove composeWithDevTools after development
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(articleMiddleware)
  )
)

export default store
