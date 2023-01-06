import { NextApiRequest, NextApiResponse } from 'next';
import { trackedroutes } from '@prisma/client';
import { getAllRowsFromTable } from '../../prismaapi';
import SkyscannerAPISearchCreate from '../../types/skyscanner';
import { getDates } from '../../util';
import { type } from 'os';
import { _ } from 'lodash';

// combine N routes and M dates into an array of skyscanner requests (N*M)
const BuildSkyscannerRequests = (
  routes: trackedroutes[]
): SkyscannerAPISearchCreate[] => {
  let dates = getDates();

  return routes.flatMap(({ origin, destination }) => {
    return dates.map((date) => ({
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
    }));
  });
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
      const routes = await getAllRowsFromTable('trackedroutes');
      const requests = BuildSkyscannerRequests(routes);

      // get itineraries for each request
      console.log(process.env.SKYSCANNER_PUBLIC_API_KEY);

      const responses = await Promise.all(
        requests.map((request) =>
          fetch(
            'https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create',
            {
              method: 'POST',
              headers: {
                'x-api-key': 'prtl6749387986743898559646983194',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(request),
            }
          )
        )
      );

      const rawSkyscannerData = await Promise.all(
        responses.map((response) => response.json())
      );

      for (let y of rawSkyscannerData) {
        console.log(y);
      }

      res.status(200).send(rawSkyscannerData);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
