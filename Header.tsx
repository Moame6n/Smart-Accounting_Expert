
import React from 'react';
import { Menu, BookOpen } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="md:hidden bg-white dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
        <BookOpen />
        <span>محاسب محترف</span>
      </div>
      <button onClick={onMenuClick} className="text-gray-600 dark:text-gray-300">
        <Menu size={28} />
      </button>
    </header>
  );
};

export default Header;
