import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
  recipient?: string;
}

export interface BankContextType {
  balance: number;
  hideBalance: boolean;
  userName: string;
  creditLimit: number;
  invoice: number;
  transactions: Transaction[];
  receiveMoney: (amount: number) => void;
  transfer: (amount: number, to: string) => void;
  toggleHideBalance: () => void;
  setUserName: (name: string) => void;
  setCreditLimit: (limit: number) => void;
  setInvoice: (invoice: number) => void;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(1250.50);
  const [hideBalance, setHideBalance] = useState(false);
  const [userName, setUserName] = useState('João Silva');
  const [creditLimit, setCreditLimitState] = useState(5000);
  const [invoice, setInvoiceState] = useState(1200);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      title: 'Transferência recebida',
      amount: 500,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: 'income',
      recipient: 'Maria Santos'
    },
    {
      id: '2',
      title: 'Pagamento - Supermercado',
      amount: -150.50,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      type: 'expense'
    },
    {
      id: '3',
      title: 'Transferência enviada',
      amount: -200,
      date: new Date(Date.now() - 12 * 60 * 60 * 1000),
      type: 'expense',
      recipient: 'Carlos Oliveira'
    },
    {
      id: '4',
      title: 'Salário',
      amount: 3500,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      type: 'income'
    },
    {
      id: '5',
      title: 'Conta de luz',
      amount: -120,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      type: 'expense'
    },
  ]);

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bankData');
    if (saved) {
      const data = JSON.parse(saved);
      setBalance(data.balance);
      setHideBalance(data.hideBalance);
      setUserName(data.userName);
      setCreditLimitState(data.creditLimit);
      setInvoiceState(data.invoice);
      setTransactions(data.transactions.map((t: any) => ({
        ...t,
        date: new Date(t.date)
      })));
    }
  }, []);

  // Salvar dados no localStorage
  const saveData = (newBalance: number, newTransactions: Transaction[]) => {
    setBalance(newBalance);
    setTransactions(newTransactions);
    localStorage.setItem('bankData', JSON.stringify({
      balance: newBalance,
      hideBalance,
      userName,
      creditLimit,
      invoice,
      transactions: newTransactions
    }));
  };

  const receiveMoney = (amount: number) => {
    if (amount > 0) {
      const newBalance = balance + amount;
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        title: 'Transferência recebida',
        amount,
        date: new Date(),
        type: 'income'
      };
      saveData(newBalance, [newTransaction, ...transactions]);
    }
  };

  const transfer = (amount: number, to: string) => {
    if (amount > 0 && amount <= balance && to.trim()) {
      const newBalance = balance - amount;
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        title: 'Transferência enviada',
        amount: -amount,
        date: new Date(),
        type: 'expense',
        recipient: to
      };
      saveData(newBalance, [newTransaction, ...transactions]);
    }
  };

  const toggleHideBalance = () => {
    setHideBalance(!hideBalance);
    localStorage.setItem('bankData', JSON.stringify({
      balance,
      hideBalance: !hideBalance,
      userName,
      creditLimit,
      invoice,
      transactions
    }));
  };

  const handleSetUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem('bankData', JSON.stringify({
      balance,
      hideBalance,
      userName: name,
      creditLimit,
      invoice,
      transactions
    }));
  };

  const handleSetCreditLimit = (limit: number) => {
    setCreditLimitState(limit);
    localStorage.setItem('bankData', JSON.stringify({
      balance,
      hideBalance,
      userName,
      creditLimit: limit,
      invoice,
      transactions
    }));
  };

  const handleSetInvoice = (inv: number) => {
    setInvoiceState(inv);
    localStorage.setItem('bankData', JSON.stringify({
      balance,
      hideBalance,
      userName,
      creditLimit,
      invoice: inv,
      transactions
    }));
  };

  return (
    <BankContext.Provider
      value={{
        balance,
        hideBalance,
        userName,
        creditLimit,
        invoice,
        transactions,
        receiveMoney,
        transfer,
        toggleHideBalance,
        setUserName: handleSetUserName,
        setCreditLimit: handleSetCreditLimit,
        setInvoice: handleSetInvoice,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank must be used within BankProvider');
  }
  return context;
};
