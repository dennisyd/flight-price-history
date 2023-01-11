import { Container } from './Container';
import { Header } from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}
