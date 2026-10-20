import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  switchText?: string;
  switchLinkText?: string;
  switchLinkTo?: string;
}

function AuthFormLayout({
  title,
  subtitle,
  children,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#edeae5] dark:bg-gray-950 flex items-center justify-center p-3 sm:p-6 lg:p-10 transition-colors">
      {/* Centered Split Card Container */}
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left Column: Form & Navigation */}
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
          {/* Top Bar: Back button & Brand Logo */}
          <div className="flex items-center justify-between pb-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-xs font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeftOutlined className="text-[10px]" />
              <span>Back</span>
            </button>

            <span className="text-sm font-black tracking-tight text-gray-900 dark:text-white">
              shopcart.co
            </span>

            {/* Empty placeholder for symmetrical balance */}
            <div className="w-10" />
          </div>

          {/* Center Form Section */}
          <div className="my-auto py-4 max-w-sm w-full mx-auto">
            <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-white mb-2 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                {subtitle}
              </p>
            )}

            {children}
          </div>

          {/* Bottom spacing placeholder */}
          <div className="pt-4" />
        </div>

        {/* Right Column: Editorial Visual (Inspired by Dribbble Shot) */}
        <div className="hidden lg:block relative overflow-hidden bg-black select-none">
          <img
            src="/images/auth-cover.jpg"
            alt="Editorial Campaign"
            className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105"
          />

          {/* Editorial Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 p-10 flex flex-col justify-between text-white pointer-events-none">
            {/* Top Tagline */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-white/75">
              <span>Brand New</span>
              <span>01-04</span>
            </div>

            {/* Middle Quote */}
            <div className="my-auto max-w-xs">
              <h2 className="text-2xl font-serif leading-snug tracking-wide text-white/95">
                We use contrast to bring your brand&apos;s truest essence into the light.
              </h2>
            </div>

            {/* Bottom Subtext */}
            <div className="flex items-end justify-between text-[11px] font-mono text-white/70">
              <span className="max-w-[200px] leading-relaxed text-[10px]">
                Audio & technology designed for pure acoustic performance.
              </span>
              <div className="text-right">
                <div>@2026</div>
                <div>01-04</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthFormLayout;
