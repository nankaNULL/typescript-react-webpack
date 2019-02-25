import React from 'react';
import ReactDOM from 'react-dom';
import { Routers } from './router'

// export default class Main extends React.Component{
//   render(){
//     return <div></div>
//   }
// }
const render = Component => 
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
render(Routers)