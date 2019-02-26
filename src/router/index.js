import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
export const history = createHistory();
// import routerConf from './routerConf.js'; // 如果是export default 用这个
import { routerConf } from './routerConf'; 
import Home from '@/pages/home';
import BookRank from '@/pages/common/bookrank';
import BookRank1 from '@/pages/common/bookRank1';
import BookRank2 from '@/pages/common/bookrank2';
import List from '@/pages/list';

function getRouterConf ( routerConf ) {
  let myRoutes = [];
  const routerConfFormat = (fPath, routerConf) => {
    routerConf.forEach(( r ) => {
      const { path, component, layout, children, redirect } = r;
      let newPath = fPath === '/' ? path : fPath + path;
      if ( redirect ) {
        myRoutes.push(<Redirect exact key={redirect} from={path} to={redirect}></Redirect>)
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
        {/* <Switch>
          <Redirect exact path='/common' to='/common/bookRank'></Redirect>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/list' component={List}></Route>
          <Route exact path='/common/bookRank' component={BookRank}></Route>
        </Switch>  */}
        {myRoutes}
      </Router> 
    );
  }
}
