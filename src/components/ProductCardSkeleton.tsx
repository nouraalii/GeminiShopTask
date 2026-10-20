import { Skeleton } from 'antd';

export function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl bg-white dark:bg-gray-800/90 border border-slate-100 dark:border-gray-800 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <Skeleton.Button active size="small" shape="round" className="!w-24" />
          <Skeleton.Avatar active size="small" shape="circle" />
        </div>
        <Skeleton active title={{ width: '80%' }} paragraph={{ rows: 2, width: ['90%', '50%'] }} />
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800">
        <Skeleton.Button active block shape="round" className="!h-11" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
