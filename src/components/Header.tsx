import { useEffect, useState } from 'react';
import { Container } from './Container';
import { parentPort } from 'worker_threads';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Prisma, PrismaClient, prisma } from '@prisma/client';

export function Header({ showResultsList }: any) {
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  const handleSearch = (e: any) => {
    // TODO: add validation on search input
    if (e.key === 'Enter') {
      const origin = inputText.substring(0, 3);
      const destination = inputText.substring(inputText.length - 3);
      router.push(`/search/?origin=${origin}&destination=${destination}`);
    }
  };

  // TODO: extract searchbar into its own component
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="flex-1">
                <Link href="/">
                  <a className="btn btn-ghost normal-case text-xl">
                    flightfarehist
                  </a>
                </Link>
              </div>
            </div>
            <div className="navbar-center">
              <div className="form-control">
                <input
                  id="header-search"
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleSearch}
                  type="text"
                  placeholder="Search"
                  className="input input-bordered"
                />
              </div>
            </div>
            <div className="navbar-end">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a>About</a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  // this looks inefficient but it's perfectly fine, these tables will always be very small
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
