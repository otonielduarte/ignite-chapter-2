import { useState } from "react";
import ReactModal from "react-modal";
import { ButtonModalClose } from "../ButtonModalClose";
import { useTransactions } from "../../hooks/useTransactions";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { ButtonTypeTransaction, Container, TransactionTypeContainer } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onCloseModal: () => void,
}

export function NewTransactionModal({ isOpen, onCloseModal }: NewTransactionModalProps) {
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setValue] = useState(0);
  const [category, setCategory] = useState('');

  const { createTransaction } = useTransactions();

  async function handleSubmitForm(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    const formValues = { title, amount, category, type };
    await createTransaction(formValues);

    resetModal();
    onCloseModal();
  }

  function resetModal() {
    setType('deposit')
    setTitle('');
    setValue(0);
    setCategory('');
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <ButtonModalClose onClickClose={onCloseModal} />

      <Container onSubmit={handleSubmitForm}>

        <h2>Cadastrar transação</h2>
        <input type="text"
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)} />

        <input type="tel"
          placeholder="Valor"
          value={Number(amount).toFixed(2)}
          onChange={(event) => {
            setValue(parseFloat(event.target.value));
          }} />

        <TransactionTypeContainer>

          <ButtonTypeTransaction
            isActive={type === 'deposit'}
            activeColor='green'
            type="button"
            value={type}
            onClick={() => setType('deposit')}>
            <img src={incomeImg} alt="Tipo Entrada" />
            <span>Entrada</span>
          </ButtonTypeTransaction>

          <ButtonTypeTransaction type="button"
            activeColor='red'
            isActive={type === 'withdraw'}
            onClick={() => setType('withdraw')}>
            <img src={outcomeImg} alt="Tipo Saída" />
            <span>Saída</span>
          </ButtonTypeTransaction>
        </TransactionTypeContainer>

        <input type="text"
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">cadastrar</button>
      </Container>
    </ReactModal>
  );
}
