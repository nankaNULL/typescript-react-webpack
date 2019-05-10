import React from 'react';
import { Button } from '@alifd/next';


export default class Home extends React.PureComponent{
  render () {
    return (
      <div className="page-home" style={{padding: 20, background:'#fff'}}>
        <Button type="normal">Normal</Button> &nbsp;&nbsp;
        <Button type="primary">Prirmary</Button> &nbsp;&nbsp;
        <Button type="secondary">Secondary</Button>
      </div>
    )
  }
}