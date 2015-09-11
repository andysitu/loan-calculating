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
    var ele = e.target
    console.log(e, ele, this);

    // try {
    //   // accesses the live HTMLCollection of child elements
    //   // inefficient, but only solution I can think of for now
    //   // and should be okay for now since no other things are running
    //   if (ele.children[0].type == "checkbox") {
    //     var ele = ele.children[0];
    //     if (ele.checked) {
    //       ele.checked = false;
    //     } else {
    //       ele.checked = true;
    //     }
    //   }
    // } catch (e) { /*blank*/}

  //   if (ele.type == "checkbox") {
  //     if (ele.checked) {
  //       t.changeSelectedList(ele.value, ele.checked);
  //       var row = document.getElementById("row" + ele.value);
        
  //       var children = row.children;
  //       for (var i = 0, len = row.children.length; i < len; i++) {
  //         children[i].classList.add("selected");
  //       }
  //     } else {
  //       t.changeSelectedList(ele.value, ele.checked);
  //       var row = document.getElementById("row" + ele.value);
        
  //       var children = row.children;
  //       for (var i = 0, len = row.children.length; i < len; i++) {
  //         children[i].classList.remove("selected");
  //       }
  //     }
  //   }
  }
}