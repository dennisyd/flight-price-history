import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { trackedroutes } from '@prisma/client';
import { getAllRowsFromTable } from '../../prismaapi';
import SkyscannerAPISearchCreate from '../../types/skyscanner';
import { getDates } from '../../util';

// combine N routes and M dates into an array of skyscanner requests (N*M)
const BuildSkyscannerRequests = (
  routes: trackedroutes[]
): SkyscannerAPISearchCreate[] => {
  let dates = getDates();

  return routes.flatMap(({ origin, destination }) => {
    return dates.map((date) => ({
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
      cabinclass: 'CABIN_CLASS_ECONOMY',
      adults: '1',
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

      // for (let route of requests) {
      //   console.log(route.query_legs);
      // }

      // write a for loop that sends a request to the skyscanner api for each request and then saves the reponse to the res array

      let res1 = [];
      for (let request of requests) {
        let response = await fetch(
          'https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.API_SKYSCANNER_KEY,
            },
            body: JSON.stringify(request),
          }
        );
        res1.push(response);
      }

      console.log(res1);

      res.status(200).json({ requests });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
