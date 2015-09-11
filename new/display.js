display = {
  addTable(docFrag) {
    var test = document.getElementById("paymentTable");
    var tableHere = document.getElementById("table_container");
    if (test === null) {
      tableHere.appendChild(docFrag);
    } else {
      tableHere.replaceChild(docFrag, test);
    }
  }
};