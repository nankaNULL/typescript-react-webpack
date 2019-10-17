import React from 'react';
import { Card } from 'antd';
import BookList from './bookList'

interface BookRankState {
  list: Array<Object>
}
interface BookRankProps {
}

export default class BookRank1 extends React.PureComponent<BookRankProps, BookRankState>{
  constructor(props: BookRankProps) {
    super(props);
    this.state = {
      list: [
        { name: 'book1', id: 1 },
        { name: 'book1', id: 2 },
        { name: 'book1', id: 3 }
      ]
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="page-book-rank">
        <Card
          title="图书排行1"
          extra={<span>more</span>}
        >emmmmmm</Card>
        <BookList list={this.state.list} />
      </div>
    )
  }
}