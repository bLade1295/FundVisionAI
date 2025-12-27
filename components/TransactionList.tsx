
import React, { useState } from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { TransactionCategory } from '../types';

const TransactionList: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredTransactions = filter === 'All' 
    ? MOCK_TRANSACTIONS 
    : MOCK_TRANSACTIONS.filter(t => t.type.toLowerCase() === filter.toLowerCase());

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-orange-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="font-bold text-slate-800 text-lg">Transaction History</h3>
        <div className="flex bg-orange-50/50 p-1 rounded-lg border border-orange-100 overflow-x-auto no-scrollbar">
          {['All', 'Income', 'Expense'].map((btn) => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                filter === btn ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-orange-50/30 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-50">
            {filteredTransactions.map((t) => (
              <tr key={t.id} className="hover:bg-orange-50/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <i className={`fas ${t.type === 'income' ? 'fa-arrow-down' : 'fa-shopping-cart'}`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm group-hover:text-orange-600 transition-colors">{t.description}</p>
                      <p className="text-[10px] text-slate-400 capitalize">{t.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                    {t.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(t.date).toLocaleDateString('en-IN')}
                </td>
                <td className={`px-6 py-4 text-right font-bold text-sm ${
                  t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-orange-50">
        {filteredTransactions.map((t) => (
          <div key={t.id} className="p-4 flex items-center justify-between hover:bg-orange-50/20 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
              }`}>
                <i className={`fas ${t.type === 'income' ? 'fa-plus' : 'fa-minus'} text-xs`}></i>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{t.description}</p>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-[10px] text-slate-400">{new Date(t.date).toLocaleDateString('en-IN')}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <span className="text-[10px] text-orange-600 font-bold uppercase">{t.category}</span>
                </div>
              </div>
            </div>
            <p className={`font-black text-sm ${
              t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
            }`}>
              {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString('en-IN')}
            </p>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-orange-50 text-center">
        <button className="text-orange-600 text-sm font-bold hover:underline">
          View all transactions
        </button>
      </div>
    </div>
  );
};

export default TransactionList;
