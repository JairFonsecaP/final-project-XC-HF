import React, { useState } from 'react';
import axios from 'axios';
import Alerts from '../components/Alerts';
import { Button, Form, Input, Card } from 'antd';
import api from '../assets/api';
import { Link } from 'react-router-dom';

const Register = () => {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState(null);

    const onFinish = async (values) => {
        try {
            setErrors([]);
            setConfirmation(null);
            setLoading(true);
            const { data } = await axios.post(`${api}user/register`, values);
            setConfirmation(data);
        } catch (e) {
            const errors = e.response.data.errors;
            setErrors(errors);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => { };

    return (
        <div className='site-card-border-less-wrapper'>
            <Form
                name='basic'
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 16
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                <Card
                    title='Register'
                    bordered={false}
                    style={{ maxWidth: 800, margin: '100px auto' }}
                    actions={[
                        <Button
                            loading={loading}
                            type='primary'
                            htmlType='submit'
                        >
                            Save
                        </Button>,
                        <Link to='/'>
                            <Button loading={loading}
                            >Return to login</Button>
                        </Link>
                    ]}
                >
                    {confirmation ? <Alerts message={'Success'} desciption={confirmation.success.msg} type='success' /> : ''}
                    {errors.map((e, i) => (
                        <Alerts error={e}
                            key={i + e.msg}
                            message={e.param}
                            desciption={e.msg}
                            type='error' />
                    ))}
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: 'Field requiered'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Field requiered'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Field requiered'
                            },
                            {
                                min: 8,
                                message: 'Password must be at least 8 characters long'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label='Password confirmation'
                        name='password2'
                        rules={[
                            {
                                required: true,
                                message: 'Field requiered'
                            },
                            {
                                min: 8,
                                message: 'Password must be at least 8 characters long'
                            },
                            ({ getFieldValue }) => ({
                                validator: (_, value) => {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('Both password must be the same!')
                                    );
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}
                    ></Form.Item>
                </Card>
            </Form>
        </div >
    );
};

export default Register;
