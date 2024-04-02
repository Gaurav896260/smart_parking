import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-t-4 border-teal-500 border-opacity-50 rounded-full animate-pulse">
        <div className="w-10 h-10 border-t-4 border-teal-500 border-opacity-50 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
