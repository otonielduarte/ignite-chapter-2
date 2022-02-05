import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

type Transaction = {
  id: number,
  title: string,
  amount: number,
  category: string,
  type: string,
  createdAt: string
}

type TransactionFormProps = Omit<Transaction, 'id' | 'createdAt'>;

type TransactionsProviderProps = {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionFormProps) => Promise<void>
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactionsFromApi = async () => {
    try {
      const response = await api.get('/transactions')
      if (response.status === 200) {
        console.log(response.data);
        setTransactions(response.data.transactions);
      } else {
        throw new Error('bad request');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createTransaction(transaction: TransactionFormProps): Promise<void> {
    try {
      const response = await api.post('/transactions', transaction)
      if (response.status === 201) {
        setTransactions([response.data, ...transactions]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadTransactionsFromApi();
  }, [])

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

function useTransactions() {
  const context = useContext(TransactionContext);
  if (context == null) {
    throw new Error('TransactionContext must be initialized')
  }
  return context;
}

export { TransactionsProvider, useTransactions }