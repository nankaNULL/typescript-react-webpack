import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {API} from '@/api';

import bookReducer from './reducer';

const appReducer = {
  global
};

export const history = createHistory();
const middleware = routerMiddleware(history);
const middlewares = [thunk.withExtraArgument({API}), middleware];

const store = createStore(
  combineReducers({ routing: routerReducer, ...appReducer }),
  // __PRODUCTION ? applyMiddleware(...middlewares): composeWithDevTools(applyMiddleware(...middlewares))
)
export default store;