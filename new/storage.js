/* Handles anything to do with local storage.
 * Currently storing only input data because user
 * might not necessarily want the same table/ payment
 * array displayed each time.
 */
var storage =  {
  store(key, value) {
  // Handles storing data.
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  retrieve(key) {
  // Handles retrieving data.
    var value = localStorage.getItem(key);
    return JSON.parse(value);
  },
  del(key) {
  // Deletes data. Not used yet.
    localStraoge.removeItem(key);
  },
  storageChecker() {
  // Checks if data exist and then sets the input by
  //  calling on ui. Need to change this since ui should
  //  call on this, not the other way around.
    var inputData = storage.retrieve("inputData");
    if (inputData) {
      ui.setInputs(inputData);
    }
  },
};