import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative">
        <div className="w-32 h-32 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        <div
          className="w-32 h-32 border-r-4 border-l-4 border-purple-500 rounded-full animate-spin absolute top-0 left-0"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute top-0 left-0 w-32 h-32 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white animate-pulse">
            <span className="text-blue-500">S</span>
            <span className="text-purple-500">H</span>
            <span className="text-blue-500">O</span>
            <span className="text-purple-500">R</span>
            <span className="text-blue-500">T</span>
            <span className="text-purple-500">R</span>
            <span className="text-blue-500">R</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Loader;
