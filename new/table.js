var table = {
  minWidths: null,
  createTable: function(paymentSystem) {
  /* Obtains a copy of the payment array. Then, reads it
   *  and will create a table by forming the header list
   *  and using lots of helper functions to create the parts.
   */
    var docFrag = document.createDocumentFragment(),
      tableId = "paymentTable";

    // payment array has stringified values.
    var pArrayWithString = this.makePArrayWithString(paymentSystem);

    this.minWidths = this.getMinWidths(pArrayWithString); 

    var table = this.makeTable(tableId);
    docFrag.appendChild(table);

    var headerList = this.makeHeaderList(paymentSystem);

    table.appendChild(this.makeTrWithHeaders(headerList));

    // Goes through payment array to reach the payment objects
    //  and creates the rows (tr) for the table.
    each(pArrayWithString, function(paymentObj, i, pArray) {
      var tr = this.makeRow(paymentObj, headerList, i);
      table.appendChild(tr);
    }, this)
      
    addHandler(table, "click", tableSelect.toggleSelected.bind(tableSelect));

    return docFrag;
  },

  makeHeaderList: function(paymentSystem) {
    var headerList = paymentSystem.getHeaderList();
    headerList.unshift("Select");
    return headerList;
  },

  makeTable: function(id) {
  // Makes the table element and returns it.
    var table = this.makeElement("table", id);
    return table;
  },
  makeRow: function(dataObj, headerList, month_0) {
  // Returns tr element and makes it in the order of 
  //  the headerlist. Also, creates the td elements 
  //  and appends it. Tr with headers is made in makeTable.
    var tr = this.makeTr("row " + (month_0 + 1));
    each(headerList, function(header, i, headerList) {
      var td = this.makeTd();
      if (header == "Select") {
        var td = this.makeTdWithCheckbox();
      } else {
        var content = this.cellFormatter(dataObj[header], header);
        var td = this.makeTd(content);
      }
      tr.appendChild(td);
    }, this);
    return tr;
  },
  makeTr: function(id) {
  // Returns tr element.
    var tr = this.makeElement("tr", id);
    return tr;
  },
  makeTrWithHeaders: function(headerList) {
  // Used in makeTable function.
    var tr = this.makeTr("Header");
    each(headerList, function(head, i, list) {
      var th = this.makeTh(head);
      tr.appendChild(th);
    }, this);
    return tr;
  },
  makeTd: function(content, id) {
  // Returns td element.
    var td = this.makeElement("td", id);
    td.textContent = content;
    return td;
  },
  makeTdWithCheckbox: function(value, id) {
  // Returns td element with a checkbox as child node
    var td = this.makeTd();
    var check = this.makeElement("input", id);
    check.type = "checkbox";
    check.value = value;
    td.appendChild(check);
    return td;
  },
  makeTh: function(content, id) {
  // Returns an th element.
    var th = this.makeElement("th", id);
    th.textContent = content;
    return th;
  },
  makeElement: function(type, id) {
  // Returns an element and appends an id.
    if (id === undefined)
      id = "";
    var element = document.createElement(type);
    element.id = id;
    return element;
  },
  cellFormatter: function(value, header) {
  // Correctly forms the string (value) by getting
  // the minimum width throughout entire payment array
  // and adds the correct number of spaces and appends '$'.
    if (header == "Month")
      return value;
    else {
      var minWidth = this.minWidths[header];
      return '$' + repeatString(" ", 1 + minWidth - value.length) + value;
    }
  },
  getMinWidths: function(pArrayWithString) {
  // Gets the minimum width of each column by searching
  //  the entire payment array.
    var obj = {};

    each(pArrayWithString[0], function(_, header) {
      obj[header] = 0;
      each(pArrayWithString, function(pObj, i) {
        var string = pObj[header];
        obj[header] = Math.max(obj[header], string.length);
      });
    });

    return obj;
  },
  makePArrayWithString(paymentSystem){
  // Stringifies the values of the payment array
  //  and returns it.
    var paymentArray = paymentSystem.getPaymentArray();
    paymentArray = map(paymentArray, function(paymentObject, i) {
      return map(paymentObject, function(value, header) {
        if (header == "Month")
          return String(value);
        else
          return makeCommas(value);
      });
    });
    return paymentArray;
  }

};