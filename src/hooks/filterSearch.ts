import { trackedroutes } from '@prisma/client';
import { useState } from 'react';

/*
typescript is being weird, here's the type:
{
  id: number;
  origin: string;
  destination: string;
}
*/

export function useFilterRoutesSearch<T>(items: T[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = items.filter((item) => {
    // only filtering by origin for now, but could add more if more routes are added
    // TOD0: get skyscanner's api so i can increase # of routes
    return item.origin.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return { searchTerm, setSearchTerm, filteredRoutes };
}

// how to use this
