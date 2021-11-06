import { DAYS, MONTHS } from "./constants";
import isEmpty from "lodash/isEmpty";

export const Time = (value) => {
  const d = value || new Date();
  return (
    DAYS[d.getDay() - 1] + " " + d.getDate() + " " + MONTHS[d.getMonth()]
  );
};

export const FilterTodayTaskOnly = (todoList) => { // This Function Filters Todays Task from all the task Present.
  if (isEmpty(todoList)) return;
  let result = todoList.filter((item) => {
    return item.createdTime == Time() || item.complitionTime == Time();
  });
  return result;
};