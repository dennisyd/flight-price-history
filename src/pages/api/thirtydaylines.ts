import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get the thirty day line for a specific route
  if (req.method === 'GET') {
    const id = Number(req.query.routeid);
    const routes = await prisma.thirtydaylines.findMany({
      where: { routeid: id },
    });
    res.json(routes);
    console.log('routes in API handler: ', routes);
  } else if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    const thirtydayline = await prisma.thirtydaylines.createMany({
      data,
    });

    res.json(thirtydayline);
  }
};
