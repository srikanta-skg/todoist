export function NavigateFunc(pathname, data = {}) {
  let fromState = this?.location?.pathname || "";
  let toState = pathname;

  data.state = {
    ...data?.state,
    fromState,
    toState,
  };

  if (data.edit) {
    this.history.replace({
      pathname: pathname,
      search: data.searchParams || "",
      params: data.params || {},
      state: data.state || {},
    });
  } else {
    this.history.push({
      pathname: pathname,
      search: data.searchParams  || "",
      params: data.params || {},
      state: data.state || {},
    });
  }
}