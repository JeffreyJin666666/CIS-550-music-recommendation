import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
export default  class LoginPage extends React.Component {
    handleSubmit = e => {
        console.log(e)
    };

    render() {

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>

                </Form.Item>
            </Form>
        );
    }
}



