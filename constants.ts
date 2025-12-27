
import { TransactionCategory, Transaction, AccountInfo, Budget, Notification } from './types';

export const MOCK_ACCOUNTS: AccountInfo[] = [
  { id: 'acc_1', name: 'Main Checking', balance: 4250.75, type: 'checking' },
  { id: 'acc_2', name: 'Emergency Fund', balance: 12000.00, type: 'savings' },
  { id: 'acc_3', name: 'Travel Credit Card', balance: -840.20, type: 'credit' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2023-10-25', amount: 120.50, description: 'Whole Foods Market', category: TransactionCategory.FOOD, type: 'expense' },
  { id: 't2', date: '2023-10-24', amount: 45.00, description: 'Shell Gas Station', category: TransactionCategory.TRANSPORT, type: 'expense' },
  { id: 't3', date: '2023-10-23', amount: 2500.00, description: 'Monthly Salary', category: TransactionCategory.INCOME, type: 'income' },
  { id: 't4', date: '2023-10-22', amount: 15.99, description: 'Netflix Subscription', category: TransactionCategory.ENTERTAINMENT, type: 'expense' },
  { id: 't5', date: '2023-10-21', amount: 1200.00, description: 'Rent Payment', category: TransactionCategory.HOUSING, type: 'expense' },
  { id: 't6', date: '2023-10-20', amount: 85.30, description: 'Amazon.com', category: TransactionCategory.SHOPPING, type: 'expense' },
  { id: 't7', date: '2023-10-19', amount: 55.00, description: 'Starbucks Coffee', category: TransactionCategory.FOOD, type: 'expense' },
  { id: 't8', date: '2023-10-18', amount: 110.00, description: 'Utility Bill', category: TransactionCategory.UTILITIES, type: 'expense' },
];

export const MOCK_BUDGETS: Budget[] = [
  { category: TransactionCategory.FOOD, limit: 500, spent: 320 },
  { category: TransactionCategory.TRANSPORT, limit: 200, spent: 145 },
  { category: TransactionCategory.ENTERTAINMENT, limit: 100, spent: 85 },
  { category: TransactionCategory.SHOPPING, limit: 300, spent: 210 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Budget Warning',
    message: 'You have reached 90% of your Shopping budget. Maybe hold off on that next purchase?',
    time: '2 hours ago',
    isRead: false
  },
  {
    id: '2',
    type: 'tip',
    title: 'AI Smart Tip',
    message: "Your 'Food & Dining' spend is 15% higher this week. FundVision AI suggests meal prepping to save approx ₹1,200/month.",
    time: '5 hours ago',
    isRead: false
  },
  {
    id: '3',
    type: 'success',
    title: 'Goal Milestone!',
    message: "Congratulations! You're now 70% towards your 'Dream Home' savings goal.",
    time: '1 day ago',
    isRead: true
  },
  {
    id: '4',
    type: 'tip',
    title: 'Investment Insight',
    message: 'You have ₹5,000 sitting idle in your checking account. Consider moving it to a liquid fund for better returns.',
    time: '2 days ago',
    isRead: true
  }
];
