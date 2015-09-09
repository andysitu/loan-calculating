function onSubmit(e) {
  var inputList = ['balanceInput', 'rateInput', 'monthsInput', 'paymentInput'];

  function getValue(elementId) {
  	return document.getElementById(elementId).value
  }

  var inputValues = inputList.map(function(id, i, arr) {
  	return getValue(id);
  });

  paymentObject.inputData.apply(paymentObject, inputValues);

}

function init() {

// var reset = document.getElementById("resetButton");
// reset.addEventListener("click", onSubmit);

  var submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", onSubmit);
// add right click events for the inputs

// var tableButton = document.getElementById("tableButton");
// tableButton.addEventListener("click", function(e) {
// hideInput(false);
// });

// addClearEvents();

// reset = null;
// submit = null;
// onsubmit = null;

// Check from localStorage if anything has been stored.
// If so, will make table and change values to last setting
// of the HTML input element. Then, will plot the table.
// if (p.stor.getObj("paymentObj") !== null) {
// p.stor.setP();
// p.stor.setInputs();

// table.tableMaker( p.getPObj() );
// makeCircle();
// } else {
// hideInput(false);
// }

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