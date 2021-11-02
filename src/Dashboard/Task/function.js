import { DAYS, MONTHS } from "./constants";

export const Time = () => {
  const d = new Date();
  return (
    DAYS[d.getDay() - 1] + " " + d.getDate() + " " + MONTHS[d.getMonth() - 1]
  );
};
