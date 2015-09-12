display = {
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
  makeTable(paymentObject){
    return table.createTable(paymentObject);
  },
  addCircle(paymentObject) {
    var dataArray = ui.getDataArrayForCircle(paymentObject);
    circle.makeCircle(dataArray);
  },
  displayCharts(paymentObject) {
    var docFrag = this.makeTable(paymentObject);
    this.addTable(docFrag);
    this.addCircle(paymentObject);
  },
  }
};