import { PrismaClient, trackedroutes } from '@prisma/client';

export const getAllRowsFromTable = async (
  table: string
): Promise<trackedroutes[]> => {
  try {
    const prisma = new PrismaClient();
    return await prisma[table].findMany();
  } catch (error) {
    console.error(error);
    return [];
  }
};
