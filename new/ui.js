var ui = {
  inputList: {
  	'balanceInput': 0,
  	'rateInput': 0,
  	'monthsInput': 0,
  	'paymentInput': 0
  },
  inputFormatter(type, value) {
  	switch(type) {
  	  case 'balanceInput':
  	  case 'paymentInput': 
  	    return decimalConverter(value);
  	  case 'rateInput':
  	  	if (value >= 1) {
  	  	  return value / 100; }
  	  	else {
  	  	  return value; }
  	  default:
  	  	  return value;
  	}
  },
  translateSubmitData() {
  	function getValue(elementId) {
  	  return document.getElementById(elementId).value; 
  	}

  	each(this.inputList, function( _, id, obj) {
  	  obj[id] = getValue(id);
    });
  },
  submitData(e) {
  	var that = ui;

  	that.translateSubmitData(e);
  	pObj.inputData.apply(pObj, that.inputValues);
  }
};