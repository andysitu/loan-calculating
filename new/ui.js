var ui = {
  paymentObject: null,
  inputList: ['balance', 'rate', 'months', 'payment'],
  inputData: null,
  inputFormatter(type, value) {
  	// formats value, eg 100.424 to 100.42,
  	// depending on the input 
    if (testForNumber(value)) {
    	switch(type) {
    	  case 'balance': case 'payment': 
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

  setInputs(inputData) {
    this.inputData = inputData;
    display.setInputs(inputData);
  },
  submitData(e) {
    var inputData = this.translateInputData(e);
    if (this.inputChecker(inputData)) {
      this.inputData = inputData;
      storage.store("inputData", inputData);

      this.paymentObject = new PaymentObject(inputData);
      display.displayCharts(this.paymentObject);
    } else {
      console.log("ERROR");
    }
  },
  paymentHandler(e) {
    var addInput = document.getElementById("addAmount"),
      value = addInput.value;

    if (parseFloat(value) > 0) {
      var selected = tableSelect.getSelected();
      if (selected.length >= 1) {
        this.paymentObject.addPayments(value, selected);
        this.paymentObject.remakePaymentArray();
        display.displayCharts(this.paymentObject);
      } else {

      }
    } else {
      //display("You didn't enter an value into Add");
    }
    addInput.value = "";
  }
};