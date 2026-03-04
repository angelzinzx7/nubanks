# 🟣 NuBanks - App Bancário Moderno

Um aplicativo bancário moderno e responsivo inspirado no design do Nubank, desenvolvido com **React** e **Tailwind CSS**.

## ✨ Funcionalidades

### 🏠 **Tela Inicial (Home)**
- Visualização do saldo disponível
- Opção de ocultar/mostrar saldo
- Receber dinheiro
- Fazer transferências para outros usuários
- Interface roxo elegante com gradiente

### 📊 **Histórico de Transações**
- Todas as transações organizadas por data
- Ícones visuais para entrada (verde) e saída (vermelho)
- Informações detalhadas: título, valor, data/hora
- Nomes dos destinatários quando aplicável
- Histórico persistente

### 👤 **Perfil e Configurações**
- Editar nome do usuário
- Ajustar limite do cartão de crédito (R$ 1.000 a R$ 50.000)
- Gerenciar fatura atual
- Visualizar crédito disponível
- Opção de logout

### 💾 **Persistência de Dados**
- Todos os dados são salvos no **localStorage**
- Transações e configurações persistem entre sessões
- Sem necessidade de backend

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework UI
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **PostCSS** - Processamento de CSS

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/angelzinzx7/nubanks.git
cd nubanks

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🚀 Deploy

O projeto está configurado para deploy automático no **GitHub Pages** via **GitHub Actions**:

1. Cada push para a branch `main` dispara o workflow
2. O GitHub Actions faz o build automaticamente
3. O site é publicado em: `https://angelzinzx7.github.io/nubanks/`

## 📁 Estrutura do Projeto

```
nubanks/
├── src/
│   ├── components/
│   │   ├── HomeView.jsx      # Tela inicial
│   │   ├── HistoryView.jsx   # Histórico de transações
│   │   └── SettingsView.jsx  # Configurações e perfil
│   ├── context/
│   │   └── BankContext.jsx   # Contexto de estado do banco
│   ├── App.jsx               # Componente principal
│   ├── main.jsx              # Entrada da aplicação
│   └── index.css             # Estilos globais
├── public/                   # Arquivos estáticos
├── .github/workflows/        # GitHub Actions workflows
├── tailwind.config.js        # Configuração Tailwind
├── vite.config.js            # Configuração Vite
└── package.json              # Dependências
```

## 💡 Como Usar

### Receber Dinheiro
1. Clique na aba "Início"
2. Selecione "Receber"
3. Digite o valor
4. Clique em "Confirmar recebimento"

### Fazer Transferência
1. Clique na aba "Início"
2. Selecione "Transferir"
3. Digite o nome do destinatário
4. Digite o valor
5. Clique em "Enviar transferência"

### Visualizar Histórico
1. Clique na aba "Histórico"
2. Veja todas as suas transações organizadas por data

### Configurar Perfil
1. Clique na aba "Perfil"
2. Edite seu nome
3. Ajuste o limite do cartão
4. Gerencie sua fatura

## 🎨 Design

O app segue o design moderno do Nubank com:
- Paleta de cores roxo/púrpura
- Interface limpa e intuitiva
- Responsivo para mobile e desktop
- Ícones claros e objetivos
- Animações suaves

## 📱 Responsividade

O app é totalmente responsivo e funciona perfeitamente em:
- ✅ iPhone
- ✅ Android
- ✅ Tablets
- ✅ Desktops

## 🔐 Segurança

- Dados armazenados localmente no navegador
- Sem envio de dados para servidores
- Sem necessidade de senha
- Totalmente privado

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ como um projeto de demonstração de app bancário moderno.

---

**Aproveite seu NuBanks! 🚀💜**
