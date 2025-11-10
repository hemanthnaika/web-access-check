import CustomLayout from "@/layout/customLayout";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonComponents = () => {
  return (
    <CustomLayout>
      <section className="mt-28 mb-10 space-y-10 animate-pulse ">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
            <Skeleton className="h-24 rounded-lg bg-white" />
            <Skeleton className="h-24 rounded-lg bg-white" />
            <Skeleton className="h-24 rounded-lg bg-white" />
            <Skeleton className="h-24 rounded-lg bg-white" />
          </div>
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Skeleton className="h-60 rounded-lg bg-white" />
          <Skeleton className="h-60 rounded-lg bg-white" />
          <Skeleton className="h-60 rounded-lg bg-white" />
        </div>

        {/* Table Skeleton */}
        <div className="bg-white p-5 rounded-lg shadow">
          <div className="flex justify-between mb-4">
            <Skeleton className="h-6 w-10 " />
            <Skeleton className="h-6 w-1/2 " />
            <Skeleton className="h-6 w-32 " />
          </div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded" />
            ))}
          </div>
        </div>

        {/* AI Suggestions Skeleton */}
        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-2" />
        </div>
      </section>
    </CustomLayout>
  );
};

export default SkeletonComponents;
