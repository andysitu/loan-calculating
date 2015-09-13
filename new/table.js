var table = {
  minWidths: null,
  createTable: function(paymentSystem) {
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
      tableId = "paymentTable";

    var pArrayWithString = this.makePArrayWithString(paymentSystem);

    this.minWidths = this.getMinWidths(pArrayWithString); 
      // obj with headers as keys

    var table = this.makeTable(tableId);
    docFrag.appendChild(table);

    var headerList = this.makeHeaderList(paymentSystem);

    table.appendChild(this.makeTrWithHeaders(headerList));

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
    var table = this.makeElement("table", id);
    return table;
  },
  makeRow: function(dataObj, headerList, month_0) {
    var tr = this.makeTr();
    each(headerList, function(header, i, headerList) {
      var td = this.makeTd();
      if (header == "Select") {
        var td = this.makeTdWithCheckbox(month_0 + 1);
      } else {
        var content = this.cellFormatter(dataObj[header], header);
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
  },
  cellFormatter: function(value, type) {
    if (type == "Month")
      return value;
    else
      return ' $ ' + makeCommas(value) + ' ';
  },
  getMinWidths: function(pArrayWithString) {
    var obj = {};

    each(pArrayWithString[0], function(_, header) {
      obj[header] = 0;
      each(pArrayWithString, function(pObj, i) {
        var string = obj[header];
        obj[header] = Math.max(obj[header], string.length);
      });
    });

    return obj;
  },
  makePArrayWithString(paymentSystem){
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