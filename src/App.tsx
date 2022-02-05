import { createServer, Model } from "miragejs";
import { useState } from "react";
import ReactModal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";
import { GlobalStyle } from "./styles/global";
import { Constants } from "./utils/constants";

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freela',
          type: 'deposit',
          category: 'Jobs',
          amount: 6000,
          createdAt: new Date('2022-03-03')
        },
        {
          id: 2,
          title: 'Internet',
          type: 'withdraw',
          category: 'despesa',
          amount: 99,
          createdAt: new Date('2022-02-10')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.post('/transactions', (schema, { requestBody }) => {
      const parsedBody = JSON.parse(requestBody);
      const data = { ...parsedBody, createdAt: new Date() };
      const result = schema.create('transaction', data)
      return result;
    })

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })
  }
});



ReactModal.setAppElement(`#${Constants.rootElement}`);

export function App() {

  const [isModalTransactionOpen, setIsModalTransactionOpen] = useState(false);

  function handleOpenModalTransaction() {
    setIsModalTransactionOpen(true);
  }

  function handleCloseModal() {
    setIsModalTransactionOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onClickButtonNewTransaction={handleOpenModalTransaction} />

      <Dashboard />

      <NewTransactionModal
        isOpen={isModalTransactionOpen}
        onCloseModal={handleCloseModal} />

      <GlobalStyle />
    </TransactionsProvider>
  );
}

export default App;
