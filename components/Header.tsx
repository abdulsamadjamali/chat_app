import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4 shadow-md z-10">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-full">
          <img
            src="dist/assets/image/abdul samad.jpg"
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gray-100">
          Abdul Samad's  Chat APP
        </h1>
      </div>
    </header>
  );
};

export default Header;
