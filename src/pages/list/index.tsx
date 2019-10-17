import React from 'react';
import { ListProps, ListState } from '../../constants/interfaces';

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('|');
}
// 当我们使用TypeScript定义一个新的React组件的时候，我们必须申明接口的属性和状态，如下
// 大概意思就是说，要有<Props, State> // 然后这两个名字你可以自己起
export default class List extends React.Component<ListProps, ListState> {
  // 这里感觉，可能必须要constructor了，直接外部state = {} 他拿的好像不是ListState里的, 或者state: ListState = { ... }这样指定
  constructor(props: ListProps) {
    super(props);
    this.state = {
      currentEnthusiasm: 5,
      visible: true
    }
  }
  handleClick = (type: string) => {
    // 函数的形参也是要进行判断的
    this.setState({ visible: !this.state.visible })
  }

  render() {
    console.log(this.props);
    const { currentEnthusiasm, visible } = this.state;
    return (
      <div className="page-list">
        <h3>typescript - list</h3>
        <div className="greeting">
          Hello {name + getExclamationMarks(currentEnthusiasm)}
        </div>
        <button onClick={this.handleClick.bind(this, 'btn')}>我就试试函数参数要不要加判断</button>
        {visible && <div>box-show</div>}
      </div>
    )
  }
}