export interface MyDates {
  dateNow: Date;
  datePlus7d: Date;
  datePlus30d: Date;
  skyscannerFormat: {
    year: number;
    month: number;
    day: number;
  }[];
  prismaFormat: string[];
}

export const getDates = (): MyDates => {
  // calculate skyscanner and prisma date formats for 7 days ahead and 30 days ahead
  let daysAhead = [7, 30];

  let dateNow = new Date();
  let datePlus7d = new Date();
  datePlus7d.setDate(datePlus7d.getDate() + 7);
  let datePlus30d = new Date();
  datePlus30d.setDate(datePlus30d.getDate() + 30);

  // this ensures the dt
  let skyscannerAndPrismaFormats = daysAhead.reduce(
    (acc, el) => {
      let date = new Date();
      date.setDate(date.getDate() + el);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      return {
        prismaFormat: [
          ...acc.prismaFormat,
          `${year}-${month < 10 ? `0${month}` : month}-${
            day < 10 ? `0${day}` : day
          }`,
        ],
        skyscannerFormat: [
          ...acc.skyscannerFormat,
          {
            year,
            month,
            day,
          },
        ],
      };
    },
    { prismaFormat: [], skyscannerFormat: [] }
  );

  return {
    dateNow,
    datePlus7d,
    datePlus30d,
    skyscannerFormat: skyscannerAndPrismaFormats.skyscannerFormat,
    prismaFormat: skyscannerAndPrismaFormats.prismaFormat,
  };
};

// deprecated
export const convertDateToYYYMMDD = (date: Date) =>
  date.toISOString().split('T')[0];

type unitArg =
  | 'PRICE_UNIT_UNSPECIFIED'
  | 'PRICE_UNIT_WHOLE'
  | 'PRICE_UNIT_CENTI'
  | 'PRICE_UNIT_MILLI'
  | 'PRICE_UNIT_MICRO';

export const computePrice = (amount: string, unit: unitArg) => {
  switch (unit) {
    case 'PRICE_UNIT_CENTI':
      return parseInt(amount) / 100;
    case 'PRICE_UNIT_MILLI':
      return parseInt(amount) / 1000;
    case 'PRICE_UNIT_MICRO':
      return parseInt(amount) / 1000000;
    default:
      return parseInt(amount);
  }
};
