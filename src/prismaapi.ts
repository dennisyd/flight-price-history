import { PrismaClient, trackedroutes } from '@prisma/client';
import { SevendaylinesRowNoId, ThirtydaylinesRowNoId } from './types/prisma';

const prisma = new PrismaClient();

export const getAllTrackedroutes = async (): Promise<trackedroutes[]> => {
  try {
    return await prisma.trackedroutes.findMany();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createSevendayChart = async (data: SevendaylinesRowNoId[]) => {
  try {
    return await prisma.sevendaylines.createMany({
      data,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createThirtydayChart = async (data: ThirtydaylinesRowNoId[]) => {
  try {
    return await prisma.thirtydaylines.createMany({
      data,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};
