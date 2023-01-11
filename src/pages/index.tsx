import { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../components/Container';
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';

const Home: NextPage = ({ routes, sevendaylines, thirtydaylines }: any) => {
  return (
    <div>
      <Head>
        <title>flightfarehistory</title>
        <meta name="description" content="See the history of flight fares" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          use the search bar above with the format "[origin] to [destination]"
          (e.g. "LGW to BOS") to see the history of flight fares 
          <br />
          <br />
          our data is provided by{' '}
          <a className="underline" href="http://skyscanner.com">
            skyscanner
          </a>
          <br />
          <br />
          made by{' '}
          <a className="underline" href="http://github.com/eula01">
            eula01
          </a>
        </Container>
      </main>
    </div>
  );
};

export default Home;
