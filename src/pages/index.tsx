import { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Container } from '../components/Container';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>flightfarehistory</title>
        <meta name="description" content="See the history of flight fares" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Container></Container>
      </main>
    </div>
  );
};

export default Home;
