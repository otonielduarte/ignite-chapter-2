import { useTransactions } from "../../hooks/useTransactions";

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import { Container } from "./styles";
import { parseNumberToCurrency } from "../../utils/parseCurrency";

export function Summary() {

  const { transactions } = useTransactions();

  const sumaryValues = transactions.reduce((totals, transaction) => {
    if (transaction.type === 'deposit') {
      totals.amount += transaction.amount
    } else {
      totals.outcome -= transaction.amount
    }
    return {
      ...totals,
      total: totals.amount + totals.outcome
    };
  }, { amount: 0, outcome: 0, total: 0 });

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="imagem entradas"></img>
        </header>
        <strong>{parseNumberToCurrency(sumaryValues.amount)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="imagem saidas"></img>
        </header>
        <strong>{parseNumberToCurrency(sumaryValues.outcome)}</strong>
      </div>

      <div className="higthlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="imagem total"></img>
        </header>
        <strong>{parseNumberToCurrency(sumaryValues.total)}</strong>
      </div>
    </Container>
  )
}