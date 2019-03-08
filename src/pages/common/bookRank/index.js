import React from 'react';
import { Card } from 'antd';

export default class BookRank1 extends React.PureComponent{
  render () {
    return (
      <div className="page-book-rank">
        <Card 
          title="图书排行1"
          extra={<span>more</span>}
        >emmmmmm</Card>
      </div>
    )
  }
}