import React from 'react';
import ReactDOM from 'react-dom';
import { Routers } from './router'

const render = Component => 
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
render(Routers)