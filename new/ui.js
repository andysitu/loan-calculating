var ui = {
// Handles input of user interactions and calling of 
// subsequent methods in other objects.
  paymentSystem: null,
  // Reference to the payment system created.
  inputList: ['balance', 'rate', 'months', 'payment'],
  inputData: null,
  // The inputs that the user has inputted. Complete
  //  version in payment system.
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
  // Checks if the inputted data is valid.
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
  // Forms the input data & adds to data object.
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
  // Calls from data input & sets it using display obj.
    this.inputData = inputData;
    display.setInputs(inputData);
  },
  submitData(e) {
  // Event handler for when user clicks on submit button.
    var inputData = this.translateInputData(e);
    if (this.inputChecker(inputData)) {
      this.inputData = inputData;
      storage.store("inputData", inputData);

      this.paymentSystem = new PaymentSystem(inputData);
      display.displayCharts(this.paymentSystem);
    } else {
      console.log("ERROR");
    }
  },
  paymentHandler(e) {
  // Event handler for when user clicks on submit button
  //  to change payments in the payment array.
    var addInput = document.getElementById("addAmount"),
      value = addInput.value;

    if (parseFloat(value)) {
      var selected = tableSelect.getSelected();
      if (selected.length >= 1) {
        this.paymentSystem.addPayments(value, selected);
        this.paymentSystem.remakePaymentArray();
        display.displayCharts(this.paymentSystem);
      } else {
        //display("Something");
      }
    } else {
      //display("You didn't enter an value into Add");
    }
    addInput.value = "";
  }
};