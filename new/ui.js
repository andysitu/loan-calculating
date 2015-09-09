var ui = {
  inputData: {
  	'balance': 0,
  	'rate': 0,
  	'months': 0,
  	'payment': 0
  },
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

  	each(this.inputData, function( _, id, obj) {
  	  var value = getValueFromEle(id);
  	  obj[id] = this.inputFormatter(id, value);
  	}, this);
  },
  submitData(e) {
  	var that = ui;

  	that.translateInputData(e);
  	if (that.inputChecker())
  	  pObj.inputData(that.inputData);
  	else
  	  console.log("ERROR");
  }
};