function init() {
  storage.storageChecker();

  addHandler("submit", "click", ui.submitData.bind(ui));
  addHandler("submit", "click", display.hideInput);
  addHandler("newTable", "click", display.hideInput);
  addHandler("addSubmit", "click", ui.paymentHandler.bind(ui));
  addHandler("reset", "click", ui.submitData.bind(ui));
  each(ui.inputList, function(input) {
    addHandler(input, "contextmenu", display.clearInput);
  });

}

window.onload = init;
init = null;