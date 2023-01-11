import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // return all tracked routes
  if (req.method === 'GET') {
    const routes = await prisma.trackedroutes.findMany({});
    res.json(routes);
  }
};
