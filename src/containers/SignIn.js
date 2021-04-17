import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { userSignIn } from "../appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { statusCode } from "../constants/StatusCode";
import { reCaptcha } from "../constants/ReCaptcha";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);
  const [isVerified, setIsVerified] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    dispatch(userSignIn(values, (res) => handleResult(res)));
  };

  const handleResult = (status) => {
    if (status === statusCode.Success) {
      message.success("Login successfully !");
    } else if (status === statusCode.UnAuthorized) {
      message.error("Username or password is not correct");
    } else if (status === statusCode.Fail) {
      message.error("User not found!");
    } else if (status === statusCode.BadRequest) {
      message.error("Server busy ! Please try again !");
    } else {
      message.error("Login failed ! Please try again !");
    }
  };
  const onChange = (value) => {
    if (value != null) {
      setIsVerified(true);
    }
  };
  useEffect(() => {
    if (token !== null) {
      props.history.push("/");
    }
  }, [token, props.history]);

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <img src={require("assets/images/bg-login.jpg")} alt="Neature" />
            </div>
            <div className="gx-app-logo-wid">
              <h1>
                <IntlMessages id="app.userAuth.signIn" />
              </h1>
              <p>
                <IntlMessages id="app.userAuth.bySigning" />
              </p>
              <p>
                <IntlMessages id="app.userAuth.getAccount" />
              </p>
            </div>
            <div className="gx-app-logo">
              <img alt="example" src={require("assets/images/logo.png")} />
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="User name"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  type="password"
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <ReCAPTCHA
                // ref={recaptchaRef}
                //   size="invisible"
                sitekey={reCaptcha.SITE_KEY}
                onChange={onChange}
              />
              <Form.Item valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
                <Link
                  className="gx-login-form-forgot"
                  to="/auth/forgot-password"
                >
                  Forgot password
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="gx-mb-0"
                  htmlType="submit"
                  disabled={!isVerified}
                >
                  <IntlMessages id="app.userAuth.signIn" />
                </Button>
                <span>
                  <IntlMessages id="app.userAuth.or" />
                </span>{" "}
                <Link to="/auth/signup">
                  <IntlMessages id="app.userAuth.signUp" />
                </Link>
              </Form.Item>

              <span className="gx-text-light gx-fs-sm"> </span>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
