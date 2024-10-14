import React from 'react';

const UserNavigation = ({ activeTab, onTabClick }) => {
  return (
    <div className="container mx-auto mt-10" >
      <nav className="flex gap-16 border-b-2 pb-2">
        <a
          href="#"
          onClick={() => onTabClick('Timeline')}
          className={`pb-1 ${activeTab === 'Timeline' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-700'}`}
        >
          Timeline
        </a>
        <a
          href="#"
          onClick={() => onTabClick('Profile')}
          className={`pb-1 ${activeTab === 'Profile' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-700'}`}
        >
          Profile
        </a>
        <a
          href="#"
          onClick={() => onTabClick('Friends')}
          className={`pb-1 ${activeTab === 'Friends' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-700'}`}
        >
          Friends
        </a>
        <a
          href="#"
          onClick={() => onTabClick('Photos')}
          className={`pb-1 ${activeTab === 'Photos' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-700'}`}
        >
          Photos
        </a>
      </nav>
    </div>
  );
};

export default UserNavigation;
