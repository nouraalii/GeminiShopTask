import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, ArrowLeftOutlined, CompassOutlined } from '@ant-design/icons';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg bg-white dark:bg-gray-800/90 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-xs p-8 sm:p-12 text-center relative z-10">
        {/* Floating Icon Badge */}
        <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl mx-auto mb-6 shadow-xs border border-blue-100/60 dark:border-blue-900/40">
          <CompassOutlined />
        </div>

        {/* 404 Gradient Number */}
        <h1 className="text-7xl sm:text-8xl font-black tracking-tighter bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent leading-none mb-3">
          404
        </h1>

        {/* Subtitles */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate('/products')}
            className="w-full sm:w-auto !rounded-full !font-bold !h-12 px-7 shadow-md shadow-blue-500/20"
          >
            Back to Products
          </Button>

          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto !rounded-full !font-semibold !h-12 px-6"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
