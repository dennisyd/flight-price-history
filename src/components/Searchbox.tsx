import { PrismaClient, trackedroutes } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFilterRoutesSearch } from '../hooks/filterSearch';
import { useRouter } from 'next/router';

export const Searchbox = ({ searchTerm, setSearchTerm }: any) => {
  const router = useRouter();

  // filter the routes based on the search term
  // const { searchTerm, setSearchTerm, filteredRoutes } =
  //   useFilterRoutesSearch(routes);

  const handleEnter = (e: any) => {
    // TODO: add validation on search input
    if (e.key === 'Enter') {
      setSearchTerm(searchTerm.trim());
      const origin = searchTerm.substring(0, 3);
      const destination = searchTerm.substring(searchTerm.length - 3);
      router.push(`/search/?origin=${origin}&destination=${destination}`);
    }
  };

  return (
    <div className="form-control">
      <div className="input-group">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleEnter}
          value={searchTerm}
          type="text"
          placeholder="Search…"
          className="input input-bordered"
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Searchbox;
