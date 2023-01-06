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
