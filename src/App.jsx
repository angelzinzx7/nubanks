import { useState } from 'react'
import { BankProvider } from './context/BankContext'
import { HomeView } from './components/HomeView'
import { HistoryView } from './components/HistoryView'
import { SettingsView } from './components/SettingsView'
import { Home, Clock, User } from 'lucide-react'

function AppContent() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Conteúdo principal */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'history' && <HistoryView />}
        {activeTab === 'settings' && <SettingsView />}
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white border-t border-gray-200 flex justify-around items-center">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-4 transition ${
            activeTab === 'home'
              ? 'text-purple-600 border-t-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Início</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex flex-col items-center justify-center py-4 transition ${
            activeTab === 'history'
              ? 'text-purple-600 border-t-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Clock size={24} />
          <span className="text-xs mt-1">Histórico</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 flex flex-col items-center justify-center py-4 transition ${
            activeTab === 'settings'
              ? 'text-purple-600 border-t-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Perfil</span>
        </button>
      </nav>
    </div>
  )
}

function App() {
  return (
    <BankProvider>
      <AppContent />
    </BankProvider>
  )
}

export default App
