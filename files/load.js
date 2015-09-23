function init() {
  storage.storageChecker();


  addHandler("submit", "click", ui.submitData.bind(ui));
  addHandler("newTable", "click", display.hideInput);
  addHandler("addSubmit", "click", ui.paymentHandler.bind(ui));
  addHandler("reset", "click", ui.submitData.bind(ui));
  each(ui.inputList, function(input) {
    addHandler(input, "contextmenu", display.clearInput);
    addHandler(input, "input", function(e) {
      e.target.value = display.addCommaToInput(e.target.value);
    });
  });
  addHandler("addAmount", "contextmenu", display.clearInput);;

}

window.onload = init;
init = null;