function init() {
  storage.storageChecker();

// var reset = document.getElementById("resetButton");
// reset.addEventListener("click", onSubmit);

  

// var tableButton = document.getElementById("tableButton");
// tableButton.addEventListener("click", function(e) {
// hideInput(false);
// });

  ui.addSubmitHandler();
  ui.addRClickClear();


// var add = document.getElementById("addSubmit");
// add.addEventListener("click", function(e){
// var addInput = document.getElementById("addInput");
// if (parseFloat(addInput.value) > 0) {
// p.addPayments(decimalConverter(addInput.value));
// } else {
// display("You didn't enter an value into Add");
// }
// addInput.value = "";
// });

}

window.onload = init;
init = null;