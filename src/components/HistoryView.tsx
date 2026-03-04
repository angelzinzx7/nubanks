import React from 'react';
import { useBank } from '../context/BankContext';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { transactions } = useBank();

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) {
      return `Hoje às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (d.toDateString() === yesterday.toDateString()) {
      return `Ontem às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
  };

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, typeof transactions>);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-600 to-purple-700 text-white p-6 rounded-b-3xl">
        <h1 className="text-3xl font-bold">Histórico</h1>
        <p className="text-purple-100 text-sm mt-2">Suas transações</p>
      </div>

      {/* Transações */}
      <div className="flex-1 overflow-y-auto p-4">
        {Object.entries(groupedTransactions).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-lg">Nenhuma transação</p>
          </div>
        ) : (
          Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
            <div key={date} className="mb-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 px-2">
                {new Date(date).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: '2-digit',
                  month: 'long'
                })}
              </h3>
              <div className="space-y-2">
                {dayTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.amount > 0
                            ? 'bg-green-100'
                            : 'bg-red-100'
                        }`}
                      >
                        {transaction.amount > 0 ? (
                          <ArrowDownLeft
                            size={20}
                            className="text-green-600"
                          />
                        ) : (
                          <ArrowUpRight
                            size={20}
                            className="text-red-600"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {transaction.title}
                        </p>
                        {transaction.recipient && (
                          <p className="text-xs text-gray-500">
                            {transaction.recipient}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`font-bold text-lg ${
                        transaction.amount > 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      R$ {Math.abs(transaction.amount).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
