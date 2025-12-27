
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import TransactionList from './components/TransactionList';
import BudgetManager from './components/BudgetManager';
import Settings from './components/Settings';
import { MOCK_TRANSACTIONS, MOCK_ACCOUNTS } from './constants';
import { Transaction, AccountInfo } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [accounts, setAccounts] = useState<AccountInfo[]>(MOCK_ACCOUNTS);

  const addTransaction = (newTx: Transaction) => {
    setTransactions(prev => [newTx, ...prev]);
    
    // If it's a manual cash transaction, we update the cash account balance
    if (newTx.id.startsWith('manual')) {
      setAccounts(prev => prev.map(acc => {
        if (acc.type === 'cash') {
          return {
            ...acc,
            balance: newTx.type === 'expense' 
              ? acc.balance - newTx.amount 
              : acc.balance + newTx.amount
          };
        }
        return acc;
      }));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} transactions={transactions} accounts={accounts} />;
      case 'ai-assistant':
        return <AIChat transactions={transactions} accounts={accounts} />;
      case 'transactions':
        return <TransactionList transactions={transactions} onAdd={addTransaction} />;
      case 'budgets':
        return <BudgetManager />;
      case 'settings':
        return <Settings />;
      case 'accounts':
        return (
          <div className="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-orange-100">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-university text-2xl"></i>
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">My Connected Banks</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Securely linked via industry-standard encryption protocols.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {accounts.filter(acc => acc.type !== 'cash').map(acc => (
                <div key={acc.id} className="group relative overflow-hidden bg-slate-50 border border-slate-200 p-6 rounded-2xl hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mr-4">
                        <i className={`fas ${acc.type === 'credit' ? 'fa-credit-card' : 'fa-building-columns'} text-orange-600`}></i>
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-tight">{acc.bankName || 'Partner Bank'}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{acc.name}</p>
                      </div>
                    </div>
                    <div className="text-[10px] font-black px-2 py-1 rounded bg-emerald-100 text-emerald-700 uppercase">Synced</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Account Number</span>
                      <span className="text-xs font-bold text-slate-700 font-mono">{acc.accountNumber || '**** ****'}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Available Balance</span>
                      <span className="text-xl font-black text-slate-900">₹{acc.balance.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  {/* Decorative background icon */}
                  <i className="fas fa-shield-halved absolute -right-2 -bottom-2 text-6xl text-slate-200/40 transform -rotate-12 pointer-events-none group-hover:text-orange-500/5 transition-colors"></i>
                </div>
              ))}
              
              <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-orange-400 hover:text-orange-500 transition-all group min-h-[160px]">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-orange-50 transition-colors">
                  <i className="fas fa-plus"></i>
                </div>
                <span className="font-bold text-xs uppercase tracking-widest">Connect Bank Account</span>
              </button>
            </div>
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
