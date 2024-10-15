// SkeletonLoader.js
const SkeletonLoader = () => {
    return (
      <div className="animate-pulse flex flex-col space-y-4">
        {/* Profile Picture Skeleton */}
        <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
  
        {/* Username Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
  
        {/* Location Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  
        {/* Bio Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
  
        {/* Contact Information Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  
        {/* Posts Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-32 bg-gray-300 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  