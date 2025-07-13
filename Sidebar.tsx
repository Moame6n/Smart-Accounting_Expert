
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, HelpCircle, ClipboardList, BarChart3, Bot, BookMarked, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onAiAssistantClick: () => void;
}

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 px-4 py-3 rounded-lg text-lg transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onAiAssistantClick }) => {
  return (
    <>
      <aside className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 w-72 p-6 flex-col z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0 md:flex`}>
        <div className="flex justify-between items-center md:justify-center mb-10">
          <div className="flex items-center gap-3 text-2xl font-black text-blue-600 dark:text-blue-500">
            <BookOpen size={32} />
            <h1 className="tracking-tighter">محاسب محترف</h1>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-500 dark:text-gray-400">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-3 flex-grow">
          <NavItem to="/" icon={<Home />} label="الرئيسية" />
          <NavItem to="/dashboard" icon={<BarChart3 />} label="لوحة التحكم" />
          <NavItem to="/lessons" icon={<ClipboardList />} label="الدروس" />
          <NavItem to="/terms" icon={<BookMarked />} label="المصطلحات" />
          <NavItem to="/quiz" icon={<HelpCircle />} label="الاختبارات" />
        </nav>

        <div className="mt-auto">
          <button 
            onClick={onAiAssistantClick}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:opacity-90 transition-opacity"
          >
            <Bot />
            <span>المساعد الذكي</span>
          </button>
        </div>
      </aside>
       {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40 md:hidden"></div>}
    </>
  );
};

export default Sidebar;
