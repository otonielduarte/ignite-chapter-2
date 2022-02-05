import { Container } from "./styles";
import closeImg from '../../assets/close.svg';

interface ButtonModalCloseProps {
  onClickClose: () => void
}

export function ButtonModalClose({ onClickClose }: ButtonModalCloseProps) {
  return (
    <Container onClick={onClickClose}>
      <img src={closeImg} alt="Button Close" />
    </Container>
  )
}