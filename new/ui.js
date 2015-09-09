var ui = {
  pObject: null,
  inputList: ['balance', 'rate', 'months', 'payment'],
  inputData: null,
  inputFormatter(type, value) {
  	// formats value, eg 100.424 to 100.42,
  	// depending on the input 
  	switch(type) {
  	  case 'balance':
  	  case 'payment': 
  	    return decimalConverter(value);
  	  case 'rate':
  	  	if (value >= 1) {
  	  	  return parseFloat(value) / 100; }
  	  default:
  	  	  return parseFloat(value);
  	}
  },
  inputChecker() {
  	var data = this.inputData;

  	if (data.months <= 0 && data.payment <= 0) {
      return false; 
    } else if (data.rate >= 1 || data.rate <= 0) {
      return false;
    } else if (data.balance <= 0) {
      return false;
    }
    return true;
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

  	that.translateInputData(e);

  	if (that.inputChecker()) {
  	  pObj.inputData(that.inputData);
      that.pObject = new PaymentObject(that.inputData) ;
  	} else {
  	  console.log("ERROR");
    }
  }
};