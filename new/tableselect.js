var tableSelect = {
  selected: [],
  select: function(month) {
    this.selected.push(month);
  },
  deselect: function(month) {
    var index = this.selected.indexOf(month);
    this.selected.splice(index, 1);
  },
  getSelected: function() {
    var selected = copy(this.selected);
    this.selected = [];
    return selected;
  },
  toggleSelected: function(e) {
    var ele = e.target;

    if (ele.parentNode.tagName == 'TR') {
      var tr = ele.parentNode;
      var checkbox = tr.children[0].children[0];
      if (checkbox.checked) {
        checkbox.checked = false;
      } else {
        checkbox.checked = true;
      }
    } else if (ele.parentNode.parentNode.tagName == 'TR') {
      var tr = ele.parentNode.parentNode;
    }
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