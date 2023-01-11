import { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../components/Container';
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Graph } from '../components/Graph';
import { useRouter } from 'next/router';

const Search: NextPage = ({ routes, sevendaylines, thirtydaylines }: any) => {
  const router = useRouter();
  const { origin, destination } = router.query;

  // get routeid then filter data
  const route = routes.find(
    (e) => e.origin === origin && e.destination === destination
  );

  const filteredSevenday = sevendaylines.filter(
    (datapoint) => datapoint.routeid === route.id
  );

  const filteredThirtyday = thirtydaylines.filter(
    (datapoint) => datapoint.routeid === route.id
  );

  return (
    <div>
      <Head>
        <title>flight search</title>
        <meta name="description" content="See the history of flight fares" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Graph data={{ filteredSevenday, filteredThirtyday }} />
        </Container>
      </main>
    </div>
  );
};

export async function getServerSideProps(context: any) {
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

export default Search;
