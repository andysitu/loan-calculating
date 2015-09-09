var ui = {
  inputData: {
  	'balance': 0,
  	'rate': 0,
  	'months': 0,
  	'payment': 0
  },
  inputFormatter(type, value) {
  	switch(type) {
  	  case 'balance':
  	  case 'payment': 
  	    return decimalConverter(value);
  	  case 'rate':
  	  	if (value >= 1) {
  	  	  return value / 100; }
  	  	else {
  	  	  return value; }
  	  default:
  	  	  return value;
  	}
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
  	pObj.inputData(that.inputData);
  }
};