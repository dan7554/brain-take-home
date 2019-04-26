import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import pageReducer from '@ducks/Page'

const reducers = combineReducers({
  routing: routerReducer,
  page: pageReducer
})

// Redux config
let middlewares = [thunk]
if(Config.env !== 'prod') {
  middlewares = [ ...middlewares, createLogger() ]
}
const middleware = applyMiddleware(...middlewares)
const store = createStore(reducers, middleware)

export default store
