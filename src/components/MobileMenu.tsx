import { NavLink } from 'react-router-dom';
import { Drawer, Badge, Button, Avatar } from 'antd';
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ThemeToggle } from './ThemeToggle';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  cartCount: number;
  wishlistCount: number;
  displayName: string;
  onLogout: () => void;
}

export function MobileMenu({
  open,
  onClose,
  cartCount,
  wishlistCount,
  displayName,
  onLogout,
}: MobileMenuProps) {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
    }`;

  const handleLogoutClick = () => {
    onClose();
    onLogout();
  };

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
            <ShoppingOutlined className="text-base" />
          </div>
          <span className="font-bold text-base bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Navigation
          </span>
        </div>
      }
      placement="right"
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-col h-full justify-between">
        <nav className="flex flex-col gap-2">
          <NavLink to="/products" className={navLinkClass} onClick={onClose}>
            <span className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ShoppingOutlined className="text-base" />
              </span>
              <span>Products</span>
            </span>
          </NavLink>

          <NavLink to="/cart" className={navLinkClass} onClick={onClose}>
            <span className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShoppingCartOutlined className="text-base" />
              </span>
              <span>Cart</span>
            </span>
            <Badge count={cartCount} />
          </NavLink>

          <NavLink to="/wishlist" className={navLinkClass} onClick={onClose}>
            <span className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-rose-500 dark:text-rose-400">
                <HeartOutlined className="text-base" />
              </span>
              <span>Wishlist</span>
            </span>
            <Badge count={wishlistCount} />
          </NavLink>
        </nav>

        <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-5 space-y-4">
          <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar
                size="small"
                icon={<UserOutlined />}
                className="bg-gradient-to-tr from-blue-500 to-indigo-500 shrink-0"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                {displayName}
              </span>
            </div>
            <ThemeToggle />
          </div>

          <Button
            danger
            block
            size="large"
            className="rounded-xl font-medium"
            icon={<LogoutOutlined />}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default MobileMenu;
