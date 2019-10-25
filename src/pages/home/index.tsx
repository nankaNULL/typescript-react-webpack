import React from 'react';
import { Radio, message, Button } from 'antd';
import { connect } from 'react-redux';
import { API } from '@/api';
const RadioGroup = Radio.Group;

interface IState {
  radioValue: number;
}
interface IProps {
  history: any
}

@connect(
  (state: any) => state.global,
  () => { }
)
export default class Home extends React.PureComponent<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      radioValue: 1
    }
  }

  componentDidMount() {
    API.getToken().then((res: any) => {
      const { result, result_message } = res;
      if (result) {
        message.success(result_message)
      } else {
        message.error(result_message);
      }
    })
    console.log(document.cookie);
  }

  handleChange = (e: any) => {
    this.setState({
      radioValue: e.target.value
    })
  }

  render() {
    const { radioValue } = this.state;
    return (
      <div className="page-home">
        <RadioGroup value={radioValue} onChange={this.handleChange}>
          <Radio value={1}>test1</Radio>
          <Radio value={2}>test2</Radio>
        </RadioGroup>
      </div>
    )
  }
}