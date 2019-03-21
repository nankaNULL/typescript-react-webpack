import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Routers } from './router';
// import store from './store'
import List from '@/pages/home';

// 这里是新建的分支typescript
const render = (Component: any) => 
  ReactDOM.render(
    // <Provider store={store}>
      <Component />,
    // </Provider>,
    document.getElementById('root')
  )
render(Routers)