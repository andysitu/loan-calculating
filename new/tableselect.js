var tableSelect = {
// Handles when the user clicks on the table, which
//  select that payment object. Returns a list of selected.
  selected: [],
  select: function(month) {
  // Adds selected values to selected.
    this.selected.push(month);
  },
  deselect: function(month) {
  // Removes values from selected.
    var index = this.selected.indexOf(month);
    this.selected.splice(index, 1);
  },
  getSelected: function() {
  // Returns the list of selected.
    var selected = copy(this.selected);
    this.selected = [];
    return selected;
  },
  toggleSelected: function(e) {
    var ele = e.target;

    // If user clicks on header, then end function.
    if (ele.parentNode.id == "Header") {
      return 0;
    // If user clicks on the the row (th). Changes
    //  checkbox as a result of the selection.
    } else if (ele.parentNode.tagName == 'TR') {
      var tr = ele.parentNode;
      var checkbox = tr.children[0].children[0];
      if (checkbox.checked) {
        checkbox.checked = false;
      } else {
        checkbox.checked = true;
      }
    // If the user clicks on the checkboxo.
    } else if (ele.parentNode.parentNode.tagName == 'TR') {
      var tr = ele.parentNode.parentNode;
    }

    // Adds the selected to this.selected.
    var idNumber = parseInt(tr.id.match(/row (\d*)/)[1]);
    if (this.selected.indexOf(idNumber) == -1) {
      this.select(idNumber);
      tr.classList.add("selected");
    } else {
      this.deselect(idNumber);
      tr.classList.remove("selected");
    }
  }
}