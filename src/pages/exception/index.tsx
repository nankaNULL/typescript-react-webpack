import React from 'react';
import { withRouter } from 'react-router-dom'

interface IState {
  errMsg: any
}
interface IProps {
  params: any
}

export default class Exception extends React.Component<any, IState> {
  constructor (props: any) {
    super(props);
    this.state = {
      errMsg: {
        403: '403，用户没有访问权限。',
        404: '404，页面走丢了！',
      }
    }
  }
  render() {
    const { url } = this.props.match;
    const { errMsg } = this.state;
    let params = url.split('/');
    return (
      <div style={{
        minHeight: 500,
        textAlign: 'center',
        fontSize: 20
      }}>
        { errMsg[params[params.length - 1]] || errMsg[404] }
      </div>
    )
  }
}