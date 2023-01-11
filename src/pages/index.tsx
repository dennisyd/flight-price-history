import { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../components/Container';
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Searchbox } from '../components/Searchbox';
import { useFilterRoutesSearch } from '../hooks/filterSearch';

const Home: NextPage = ({ routes }: any) => {
  // hook for controlling search bar on index page, filtering routes and mapping them to links
  const { searchTerm, setSearchTerm, filteredRoutes } =
    useFilterRoutesSearch(routes);

  return (
    <Container>
      <Head>
        <title>flightfarehistory</title>
        <meta name="description" content="See the history of flight fares" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <div className="mb-5">
            <Searchbox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          {routes.map((route: any) => (
            <div key={route.id}>
              <a
                className="underline"
                href={`/search?origin=${route.origin}&destination=${route.destination}`}
              >
                {route.origin} to {route.destination}
              </a>
            </div>
          ))}
          {/* </div> */}
        </Container>
      </main>
    </Container>
  );
};

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const routes = await prisma.trackedroutes.findMany();

  return {
    props: {
      routes,
    },
  };
}

export default Home;
