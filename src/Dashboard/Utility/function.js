export function storageService() {
  var service = {
    clear: clear,
    set: set,
    get: get,
    setObject: setObject,
    getObject: getObject,
  };
  return service;

  function clear() {
    return window.sessionStorage.clear();
  }

  function set(key, value) {
    window.sessionStorage.setItem(key, value);
  }

  function get(key) {
    return window.sessionStorage.getItem(key) || false;
  }

  function setObject(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  function getObject(key) {
    const value = window.sessionStorage.getItem(key);
    return JSON.parse(value) || {};
  }
}
