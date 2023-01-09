import { useEffect, useState } from 'react';
import { Container } from './Container';
import { getAllTrackedroutes } from '../pages/api/prisma';

export function Header() {
  const [inputText, setInputText] = useState('');

  let trackedRoutes = useEffect(() => {
    console.log(inputText);
  }, [inputText]);

  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">
                  flightfarehist
                </a>
              </div>
            </div>
            <div className="navbar-center">
              <div className="form-control">
                <input
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
  // Call an external API endpoint to get posts
  const routes = await getAllTrackedroutes();
  console.log(routes);

  return {
    props: {
      routes,
    },
  };
}
