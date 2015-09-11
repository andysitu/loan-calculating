var tableSelect = {
  selected: [],
  select: function(month) {
    this.selected.push(month);
  },
  deselect: function(month) {
    var index = this.selected.indexOf(month);
    this.selected.splice(index, 1);
  },
  toggleSelected: function(e) {
    var ele = e.target;

    try {
      // if user clicks on the td containing checkbox
      if (ele.children[0].type == "checkbox") {
        var ele = ele.children[0];
        if (ele.checked) {
          ele.checked = false;
        } else {
          ele.checked = true;
        }
      }
    } catch (e) { /*blank*/}

    
    if (ele.type == "checkbox") {
      var parentTr = ele.parentNode.parentNode;
      if (ele.checked) {
        this.select(ele.value);
        parentTr.classList.add("selected");
      } else {
        this.deselect(ele.value);
        parentTr.classList.remove("selected");
      }
    }
  }
}