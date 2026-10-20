import { Form, Input, Button, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../services/authApi';
import { isApiError } from '../services/normalizeError';
import AuthFormLayout from '../components/AuthFormLayout';
import type { LoginRequest } from '../types/api';

function LoginPage() {
  const navigate = useNavigate();
  const [login, { isLoading, error, reset }] = useLoginMutation();

  async function handleSubmit(values: LoginRequest) {
    try {
      await login(values).unwrap();
      navigate('/products', { replace: true });
    } catch {

    }
  }

  return (
    <AuthFormLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
    >
      <Form layout="vertical" onFinish={handleSubmit} onValuesChange={reset}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="you@example.com" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 4, message: 'Password must be at least 4 characters' },
          ]}
        >
          <Input.Password placeholder="••••••••" size="large" />
        </Form.Item>

        {error && isApiError(error) && (
          <Alert type="error" title={error.message} className="mb-4" showIcon />
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={isLoading}>
            Sign In
          </Button>
        </Form.Item>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </Form>
    </AuthFormLayout>
  );
}

export default LoginPage;
