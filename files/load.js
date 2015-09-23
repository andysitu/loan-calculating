function init() {
  storage.storageChecker();


  addHandler("submit", "click", ui.submitData.bind(ui));
  addHandler("newTable", "click", display.hideInput);
  addHandler("addSubmit", "click", ui.paymentHandler.bind(ui));
  addHandler("reset", "click", ui.submitData.bind(ui));
  each(ui.inputList, function(input) {
    addHandler(input, "contextmenu", display.clearInput);
  });
  addHandler("addAmount", "contextmenu", display.clearInput);


  addHandler("balance", "input", function(e) {
    e.target.value = ui.addCommaToInput(e.target.value);
  });
}

window.onload = init;
init = null;