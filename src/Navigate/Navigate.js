import { createBrowserHistory } from "history";

export const Navigate = (path) => {
  let history = createBrowserHistory();
  history.push(path);
  let pathUrl = window.location.href;
  window.location.href = pathUrl;
};
