var ui = {
  paymentObject: null,
  inputList: ['balance', 'rate', 'months', 'payment'],
  inputData: null,
  inputFormatter(type, value) {
  	// formats value, eg 100.424 to 100.42,
  	// depending on the input 
    if (testForNumber(value)) {
    	switch(type) {
    	  case 'balance':
    	  case 'payment': 
    	    return decimalConverter(value);
    	  case 'rate':
    	  	if (value >= 1) {
    	  	  value = parseFloat(value) / 100;
            if (value < 1)
              return value; 
          } else
            return parseFloat(value);
    	  default:
    	  	  return parseInt(value);
      } 
    } else { return ""; }
  },
  inputChecker(data) {
    if (testForNumber(data.balance) && testForNumber(data.rate)) {
      if (testForNumber(data.months))
        return true;
      if (testForNumber(data.payment))
        if (data.payment > data.balance * data.rate/12)
          return true;
    }
    return false;
  },
  translateInputData() {
  	function getValueFromEle(elementId) {
  	  return document.getElementById(elementId).value; 
  	}

    var data = {};

  	each(this.inputList, function( input ) {
  	  var value = getValueFromEle(input);
  	  data[input] = this.inputFormatter(input, value);
  	}, this);

    return data;
  },
  submitData(e) {
  	var that = ui;

  	var inputData = that.translateInputData(e);
  	if (that.inputChecker(inputData)) {
      that.inputData = inputData;
      storage.store("inputData", inputData);

      that.paymentObject = new PaymentObject(inputData);
      that.addTable(that.paymentObject)
      console.log(that.getDataArrayForCircle(that.paymentObject));
  	} else {
  	  console.log("ERROR");
    }
  },
  storageChecker() {
    var inputData = storage.retrieve("inputData"),
        that = ui;

    if (inputData) {
      that.setInputs(inputData);
    }
  },
  setInputs(inputData) {
    each(inputData, function(value, elementId) {
      setInput(elementId, value);
    });
  },
  getDataArrayForCircle(paymentObject) {
    var totalInterest = paymentObject.getTotalInterest(),
      balance = paymentObject.getBalance(1);

    return [{name:"Balance", amount: balance, color: "green"},
            {name:"Total Interest", amount: totalInterest, color: "red"}]
  },

  addTable(paymentObject){
    var docFrag = table.createTable(paymentObject);
      display.addTable(docFrag);
  }
};