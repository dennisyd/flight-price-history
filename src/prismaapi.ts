import { PrismaClient, trackedroutes } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTrackedroutes = async (): Promise<trackedroutes[]> => {
  try {
    return await prisma.trackedroutes.findMany();
  } catch (error) {
    console.error(error);
    return [];
  }
};

