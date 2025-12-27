
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { MOCK_BUDGETS } from '../constants';
import { TransactionCategory, Transaction, AccountInfo } from '../types';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

interface DashboardProps {
  onNavigate: (tab: string) => void;
  transactions: Transaction[];
  accounts: AccountInfo[];
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, transactions, accounts }) => {
  const [trendView, setTrendView] = useState<'weekly' | 'daily'>('weekly');
  
  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);
  const bankBalance = accounts.filter(a => a.type !== 'cash').reduce((acc, curr) => acc + curr.balance, 0);
  const cashBalance = accounts.filter(a => a.type === 'cash').reduce((acc, curr) => acc + curr.balance, 0);
  
  // Aggregate data for Pie Chart
  const categoryData = Object.values(TransactionCategory).map(cat => {
    const spent = transactions
      .filter(t => t.category === cat && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { name: cat, value: spent };
  }).filter(d => d.value > 0);

  // Weekly Trend Data
  const weeklyData = [
    { name: 'Week 1', amount: 450 },
    { name: 'Week 2', amount: 820 },
    { name: 'Week 3', amount: 310 },
    { name: 'Week 4', amount: 640 },
  ];

  // Daily Trend Data (Mock for last 7 days)
  const dailyData = [
    { name: 'Mon', amount: 45 },
    { name: 'Tue', amount: 120 },
    { name: 'Wed', amount: 15 },
    { name: 'Thu', amount: 85 },
    { name: 'Fri', amount: 210 },
    { name: 'Sat', amount: 340 },
    { name: 'Sun', amount: 110 },
  ];

  const currentTrendData = trendView === 'weekly' ? weeklyData : dailyData;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Balance Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          <p className="text-slate-500 text-sm font-medium">Total Net Worth</p>
          <h2 className="text-2xl font-bold mt-1 text-slate-900">₹{totalBalance.toLocaleString('en-IN')}</h2>
          <div className="mt-4 flex items-center text-emerald-600 text-[10px] font-semibold uppercase">
            <i className="fas fa-chart-line mr-1"></i>
            <span>Aggregated Assets</span>
          </div>
        </div>

        {/* Bank Funds */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          <p className="text-slate-500 text-sm font-medium">Digital Bank Funds</p>
          <h2 className="text-2xl font-bold mt-1 text-blue-600">₹{bankBalance.toLocaleString('en-IN')}</h2>
          <div className="mt-4 flex items-center text-slate-400 text-[10px] font-semibold uppercase">
            <i className="fas fa-university mr-1"></i>
            <span>Synced Banks</span>
          </div>
        </div>

        {/* Physical Cash Card - Updated Styling */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          <p className="text-slate-500 text-sm font-medium">Physical Cash</p>
          <h2 className="text-2xl font-bold mt-1 text-orange-600">₹{cashBalance.toLocaleString('en-IN')}</h2>
          <div className="mt-4 flex items-center">
            <button 
              onClick={() => onNavigate('transactions')}
              className="text-[10px] font-bold text-slate-400 hover:text-orange-600 uppercase flex items-center transition-colors group"
            >
              <i className="fas fa-wallet mr-1 group-hover:scale-110 transition-transform"></i>
              <span>Update Wallet</span>
            </button>
          </div>
        </div>

        {/* Monthly Spend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          <p className="text-slate-500 text-sm font-medium">Monthly Spending</p>
          <h2 className="text-2xl font-bold mt-1 text-slate-900">₹2,410.85</h2>
          <div className="mt-4 flex items-center text-red-500 text-[10px] font-semibold uppercase">
            <i className="fas fa-arrow-up mr-1"></i>
            <span>12% above budget</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          <h3 className="font-bold text-slate-800 mb-6">Spending by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #fed7aa' }}
                  formatter={(value: number) => `₹${value}`} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categoryData.map((item, idx) => (
              <div key={item.name} className="flex items-center text-xs text-slate-600">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Spending Trends with Toggle */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Spending Trends</h3>
            <div className="flex bg-orange-50 p-1 rounded-lg border border-orange-100">
              <button 
                onClick={() => setTrendView('weekly')}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${trendView === 'weekly' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Weekly
              </button>
              <button 
                onClick={() => setTrendView('daily')}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${trendView === 'daily' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Daily
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentTrendData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #fed7aa', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Spent']} 
                />
                <Area type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Budget Overview</h3>
            <button 
              onClick={() => onNavigate('budgets')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center"
            >
              Manage Budgets <i className="fas fa-chevron-right ml-1"></i>
            </button>
          </div>
          <div className="space-y-4">
            {MOCK_BUDGETS.slice(0, 4).map(budget => {
              const percentage = (budget.spent / budget.limit) * 100;
              const color = percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-orange-400' : 'bg-emerald-500';
              return (
                <div key={budget.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{budget.category}</span>
                    <span className="text-slate-500">₹{budget.spent} / ₹{budget.limit}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cash vs Bank Distribution - Polished Styling */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          <h3 className="font-bold text-slate-800 mb-6">Asset Distribution</h3>
          <div className="space-y-8">
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Digital Bank Balance</span>
                </div>
                <span className="text-xs font-black text-slate-900">₹{bankBalance.toLocaleString('en-IN')}</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000 ease-out shadow-sm" style={{ width: `${(bankBalance / totalBalance) * 100}%` }}></div>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Physical Cash Assets</span>
                </div>
                <span className="text-xs font-black text-orange-600">₹{cashBalance.toLocaleString('en-IN')}</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 transition-all duration-1000 ease-out shadow-sm" style={{ width: `${(cashBalance / totalBalance) * 100}%` }}></div>
              </div>
            </div>

            <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 shadow-sm flex-shrink-0">
                <i className="fas fa-lightbulb text-xs"></i>
              </div>
              <div>
                <p className="text-[11px] text-orange-900 font-bold leading-tight mb-1">Portfolio Insight</p>
                <p className="text-[10px] text-orange-700 font-medium leading-normal">
                  You currently hold {Math.round((cashBalance / totalBalance) * 100)}% of your assets in cash. Financial experts suggest maintaining a 5-10% liquid cash reserve for daily flexibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
