import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '@/page/home';
import List from '@/page/list';

export const Routers = class extends React.Component{
  render(){
    <Router>
      <div>
        <Route exact path="/" component={Home}></Route>
        <Route path="/list" component={List}></Route>
      </div>
    </Router>
  }
}