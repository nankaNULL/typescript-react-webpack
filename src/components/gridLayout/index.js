import React from 'react'
import RGL, { WidthProvider } from "react-grid-layout";
import PropTypes from 'prop-types';
import './style.scss';

const ReactGridLayout = WidthProvider(RGL);
const GRID_LAYOUT_WIDTH = 1200,
      GRID_LAYOUT_COLS = 12,
      GRID_LAYOUT_ROWHEIGHT = 20;

export default class GridLayout extends React.PureComponent{
  static defaultProps = {
    className: 'layout',
    isDraggable: true,
    isResizable: true,
  };
  static propsTypes = {
    className: PropTypes.string,
    isDraggable: PropTypes.bool,
    isResizable: PropTypes.bool,
    layout: PropTypes.array,
    onLayoutChange: PropTypes.func,
    onResizeStop: PropTypes.func,
    onDragStop: PropTypes.func,
  }
  
  render () {
    const { layout, isDraggable, isResizable, onLayoutChange, onResizeStop, onDragStop, children} = this.props;
    return (
      <ReactGridLayout
        width={GRID_LAYOUT_WIDTH}
        cols={GRID_LAYOUT_COLS}
        layout={layout}
        margin={[10,10]}
        containerPadding={[10,10]}
        rowHeight={GRID_LAYOUT_ROWHEIGHT}
        isDraggable={isDraggable && true}
        isResizable={isResizable && true}
        useCSSTransforms={true}
        onLayoutChange={onLayoutChange}
        onResizeStop={onResizeStop}
        onDragStop={onDragStop}
      >
        {children}
      </ReactGridLayout>
    )
  }
}
