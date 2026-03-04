import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { User, CreditCard, LogOut } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { userName, creditLimit, invoice, setUserName, setCreditLimit, setInvoice } = useBank();
  const [newName, setNewName] = useState(userName);
  const [tempCreditLimit, setTempCreditLimit] = useState(creditLimit);
  const [tempInvoice, setTempInvoice] = useState(invoice);
  const [saved, setSaved] = useState(false);

  const handleSaveName = () => {
    if (newName.trim()) {
      setUserName(newName);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleSaveCreditLimit = () => {
    setCreditLimit(tempCreditLimit);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveInvoice = () => {
    setInvoice(tempInvoice);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const availableCredit = creditLimit - invoice;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-600 to-purple-700 text-white p-6 rounded-b-3xl">
        <h1 className="text-3xl font-bold">Perfil</h1>
        <p className="text-purple-100 text-sm mt-2">Suas configurações</p>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Notificação de sucesso */}
        {saved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
            Salvo com sucesso!
          </div>
        )}

        {/* Seção de Usuário */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <User size={24} className="text-purple-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Usuário</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={handleSaveName}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Salvar nome
            </button>
          </div>
        </div>

        {/* Seção de Cartão */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <CreditCard size={24} className="text-purple-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Cartão de Crédito</h2>
          </div>

          <div className="space-y-4">
            {/* Limite */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Limite do cartão: R$ {tempCreditLimit.toFixed(2).replace('.', ',')}
              </label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={tempCreditLimit}
                onChange={(e) => setTempCreditLimit(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>R$ 1.000</span>
                <span>R$ 50.000</span>
              </div>
              <button
                onClick={handleSaveCreditLimit}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition mt-3"
              >
                Salvar limite
              </button>
            </div>

            {/* Fatura */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fatura atual: R$ {tempInvoice.toFixed(2).replace('.', ',')}
              </label>
              <input
                type="range"
                min="0"
                max="50000"
                step="100"
                value={tempInvoice}
                onChange={(e) => setTempInvoice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>R$ 0</span>
                <span>R$ 50.000</span>
              </div>
              <button
                onClick={handleSaveInvoice}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition mt-3"
              >
                Salvar fatura
              </button>
            </div>

            {/* Crédito disponível */}
            <div className="bg-white rounded-lg p-3 border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Crédito disponível</p>
              <p className="text-2xl font-bold text-purple-600">
                R$ {availableCredit.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>

        {/* Seção de Logout */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-200 transition">
            <LogOut size={20} />
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
};
