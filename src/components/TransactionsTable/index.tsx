import { useTransactions } from "../../hooks/useTransactions";
import { parseNumberToCurrency } from "../../utils/parseCurrency";
import { Container } from "./styles";


export function TransactionsTable() {

  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map((transaction) => {
              return (
                <tr key={`transaction-tr-${transaction.id}`}>
                  <td>{transaction.title}</td>
                  <td className={transaction.type}>{parseNumberToCurrency(transaction.amount)}</td>
                  <td>{transaction.category}</td>
                  <td>{`${new Date(transaction.createdAt).toLocaleDateString()}`}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

    </Container>
  )
}