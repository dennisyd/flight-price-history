export default interface SkyscannerAPISearchCreate {
  market: string;
  locale: string;
  currency: string;
  query_legs: {
    origin_place_id: {
      iata: string;
    };
    destination_place_id: {
      iata: string;
    };
    date: {
      year: number;
      month: number;
      day: number;
    };
  }[];
  cabinclass: string;
  adults: string;
}
