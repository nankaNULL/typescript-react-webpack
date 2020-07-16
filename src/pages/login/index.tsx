import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { API } from '@/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { globalActions } from '@/store/globalReducer';
import { FormComponentProps } from 'antd/lib/form';
import './style.scss';
const FormItem = Form.Item;

interface IState {
    loading: boolean;
}

interface IProps extends FormComponentProps {
    userLogin: (params: any) => void;
    history: any
}
@(connect(
    (state: any) => state.global,
    (dispatch: any) => {
        console.log(globalActions)
        console.log(bindActionCreators({ ...globalActions }, dispatch))
        return bindActionCreators({ ...globalActions }, dispatch)
    }
) as any)
class LoginPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: false
        }
    }

    // 登录
    handleLogin = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                API.userLogin(values).then((res: any) => {
                    const { result, result_message } = res;
                    this.setState({ loading: false });
                    if (result) {
                        this.props.history.push('/home');
                    } else {
                        message.error(result_message);
                    }
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.state;
        return (
            <div className="page-login">
                <Form className="login-form">
                    <h4>用户登录</h4>
                    <FormItem
                        label="用户名"
                    >
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '请输入用户名' }
                            ]
                        })(
                            <Input placeholder="请输入用户名" style={{ width: 300 }} />
                        )}
                    </FormItem>
                    <FormItem
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入密码' }
                            ]
                        })(
                            <Input.Password placeholder="请输入密码" style={{ width: 300 }} />
                        )}
                    </FormItem>
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.handleLogin} loading={loading}>登录</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.create()(LoginPage);
