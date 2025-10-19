export interface Account {
  id: string;
  name: string;
  mask: string;
  type: string;
  subtype: string;
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

export interface Budget {
  id: string;
  name: string;
  category: string;
  limit: number;
  spent: number;
}

export interface Investment {
  id: string;
  name: string;
  ticker: string;
  value: number;
  quantity: number;
  price: number;
  changePercent: number;
}

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
}

export interface Bill {
    id: string;
    name: string;
    amount: number;
    dueDate: string;
}
