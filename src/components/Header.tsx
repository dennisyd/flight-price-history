import { useState } from 'react';
import { Container } from './Container';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Searchbox from './Searchbox';

export function Header({ showResultsList, routes }: any) {
  const { pathname } = useRouter();

  // console.log(pathname);

  return (
    <header>
      <nav>
        <Container className="flex justify-between py-8">
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="flex-1">
                <Link href="/">
                  <a className="btn btn-ghost normal-case text-lg">
                    flightfarehist
                  </a>
                </Link>
              </div>
            </div>
            {/* {pathname === '/search' && ( */}
            <div className="navbar-center">{/* <Searchbox /> */}</div>
            {/* )} */}
            <div className="navbar-end">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link href="/about">
                    <a className="btn btn-ghost normal-case text-lg">about</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
