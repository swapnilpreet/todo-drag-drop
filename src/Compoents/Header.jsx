import React from 'react'

const Header = ({ text, bg, count, countbg }) => {
    return (
      <div
        className={`${bg} flex items-center h-12 pl-4 rounded-md text-sm text-white`}
      >
        {text}
        <div
          className={`${countbg} ml-2 w-5 h-5 bg-white font-bold rounded-full flex items-center justify-center`}
        >
          {count}
        </div>
      </div>
    );
  };

export default Header