import { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../components/Container';
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';

const Home: NextPage = ({ routes }: any) => {
  return (
    <div>
      <Head>
        <title>about fph</title>
        <meta name="description" content="See the history of flight fares" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          choose a route from the{' '}
          <a className="underline" href="/">
            homepage
          </a>{' '}
          to see the price history of flight fares
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
          , contributions welcome on{' '}
          <a
            className="underline"
            href="http://github.com/eula01/flightfarehist"
          >
            the github repository
          </a>
        </Container>
      </main>
    </div>
  );
};

export default Home;
