
import React, { useState } from 'react';
import Notifications from './Notifications';
import { MOCK_NOTIFICATIONS } from '../constants';
import { Notification } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { id: 'transactions', icon: 'fa-exchange-alt', label: 'Transactions' },
    { id: 'budgets', icon: 'fa-wallet', label: 'Budgets' },
    { id: 'ai-assistant', icon: 'fa-robot', label: 'AI Assistant' },
    { id: 'accounts', icon: 'fa-university', label: 'Bank Accounts' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen flex bg-[#FFF5F0]">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-400 fixed h-full hidden lg:flex flex-col z-50">
        <div className="p-8 flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
            <i className="fas fa-eye text-xl"></i>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">FundVision</h1>
        </div>
        
        <nav className="flex-1 px-4 mt-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fas ${item.icon} w-6 text-lg`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-800 rounded-2xl p-4 text-center">
            <p className="text-[10px] text-slate-500 leading-tight">
              Manage your financial life with AI precision.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer Content */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-400 z-[70] transform transition-transform duration-300 lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
              <i className="fas fa-eye text-xl"></i>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">FundVision</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <nav className="flex-1 px-4 mt-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fas ${item.icon} w-6 text-lg`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-800 rounded-2xl p-4 text-center">
             <p className="text-[10px] text-slate-500">FundVision AI v2.4.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 transition-all duration-300 min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-orange-100 h-16 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center space-x-2 text-slate-400">
             <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden mr-4 p-2 hover:bg-orange-50 rounded-lg text-slate-600">
               <i className="fas fa-bars text-xl"></i>
             </button>
             <span className="text-sm font-medium capitalize text-slate-500 hidden sm:inline-block">{activeTab.replace('-', ' ')}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isNotificationsOpen ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500 hover:text-orange-600'
                }`}
              >
                <i className="fas fa-bell"></i>
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {isNotificationsOpen && (
                <Notifications 
                  items={notifications} 
                  onMarkRead={markAsRead}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              )}
            </div>
            <div className="h-8 w-[1px] bg-orange-100"></div>
            <div className="flex items-center space-x-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-none">Sarah Johnson</p>
              </div>
              <img src="https://picsum.photos/seed/sarah/40/40" className="w-10 h-10 rounded-full ring-2 ring-orange-500 ring-offset-2" alt="Profile" />
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
