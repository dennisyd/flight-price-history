import { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Graph } from '../components/Graph';

const Home: NextPage = ({ routes, sevendaylines, thirtydaylines }: any) => {
  const [showGraph, setShowGraph] = useState(false);
  const [route, setRoute] = useState({
    origin: '',
    destination: '',
  });

  const showResultsList = (inputText: any) => {
    const origin = inputText.substring(0, 3);
    const destination = inputText.substring(inputText.length - 3);
    setRoute({ origin, destination });
    setShowGraph(true);
  };

  useEffect(() => {
    console.log('useEffect in index.tsx');
    // console.log('routes: ', routes);
    // console.log('sevendaylines: ', sevendaylines);
    // console.log('thirtydaylines: ', thirtydaylines);
    console.log('route: ', route);
  });

  return (
    <div>
      <Head>
        <title>flightfarehistory</title>
        <meta name="description" content="See the history of flight fares" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header routes={routes} showResultsList={showResultsList} />

      <main>
        <Container>
          {showGraph && (
            <Graph route={route} datapoints={[sevendaylines, thirtydaylines]} />
          )}
        </Container>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const routes = await prisma.trackedroutes.findMany();
  const sevendaylines = await prisma.sevendaylines.findMany();
  const thirtydaylines = await prisma.thirtydaylines.findMany();

  return {
    props: {
      routes,
      sevendaylines,
      thirtydaylines,
    },
  };
}

export default Home;
