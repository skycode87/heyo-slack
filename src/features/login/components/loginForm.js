import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { spaRoutes } from "../../../constants/routes";
import useAlert from "../../shared/hooks/useAlert";

import { save } from "../../../redux/root";

const Login = ({ login, router }) => {
  const dispatch = useDispatch();
  const [renderAlert, openAlert] = useAlert();
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setIsSubmit(true);
    login(values, {
      onFail: (response) => {
        openAlert({ message: response.message, type: "error" });
        form.resetFields();
      },
      onSuccess: (response) => {
        save(response)(dispatch);
        router.history.push(spaRoutes.HOME);
      },
      onFinish: () => setIsSubmit(false),
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
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
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {renderAlert()}
    </>
  );
};

export default Login;
