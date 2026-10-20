import { Switch } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleTheme, selectThemeMode } from '../features/theme/themeSlice';

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectThemeMode);

  return (
    <Switch
      checked={mode === 'dark'}
      onChange={() => dispatch(toggleTheme())}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
      aria-label="Toggle theme"
    />
  );
}

export default ThemeToggle;
