
import React, { useState } from 'react';
import { MOCK_BUDGETS, MOCK_TRANSACTIONS } from '../constants';
import { TransactionCategory, Budget, Transaction } from '../types';

const categoryIcons: Record<string, string> = {
  [TransactionCategory.FOOD]: 'fa-utensils',
  [TransactionCategory.TRANSPORT]: 'fa-car',
  [TransactionCategory.SHOPPING]: 'fa-shopping-bag',
  [TransactionCategory.HOUSING]: 'fa-home',
  [TransactionCategory.ENTERTAINMENT]: 'fa-film',
  [TransactionCategory.UTILITIES]: 'fa-lightbulb',
  [TransactionCategory.OTHER]: 'fa-ellipsis-h',
};

const BudgetManager: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>(MOCK_BUDGETS);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEdit = (e: React.MouseEvent, budget: Budget) => {
    e.stopPropagation(); // Prevent opening details when clicking edit
    setEditingCategory(budget.category);
    setEditValue(budget.limit.toString());
  };

  const handleSave = (category: string) => {
    const newValue = parseFloat(editValue);
    if (!isNaN(newValue) && newValue >= 0) {
      setBudgets(prev => prev.map(b => 
        b.category === category ? { ...b, limit: newValue } : b
      ));
    }
    setEditingCategory(null);
  };

  const toggleCategoryDetails = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const getCategoryTransactions = (category: string): Transaction[] => {
    return MOCK_TRANSACTIONS.filter(t => t.category === category && t.type === 'expense');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isOver = percentage > 100;
          const isWarning = percentage > 80 && !isOver;
          const isExpanded = selectedCategory === budget.category;
          const categoryTransactions = getCategoryTransactions(budget.category);
          
          return (
            <div 
              key={budget.category} 
              onClick={() => toggleCategoryDetails(budget.category)}
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 cursor-pointer overflow-hidden ${
                isExpanded ? 'ring-2 ring-orange-500 border-orange-500 md:col-span-2 lg:col-span-2' : 'border-orange-100 hover:border-orange-300'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isOver ? 'bg-red-50 text-red-500' : isWarning ? 'bg-orange-50 text-orange-500' : 'bg-emerald-50 text-emerald-500'
                  }`}>
                    <i className={`fas ${categoryIcons[budget.category] || 'fa-tag'} text-xl`}></i>
                  </div>
                  <div className="flex items-center space-x-2">
                    {editingCategory === budget.category ? (
                      <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
                        <input 
                          type="number" 
                          className="w-24 px-2 py-1 bg-orange-50 border border-orange-400 rounded text-sm outline-none focus:ring-4 focus:ring-orange-500/10 font-bold text-orange-900 transition-all"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                        />
                        <button onClick={() => handleSave(budget.category)} className="text-emerald-600 hover:text-emerald-700 bg-emerald-50 w-8 h-8 rounded-lg flex items-center justify-center transition-colors">
                          <i className="fas fa-check"></i>
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={(e) => handleEdit(e, budget)} 
                        className="text-slate-400 hover:text-orange-600 transition-colors p-2"
                      >
                        <i className="fas fa-edit text-xs"></i>
                      </button>
                    )}
                    <div className={`text-slate-300 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-slate-800">{budget.category}</h4>
                    <div className="flex items-baseline space-x-1 mt-1">
                      <span className="text-2xl font-black text-slate-900">₹{budget.spent.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 font-medium">/ ₹{budget.limit.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${isOver ? 'text-red-500' : 'text-slate-500'}`}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        isOver ? 'bg-red-500' : isWarning ? 'bg-orange-400' : 'bg-emerald-500'
                      }`} 
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Expanded Section: Spending Details */}
              {isExpanded && (
                <div className="border-t border-orange-50 bg-orange-50/20 p-6 animate-in slide-in-from-top duration-300">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Recent {budget.category} Spending
                  </h5>
                  {categoryTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {categoryTransactions.map((t) => (
                        <div key={t.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-orange-100 shadow-sm">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 text-xs">
                              <i className="fas fa-shopping-cart"></i>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">{t.description}</p>
                              <p className="text-[10px] text-slate-400">{new Date(t.date).toLocaleDateString('en-IN')}</p>
                            </div>
                          </div>
                          <p className="text-sm font-black text-slate-900">-₹{t.amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-sm text-slate-400">No transactions recorded in this category yet.</p>
                  )}
                  <div className="mt-6 flex justify-center">
                    <button className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center">
                      Analysis for this Category <i className="fas fa-arrow-right ml-1.5"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add New Category Placeholder */}
        {!selectedCategory && (
          <button className="bg-white/50 border-2 border-dashed border-orange-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-orange-400 hover:text-orange-500 transition-all group min-h-[160px]">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center mb-3 group-hover:border-orange-400">
              <i className="fas fa-plus"></i>
            </div>
            <span className="font-bold text-sm">Add Category Budget</span>
          </button>
        )}
      </div>

      <div className="bg-orange-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-orange-600/20">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-xl font-bold mb-2">Smart Budgeting Advice</h3>
          <p className="text-orange-50 text-sm leading-relaxed mb-6">
            Based on your spending patterns, our AI suggests increasing your "Food & Dining" budget by 10% next month while reducing "Shopping" to match your goals.
          </p>
          <button className="bg-white text-orange-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-50 transition-colors">
            Ask AI for Optimization
          </button>
        </div>
        <i className="fas fa-magic absolute -right-4 -bottom-4 text-9xl text-white/10 rotate-12"></i>
      </div>
    </div>
  );
};

export default BudgetManager;
