export const getDates = () => {
  // calculate 7 and 30 days from now
  let daysAhead = [7, 30];

  return daysAhead.map((el) => {
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
};

export const BuildSkyscannerRequests = () => {
  let dates = getDates();

  // for each route, create a request with each date
  return routes.map((el) => {
    let res = [];

    for (let i = 0; i < dates.length; i++) {
      console.log(el, dates[i]);

      res.push({
        // hardcoded lots of values to minimize combinations and requests to skyscanner, because we're using the public API which is heavily rate limited
        market: 'US',
        locale: 'en-US',
        currency: 'USD',
        query_legs: [
          {
            origin_place_id: {
              iata: el['origin'],
            },
            destination_place_id: {
              iata: el['destination'],
            },
            date: dates[i],
          },
        ],
        cabinclass: 'CABIN_CLASS_ECONOMY',
        adults: '1',
      });
    }
    return res;
  });
};
