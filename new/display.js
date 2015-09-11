display = {
  addTable(docFrag) {
    var test = document.getElementById("table");
    var tableHere = document.getElementById("tableHere");
    if (test === null) {
      tableHere.appendChild(docFrag);
    } else {
      tableHere.replaceChild(docFrag, test);
    }
  }
}