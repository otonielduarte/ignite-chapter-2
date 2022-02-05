import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onClickButtonNewTransaction: () => void;
}

export function Header({ onClickButtonNewTransaction }: HeaderProps) {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="ommoney"></img>
        <button
          type="button"
          onClick={onClickButtonNewTransaction}>
          Nova transação
        </button>

      </Content>
    </Container>
  )
}