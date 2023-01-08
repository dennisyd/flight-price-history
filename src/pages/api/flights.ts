import { NextApiRequest, NextApiResponse } from 'next';
import { trackedroutes } from '@prisma/client';
import {
  getAllTrackedroutes,
  createSevendayChart,
  createThirtydayChart,
} from '../../prismaapi';
import SkyscannerAPICreate from '../../types/skyscanner';
import { getDates, convertDateToPrisma, computePrice } from '../../util';
import { MyDates } from '../../util';
import {
  SevendaylinesRowNoId,
  ThirtydaylinesRowNoId,
} from '../../types/prisma';

// combine N routes and M dates into an array of skyscanner requests (N*M)
const BuildSkyscannerRequests = (
  routes: trackedroutes[]
): SkyscannerAPICreate[] => {
  let dates: MyDates = getDates();

  return routes.flatMap(
    ({ id, origin, destination }): SkyscannerAPICreate[] => {
      return dates.skyscannerFormat.map((date): SkyscannerAPICreate => {
        return {
          metadata: {
            prismaRouteId: id,
            date: convertDateToPrisma(date),
          },
          body: {
            query: {
              market: 'US',
              locale: 'en-US',
              currency: 'USD',
              query_legs: [
                {
                  origin_place_id: {
                    iata: origin,
                  },
                  destination_place_id: {
                    iata: destination,
                  },
                  date,
                },
              ],
              adults: '1',
              cabin_class: 'CABIN_CLASS_ECONOMY',
            },
          },
        };
      });
    }
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if not authorized or not post, return 401 and 405 respectively
  if (req.query.API_SKYSCANNER_SECRET !== process.env.API_SKYSCANNER_SECRET) {
    return res.status(401).send('You are not authorized to call this API');
  } else if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  } else {
    try {
      const myDates = getDates();
      const routes = await getAllTrackedroutes();
      const requests = BuildSkyscannerRequests(routes);

      console.log(process.env.SKYSCANNER_PUBLIC_API_KEY);

      console.log(JSON.stringify(requests[0].body));

      const skyscannerRawResponse = await Promise.all(
        requests.map(async ({ metadata, body }) => {
          let response = await fetch(
            'https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create',
            {
              method: 'POST',
              headers: {
                'x-api-key': 'prtl6749387986743898559646983194',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            }
          );

          return {
            metadata,
            body: await response.json(),
          };
        })
      );

      // skyscannerRawResponse is an array of objects with metadata and body properties,
      // we will divide it into two arrays, one ready to post in the 7 day table and one
      // to post in the 30 day table
      const rows = skyscannerRawResponse.reduce(
        (
          acc,
          { metadata, body }
        ): {
          sevenDayRows: SevendaylinesRowNoId[];
          thirtyDayRows: ThirtydaylinesRowNoId[];
        } => {

          // delacre variables for readability
          let id = body.content.sortingOptions.best[0].itineraryId;
          let unit =
            body.content.results.itineraries[id].pricingOptions[0].unit;
          let amount =
            body.content.results.itineraries[id].pricingOptions[0].amount;
          let date = new Date(metadata.date);
          let price = computePrice(amount, unit);

          // divide into two arrays based on date
          if (date === myDates.datePlus7d) {
            acc.sevenDayRows.push({
              routeid: metadata.prismaRouteId,
              date,
              price,
            });
          } else if (date === myDates.datePlus30d) {
            acc.thirtyDayRows.push({
              routeid: metadata.prismaRouteId,
              date: metadata.date,
              price,
            });
          }

          return acc;
        },
        { sevenDayRows: [], thirtyDayRows: [] }
      );

      await createSevendayChart(rows.sevenDayRows);
      await createThirtydayChart(rows.thirtyDayRows);

      res.status(200).send(skyscannerRawResponse);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
