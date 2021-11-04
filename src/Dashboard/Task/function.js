import { DAYS, MONTHS } from "./constants";

export const Time = (value) => {
  const d = value || new Date();
  return (
    DAYS[d.getDay() - 1] + " " + d.getDate() + " " + MONTHS[d.getMonth()]
  );
};
