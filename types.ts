
export enum TransactionCategory {
  FOOD = 'Food & Dining',
  TRANSPORT = 'Transport',
  SHOPPING = 'Shopping',
  HOUSING = 'Housing',
  ENTERTAINMENT = 'Entertainment',
  INCOME = 'Income',
  UTILITIES = 'Utilities',
  OTHER = 'Other'
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: TransactionCategory;
  type: 'expense' | 'income';
}

export interface Budget {
  category: TransactionCategory;
  limit: number;
  spent: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface AccountInfo {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'credit' | 'cash';
  bankName?: string;
  accountNumber?: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'tip' | 'success';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}
