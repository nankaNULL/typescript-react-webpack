import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
export const history = createHistory();
// import routerConf from './routerConf.js'; // 如果是export default 用这个
import { routerConf } from './routerConf'; 

function getRouterConf ( routerConf ) {
  let myRoutes = [];
  const routerConfFormat = (fPath, routerConf) => {
    routerConf.forEach(( r ) => {
      const { path, component, layout, children, redirect } = r;
      let newPath = fPath === '/' ? path : fPath + path;
      if ( redirect ) {
        myRoutes.push(<Redirect exact key={redirect} from={path} to={redirect}></Redirect>)
      } else if ( layout ) {
        myRoutes.push(<Route exact key={newPath} path={newPath} render={(props) => {
          return React.createElement(
            layout,
            props,
            React.createElement(component, props)
          )
        }}></Route>)
      } else {
        myRoutes.push(<Route exact key={newPath} path={newPath} component={component}></Route>)
      }
      if ( Array.isArray(children) ) {
        routerConfFormat(path, children);
      }
    })
  }
  routerConfFormat('/', routerConf);
  return myRoutes;
}
const myRoutes = <Switch>{ getRouterConf(routerConf) }</Switch>;
export const Routers = class extends React.Component {
  render() {
    return ( 
      <Router history={history}> 
        {myRoutes}
      </Router> 
    );
  }
}