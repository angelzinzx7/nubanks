import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { Eye, EyeOff, Send, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export const HomeView = () => {
  const { balance, hideBalance, toggleHideBalance, receiveMoney, transfer } = useBank();
  const [receiveValue, setReceiveValue] = useState('');
  const [transferValue, setTransferValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [activeTab, setActiveTab] = useState('receive');

  const handleReceive = () => {
    const value = parseFloat(receiveValue);
    if (!isNaN(value) && value > 0) {
      receiveMoney(value);
      setReceiveValue('');
    }
  };

  const handleTransfer = () => {
    const value = parseFloat(transferValue);
    if (!isNaN(value) && value > 0 && recipient.trim()) {
      transfer(value, recipient);
      setTransferValue('');
      setRecipient('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header com saldo */}
      <div className="bg-gradient-to-b from-purple-600 to-purple-700 text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-sm text-purple-100 mb-2">Olá, bem-vindo!</p>
            <h1 className="text-3xl font-bold">NuBanks</h1>
          </div>
          <button
            onClick={toggleHideBalance}
            className="p-2 hover:bg-purple-500 rounded-full transition"
          >
            {hideBalance ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </div>

        {/* Saldo */}
        <div className="bg-purple-500 bg-opacity-50 rounded-2xl p-4 mb-6">
          <p className="text-xs text-purple-100 mb-1">Saldo disponível</p>
          <p className="text-4xl font-bold">
            {hideBalance ? '••••••' : `R$ ${balance.toFixed(2).replace('.', ',')}`}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('receive')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition ${
              activeTab === 'receive'
                ? 'bg-white text-purple-600'
                : 'bg-purple-500 text-white'
            }`}
          >
            <ArrowDownLeft className="inline mr-2" size={18} />
            Receber
          </button>
          <button
            onClick={() => setActiveTab('transfer')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition ${
              activeTab === 'transfer'
                ? 'bg-white text-purple-600'
                : 'bg-purple-500 text-white'
            }`}
          >
            <ArrowUpRight className="inline mr-2" size={18} />
            Transferir
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'receive' ? (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Receber dinheiro</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor a receber
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 font-semibold">R$</span>
                <input
                  type="number"
                  value={receiveValue}
                  onChange={(e) => setReceiveValue(e.target.value)}
                  placeholder="0,00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  step="0.01"
                />
              </div>
            </div>
            <button
              onClick={handleReceive}
              disabled={!receiveValue || parseFloat(receiveValue) <= 0}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:bg-gray-300 transition"
            >
              Confirmar recebimento
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Transferir dinheiro</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do destinatário
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Digite o nome"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor da transferência
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 font-semibold">R$</span>
                <input
                  type="number"
                  value={transferValue}
                  onChange={(e) => setTransferValue(e.target.value)}
                  placeholder="0,00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  step="0.01"
                />
              </div>
            </div>
            <button
              onClick={handleTransfer}
              disabled={!transferValue || !recipient || parseFloat(transferValue) <= 0 || parseFloat(transferValue) > balance}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:bg-gray-300 transition flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Enviar transferência
            </button>
            {parseFloat(transferValue) > balance && (
              <p className="text-red-500 text-sm">Saldo insuficiente</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
