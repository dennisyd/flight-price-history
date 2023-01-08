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
  // calculate 7 and 30 days from now
  let daysAhead = [7, 30];

  let dateNow = new Date();
  let datePlus7d = new Date();
  datePlus7d.setDate(datePlus7d.getDate() + 7);
  let datePlus30d = new Date();
  datePlus30d.setDate(datePlus30d.getDate() + 30);

  let skyscannerFormat = daysAhead.map((el) => {
    let date = new Date();
    date.setDate(date.getDate() + el);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return {
      year,
      month,
      day,
    };
  });

  let prismaFormat = daysAhead.map((el) => {
    let date = new Date();
    date.setDate(date.getDate() + el);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  });

  return {
    dateNow,
    datePlus7d,
    datePlus30d,
    skyscannerFormat,
    prismaFormat,
  };
};

// TODO: make a single function that creates the date, so you have one source of truth, and then compute date formatting needs as you go along, for example:
// Date –> YYYY-MM-DD for postgres
// Date –> Skyscanner API format
export const convertDateToPrisma = ({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}): string =>
  `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

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
