const FullScreenLoader = () => {
    return (
      <div className="fixed inset-0 z-[9999] bg-white/80 dark:bg-black/80 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  };
  
  export default FullScreenLoader;
  