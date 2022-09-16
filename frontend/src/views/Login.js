import { Button, Form, Input, Card, Spin } from "antd";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import Alerts from "../components/Alerts";
import api from "../assets/api";

const Login = props => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${api}user/login`, values);
      localStorage.setItem("token", data.token);
      props.setToken(data.token);
      history.push("/dashboard/albums");
    } catch (e) {
      if (e.response.data.errors) {
        setErrors(e.response.data.errors);
      } else {
        setErrors(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = errorInfo => {};

  return (
    <Spin spinning={loading}>
      <div className="site-card-border-less-wrapper">
        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Card
            title="Log in"
            bordered={false}
            style={{ maxWidth: 800, margin: "100px auto" }}
            actions={[
              <Button loading={loading} type="primary" htmlType="submit">
                Iniciar
              </Button>,
              <Link to="/register">
                <Button loading={loading}>Register</Button>
              </Link>
            ]}
          >
            {errors.map((e, i) => (
              <Alerts
                error={e}
                key={i + e.msg}
                message={e.param}
                desciption={e.msg}
                type="error"
              />
            ))}

            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Field requiered"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Field requiered"
                }
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
      </div>
    </Spin>
  );
};

export default Login;
