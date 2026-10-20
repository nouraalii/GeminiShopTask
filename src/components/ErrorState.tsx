import { Result, Button } from 'antd';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle={message}
      extra={
        <Button type="primary" onClick={onRetry}>
          Retry
        </Button>
      }
    />
  );
}
