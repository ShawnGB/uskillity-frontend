import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
 import { createLogger } from 'redux-logger'
import createReducers from './reducers'

export const createReduxStore = (initialState = {}) => {
  // ***************** Middleware Configuration ***************** //
  const middleware = [thunk, createLogger() ].filter(Boolean)

  // ***************** Store creation ***************** //
  const store = createStore(
    createReducers(),
    applyMiddleware(...middleware),
  )

  return store
}

export default createReduxStore
