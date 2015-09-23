// This handles the physical appearance of the page.
// Includes the table, circle canvas, and display messages.
display = {
  displayMessage(message) {
    alert(message);
  },
  addTable(docFrag) {
  // Appends document fragment of table. Will either
  //  append or replace the child depending on whether
  //  the table already exists on the page.
    var test = document.getElementById("paymentTable");
    var tableHere = document.getElementById("table_container");
    if (test === null) {
      tableHere.appendChild(docFrag);
    } else {
      test.removeEventListener("click", tableSelect.toggleSelected.bind(tableSelect));
      tableHere.replaceChild(docFrag, test);
    }
  },
  setInputs(inputData) {
  // Sets the inputs on the page. InputData is 
  //  an object with name of input in property.
    each(inputData, function(value, elementId) {
        setInput(elementId, this.addCommaToInput(value));
    }, this);
  },
  addCircle(paymentSystem) {
  // Runs method to make pie chart in canvas.
  // Canvas element is already set. Modified by
  // circle and circle creates ctx.
    circle.makeCircle(paymentSystem);
  },
  displayCharts(paymentSystem) {
  // Handles creation of table and pie chart.
    var docFrag = table.createTable(paymentSystem);
    this.addTable(docFrag);
    this.addCircle(paymentSystem);
  },
  hideInput: function(e) {
  // Making the payment array by user hides the input
  //  for entering the data and shows input to modifiy
  //  payments. 
    var value = e.target.value,
      input = document.getElementById("inputForm"),
      options = document.getElementById("optionsForm");

    if (value == 'submit') {  
      input.hidden = true;
      options.hidden = false;
    } else if (value == 'newTable') {
      input.hidden = false;
      options.hidden = true;
    } 
  },
  clearInput: function(e) {
    e.preventDefault();
    e.target.value = "";
  },
  addCommaToInput(text) {
    if (text == "")
      return "";
    text = String(text);
    var newText = numberAndDot(text);
    return commas(newText);
  } 
};