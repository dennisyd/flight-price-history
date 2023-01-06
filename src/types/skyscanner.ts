export default interface SkyscannerAPISearchCreate {
  query: {
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
    adults: string;
    cabin_class: string;
  };
}
