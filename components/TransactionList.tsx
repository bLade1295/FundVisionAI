
import React, { useState } from 'react';
import { TransactionCategory, Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onAdd: (tx: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onAdd }) => {
  const [filter, setFilter] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>(TransactionCategory.OTHER);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredTransactions = filter === 'All' 
    ? transactions 
    : transactions.filter(t => t.type.toLowerCase() === filter.toLowerCase());

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction: Transaction = {
      id: `manual_${Date.now()}`,
      description,
      amount: parseFloat(amount),
      category: category,
      date: date,
      type: 'expense' 
    };

    onAdd(newTransaction);
    setIsModalOpen(false);
    
    // Reset form
    setDescription('');
    setAmount('');
    setCategory(TransactionCategory.OTHER);
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="relative pb-24">
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
                        <i className={`fas ${t.id.startsWith('manual') ? 'fa-coins' : (t.type === 'income' ? 'fa-arrow-down' : 'fa-shopping-cart')}`}></i>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-semibold text-slate-800 text-sm group-hover:text-orange-600 transition-colors">{t.description}</p>
                          {t.id.startsWith('manual') && (
                            <span className="ml-2 px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[8px] font-black uppercase rounded tracking-tighter">Manual</span>
                          )}
                        </div>
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
                  <i className={`fas ${t.id.startsWith('manual') ? 'fa-coins' : (t.type === 'income' ? 'fa-plus' : 'fa-minus')} text-xs`}></i>
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="font-bold text-slate-800 text-sm">{t.description}</p>
                    {t.id.startsWith('manual') && <span className="ml-2 text-[8px] bg-orange-100 text-orange-600 font-black px-1 rounded">CASH</span>}
                  </div>
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
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-orange-600 text-white flex items-center gap-2 px-6 py-4 rounded-full shadow-2xl shadow-orange-600/40 hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all z-40 group"
      >
        <i className="fas fa-plus text-lg"></i>
        <span className="font-black text-sm uppercase tracking-wider hidden md:inline">Add Cash Payment</span>
      </button>

      {/* Manual Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)} />
          
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="p-6 bg-orange-600 text-white flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold">Manual Cash Entry</h4>
                <p className="text-orange-100 text-xs">Record a cash payment locally</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="p-8 space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Description</label>
                <input
                  autoFocus
                  required
                  type="text"
                  placeholder="e.g. Local Kirana Store"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Amount (₹)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Date</label>
                  <input
                    required
                    type="date"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Category</label>
                <select
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                >
                  {Object.values(TransactionCategory).filter(c => c !== TransactionCategory.INCOME).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-700 shadow-lg shadow-orange-600/20 active:translate-y-0.5 transition-all"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
