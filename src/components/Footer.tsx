import { Link } from 'react-router-dom';
import {
  ShoppingCartOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  CustomerServiceOutlined,
  CreditCardOutlined,
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import { Input, Button } from 'antd';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-gray-950 text-slate-600 dark:text-slate-400 mt-16 transition-colors">
      <div className="border-b border-slate-100 dark:border-slate-800/80 py-8 bg-blue-50/40 dark:bg-blue-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">
                <RocketOutlined />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Free Fast Shipping</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">On all orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">
                <SafetyCertificateOutlined />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Authentic Warranty</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">100% genuine guaranteed</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">
                <CreditCardOutlined />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Secure Checkout</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Encrypted payment protection</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">
                <CustomerServiceOutlined />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">24/7 Dedicated Support</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Live chat & instant assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/products" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                <ShoppingCartOutlined className="text-lg" />
              </div>
              <span className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                Shopcart
              </span>
            </Link>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Your premier destination for high-performance audio, flagship smartphones, ultrabooks, and everyday digital essentials.
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white block mb-2">
                Subscribe to our newsletter
              </span>
              <div className="flex gap-2 max-w-sm">
                <Input
                  placeholder="Enter your email"
                  className="rounded-full !h-10"
                />
                <Button
                  type="primary"
                  className="!rounded-full !h-10 !font-bold px-5"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500 cursor-not-allowed">
                  Order Tracking
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                  Electronics
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                  Audio & Sound
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                  Smartphones & Tablets
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                  Laptops & Computers
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                  Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                  Return Policy
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a href="#twitter" aria-label="Twitter" className="hover:text-blue-500 transition-colors">
                <TwitterOutlined className="text-lg" />
              </a>
              <a href="#github" aria-label="GitHub" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                <GithubOutlined className="text-lg" />
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
                <LinkedinOutlined className="text-lg" />
              </a>
              <a href="#instagram" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
                <InstagramOutlined className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 dark:border-slate-800/80 py-6 bg-slate-50/50 dark:bg-gray-900/50 text-xs text-slate-500 dark:text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Shopcart Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Security</span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
