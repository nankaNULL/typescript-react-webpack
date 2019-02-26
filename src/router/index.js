import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
export const history = createHistory();
import Home from '@/pages/home';
import List from '@/pages/list';

export const Routers = class extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Home}></Route>
          <Route path="/list" component={List}></Route>
        </div>
      </Router>
    );
  }
}
// export const Routers = class extends React.Component{
//   render(){
//     return (
//       <Router>
//         <div>
//           <Route exact path="/" component={Home}></Route>
//           <Route path="/list" component={List}></Route>
//         </div>
//       </Router>
//     )
//   }
// }