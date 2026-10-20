import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Badge, Button } from 'antd';
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  LogoutOutlined,
  MenuOutlined,
  ThunderboltFilled,
} from '@ant-design/icons';
import { useAppSelector } from '../app/hooks';
import { selectUser, selectToken } from '../features/auth/authSlice';
import { useGetCartQuery } from '../services/cartApi';
import { useGetWishlistQuery } from '../services/wishlistApi';
import { useLogout } from '../features/auth/useLogout';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const handleLogout = useLogout();

  const { cartCount } = useGetCartQuery(undefined, {
    skip: !token,
    selectFromResult: ({ data }) => ({
      cartCount: data?.items.length ?? 0,
    }),
  });

  const { wishlistCount } = useGetWishlistQuery(undefined, {
    skip: !token,
    selectFromResult: ({ data }) => ({
      wishlistCount: data?.length ?? 0,
    }),
  });

  const displayName = user?.name || user?.email || 'User';

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 font-bold'
        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30'
    }`;

  return (
    <>
      <div className="bg-blue-600 dark:bg-blue-950 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <ThunderboltFilled className="text-amber-300" />
        <span>
          Grab Up to 50% Off On Selected Products | <span className="underline cursor-pointer font-bold">Shop Now</span>
        </span>
      </div>

      <header className="border-b border-blue-100/60 dark:border-blue-900/40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 sm:px-8 py-3.5 sticky top-0 z-40 transition-colors">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/products" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <ShoppingCartOutlined className="text-lg" />
              </div>
              <span className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                Shopcart
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/products" className={navLinkClass}>
                <ShoppingOutlined className="text-base" />
                <span>Products</span>
              </NavLink>

              <NavLink to="/cart" className={navLinkClass}>
                <Badge count={cartCount} size="small" offset={[4, -2]} color="#2563eb">
                  <span className="flex items-center gap-1.5">
                    <ShoppingCartOutlined className="text-base" />
                    <span>Cart</span>
                  </span>
                </Badge>
              </NavLink>

              <NavLink to="/wishlist" className={navLinkClass}>
                <Badge count={wishlistCount} size="small" offset={[4, -2]} color="#e11d48">
                  <span className="flex items-center gap-1.5">
                    <HeartOutlined className="text-base" />
                    <span>Wishlist</span>
                  </span>
                </Badge>
              </NavLink>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50/70 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40">
              <div className="w-7 h-7 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold flex items-center justify-center uppercase shadow-sm">
                {displayName.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 max-w-[130px] truncate">
                {displayName}
              </span>
            </div>

            <ThemeToggle />

            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-full"
            >
              Logout
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-full"
            />
          </div>
        </div>
        <MobileMenu
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          displayName={displayName}
          onLogout={handleLogout}
        />
      </header>
    </>
  );
}

export default Header;
