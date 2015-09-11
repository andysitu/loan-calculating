var table = {
  createTable: function(pObj) {
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

    var table = this.makeTable("table");
    docFrag.appendChild(table);

    var headerList = this.makeHeaderList(pObj);

    var tr = this.makeTrWithHeaders(headerList);

    table.appendChild(tr);

    // should throw error if the first element is accessed
    //selectedArr[0] = null;

    var paymentArray = pObj.getPaymentArray();

    each(paymentArray, function(paymentObj, i, pArray) {
      var tr = this.makeRow(paymentObj, headerList);
      table.appendChild(tr);
    }, this)

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

  makeTable: function(id) {
    var table = this.makeElement("table", id);
    return table;
  },
  makeRow: function(dataObj, headerList) {
    var tr = this.makeTr();
    each(headerList, function(header, i, headerList) {
      var td = this.makeTd();
      if (header == "Select") {
        var td = this.makeTdWithCheckbox();
      } else {
        var content = makeCommas(dataObj[header]);
        var td = this.makeTd(content);
      }
      tr.appendChild(td);
    }, this);
    return tr;
  },
  makeTr: function(id) {
    var tr = this.makeElement("tr", id);
    return tr;
  },
  makeTrWithHeaders: function(headerList) {
    var tr = this.makeTr();
    each(headerList, function(head, i, list) {
      var th = this.makeTh(head);
      tr.appendChild(th);
    }, this);
    return tr;
  },
  makeTd: function(content, id) {
    var td = this.makeElement("td", id);
    td.textContent = content;
    return td;
  },
  makeTdWithCheckbox: function(value, id) {
    var td = this.makeTd();
    var check = this.makeElement("input", id);
    check.type = "checkbox";
    check.value = value;
    td.appendChild(check);
    return td;
  },
  makeTh: function(content, id) {
    var th = this.makeElement("th", id);
    th.textContent = content;
    return th;
  },
  makeElement: function(type, id) {
    if (id === undefined)
      id = "";
    var element = document.createElement(type);
    element.id = id;
    return element;
  }
}