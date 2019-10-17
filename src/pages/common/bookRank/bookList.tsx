import React from 'react';
import { Table } from 'antd';

interface BookListProps {
  list: Array<any>
}

export default class BookList extends React.PureComponent<BookListProps, {}> {
  constructor(props: BookListProps) {
    super(props);
  }

  render() {
    const { list } = this.props;
    const columns = [
      { title: '编号', dataIndex: 'id' },
      { title: '名称', dataIndex: 'name' }
    ]
    return <div style={{
      background: '#fff',
      padding: 20
    }}>
      <p>BOOKLIST（子组件）</p>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        pagination={false}
      />
    </div>
  }
}