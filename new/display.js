display = {
  displayMessage(message) {
    alert(message);
  },
  addTable(docFrag) {
    var test = document.getElementById("paymentTable");
    var tableHere = document.getElementById("table_container");
    if (test === null) {
      tableHere.appendChild(docFrag);
    } else {
      tableHere.replaceChild(docFrag, test);
    }
  },
  setInputs(inputData) {
    each(inputData, function(value, elementId) {
        setInput(elementId, value);
    });
  },
  addCircle(paymentSystem) {
    circle.makeCircle(paymentSystem);
  },
  displayCharts(paymentSystem) {
    var docFrag = table.createTable(paymentSystem);
    this.addTable(docFrag);
    this.addCircle(paymentSystem);
  },
  hideInput: function(e) {
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
};