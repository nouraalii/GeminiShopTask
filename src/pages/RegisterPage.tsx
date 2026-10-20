import { Form, Input, Button, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../services/authApi';
import { isApiError } from '../services/normalizeError';
import AuthFormLayout from '../components/AuthFormLayout';
import type { RegisterRequest } from '../types/api';

function RegisterPage() {
  const navigate = useNavigate();
  const [register, { isLoading, error, reset }] = useRegisterMutation();

  async function handleSubmit(values: RegisterRequest) {
    try {
      await register(values).unwrap();
      navigate('/products', { replace: true });
    } catch {

    }
  }

  return (
    <AuthFormLayout
      title="Create Account"
      subtitle="Sign up to start browsing and shopping"
    >
      <Form layout="vertical" onFinish={handleSubmit} onValuesChange={reset}>
        <Form.Item name="name" label="Name (optional)">
          <Input placeholder="Your name" size="large" />
        </Form.Item>

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
            Create Account
          </Button>
        </Form.Item>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </Form>
    </AuthFormLayout>
  );
}

export default RegisterPage;
