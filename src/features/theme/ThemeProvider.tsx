import { useEffect, type ReactNode } from 'react';
import { ConfigProvider, theme, App } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from './themeSlice';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const mode = useAppSelector(selectThemeMode);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#2563eb', 
          colorSuccess: '#2563eb',
          colorLink: '#2563eb',
          borderRadius: 14,
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        },
        components: {
          Button: {
            controlHeight: 42,
            borderRadius: 9999,
            fontWeight: 600,
          },
          Input: {
            controlHeight: 44,
            borderRadius: 12,
          },
          Select: {
            controlHeight: 42,
            borderRadius: 12,
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
