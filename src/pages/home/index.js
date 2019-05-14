import React from 'react';
import { Card, Button } from '@alifd/next';
import _ from "lodash";
import GridLayout from '@/components/gridLayout'


export default class Home extends React.PureComponent{
  state = { 
    layout: [],
    isCollect: false,
  };
  
  componentDidMount () {
    const layout = this.generateLayout();
    this.setState({layout});
  }

  generateDOM() {
    return _.map(_.range(10), function(i) {
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    return _.map(new Array(10), function(item, i) {
      const y = Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange = (layout) => {
    console.log(layout)
  }

  onResizeStop = (layout, oldItem, newItem) => {
    console.log(oldItem)
    console.log(newItem)
  }

  handleClick = () => {
    this.setState({isCollect: !this.state.isCollect}) 
  }

  render () {
    const { isCollect, layout } = this.state;
    let emm = 1;
    let person = [{
      name:' name'
    }]

    return (
      <div className="page-home grid-drag-handle" style={{padding: 20, background:'#fff'}}>
        <Card title="fusion design 效果测试">
          <Button type="normal" className="mr-10">Normal</Button>
          <Button type="primary" className="mr-10">Prirmary</Button>
          <Button type="secondary">Secondary</Button>
        </Card>
        <Card title="iconfont 效果测试" className="color-primary mt-10">
          <p><i id="some_elemenent" className="yuwan icon-bilibili"> LOGO </i></p>
          <p><i className="yuwan icon-zhiboguankanshu"> 观看人数 </i></p>
          <p><i className="yuwan icon-Bbi"> 投币 </i></p>

          <p><i className={'pointer yuwan ' + (isCollect ? "icon-shoucangtianchong" : "icon-shoucang")} onClick={this.handleClick}> 收藏 </i></p>
          <p><i className="yuwan icon-zan"> 点赞 </i></p>
        </Card>
        <Card title="react-grid-layout 拖拽布局" className="color-primary mt-10 ">
          <GridLayout
            layout={layout}
            isDraggable={true}
            isResizable={true}
            onLayoutChange={this.onLayoutChange}
            onResizeStop={this.onResizeStop}
            // onDragStop={onDragStop}
          >
            {this.generateDOM()}
          </GridLayout>
        </Card>
      </div>
    )
  }
}
