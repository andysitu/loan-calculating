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
  hideInput: function(e) {
  /* For now there are only two input forms, so if status if true
   then the inputForm will be hidden and optionsForm will show.
   If false, then the opposite.
  */
    console.log(e.target);

  /*
   var input = document.getElementById("inputForm"),
     options = document.getElementById("optionsForm");

   if (bool) {
     input.hidden = true;
     options.hidden = false;
   } else {
     input.hidden = false;
     options.hidden = true;
   } */
  }
};