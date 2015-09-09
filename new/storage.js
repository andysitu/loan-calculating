var storage =  {
  store(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  retrieve(key) {
    var value = localStorage.getItem(key);
    return JSON.parse(value);
  },
  del(key) {
    localStraoge.removeItem(key);
  }
};