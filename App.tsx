
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import TransactionList from './components/TransactionList';
import BudgetManager from './components/BudgetManager';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'ai-assistant':
        return <AIChat />;
      case 'transactions':
        return <TransactionList />;
      case 'budgets':
        return <BudgetManager />;
      case 'settings':
        return <Settings />;
      case 'accounts':
        return (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-orange-100">
            <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-university text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Connected Accounts</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              FundVision is securely connected to your primary banking institutions in India.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              <div className="p-4 border border-orange-100 rounded-xl flex items-center justify-between hover:border-orange-500 transition-colors group">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3 font-bold">HDFC</div>
                  <div>
                    <p className="font-bold text-sm text-slate-800">HDFC Bank</p>
                    <p className="text-[10px] text-slate-400">Savings •••• 4291</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-slate-800">₹4,250.75</p>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase">Syncing</span>
                </div>
              </div>
              <div className="p-4 border border-orange-100 rounded-xl flex items-center justify-between hover:border-orange-500 transition-colors group opacity-75">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mr-3 font-bold">SBI</div>
                  <div>
                    <p className="font-bold text-sm text-slate-800">State Bank of India</p>
                    <p className="text-[10px] text-slate-400">Current •••• 8820</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-slate-800">₹12,000.00</p>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase">Syncing</span>
                </div>
              </div>
            </div>
            <button className="mt-8 px-6 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-700 transition-all flex items-center mx-auto">
              <i className="fas fa-plus mr-2"></i>
              Connect New Account
            </button>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-3xl border border-dashed border-orange-200">
            <i className="fas fa-tools text-4xl text-orange-200 mb-4"></i>
            <h3 className="text-xl font-bold text-slate-500">Under Construction</h3>
            <p className="text-slate-400">This feature is coming soon to your FundVision experience.</p>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="mb-4 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 capitalize tracking-tight">
          {activeTab === 'dashboard' ? 'Overview' : activeTab.replace('-', ' ')}
        </h1>
        <p className="text-slate-500 text-xs md:text-sm mt-1">
          {activeTab === 'dashboard' ? 'See how your finances are tracking this month in ₹.' : 'Manage your financial life with AI precision.'}
        </p>
      </div>
      {renderContent()}
    </Layout>
  );
};

export default App;
