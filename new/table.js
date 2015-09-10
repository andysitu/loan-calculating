var table = {
  makeTable: function(pObj) {
  /* Makes a table to doc by the headerObj (array) containing table heading
   * to specify order of the headings (optional) and dataObj which is objs 
   * in array that will contain the actual data.
   *
   * If headObj is not provided, then the headings might not be in order
   * 
   * Has an event handler for the entire table. Currently, only registers
   * if user has clicked on the checked input
   */
    var docFrag = document.createDocumentFragment(),
      selectedArr = [];

    var table = document.createElement("table");
    table.id = "table";
    docFrag.appendChild(table);

    var headerList = this.makeHeaderList(pObj);

    this.makeHeadersToTr(headerList, tr);

    table.appendChild(tr);

    // should throw error if the first element is accessed
    selectedArr[0] = null;

    // rows of the table, Note: i starts at 1
    for (i = 1; i <= dataArr.length; i++) {
      selectedArr[i] = false;

      var tr = this.makeTr("id");
      var td = document.createElement("td");
      td.appendChild(check);
      tr.appendChild(td);
      for (var j = 0; j < headerList.length; j++) {
        var td = document.createElement("td");
        td.textContent = decimalConverter(dataArr[i - 1][headerList[j]], headerList[j]);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    // function toggleSelected(e) {
    //   var ele = e.target

    //   try {
    //     // accesses the live HTMLCollection of child elements
    //     // inefficient, but only solution I can think of for now
    //     // and should be okay for now since no other things are running
    //       if (ele.children[0].type == "checkbox") {
    //         var ele = ele.children[0];
    //         if (ele.checked) {
    //           ele.checked = false;
    //         } else {
    //           ele.checked = true;
    //         }
    //       }
    //   } catch (e) { /*blank*/}

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

      
    // }

    // table.addEventListener("click", toggleSelected );

    // toggleSelected = null;

    // this.selectedList = selectedArr;

    var test = document.getElementById("table");
    var tableHere = document.getElementById("tableHere");
    if (test === null) {
      tableHere.appendChild(docFrag);
    } else {
      tableHere.replaceChild(docFrag, test);
    }
  },

  makeHeaderList: function(pObj) {
    var headerList = pObj.getHeaderList();
    headerList.unshift("Select");
    return headerList;
  },

  makeTr: function(id) {
    var tr = document.createElement("tr");
    tr.id = id;
    return tr;
  },
  makeHeadersToTr: function(headerList, tr) {
    each(headerList, function(head, i, list) {
      var th = this.makeTh(head, "");
      tr.appendChild(th);
    }, this);
  },
  makeTd: function(content, id) {
    var td = document.createElement("td");
    td.textContent = value;
    return td;
  },
  makeCheckbox: function(value, id) {
    var check = document.createElement("input");
    check.type = "checkbox";
    check.value = value;
    check.id = id;
    return check;
  },
  makeTh: function(content, id) {
    var th = document.createElement("th");
    th.textContent = content;
    return th;
  }
}