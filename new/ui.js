var ui = {
  inputList: {
  	'balance': 0,
  	'rate': 0,
  	'months': 0,
  	'payment': 0
  },
  inputFormatter(type, value) {
  	switch(type) {
  	  case 'balannce':
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
  translateSubmitData() {
  	function getValue(elementId) {
  	  return document.getElementById(elementId).value; 
  	}

  	each(this.inputList, function( _, id, obj) {
  	  var value = getValue(id);
  	  obj[id] = this.inputFormatter(id, value);
    }, this);
  },
  submitData(e) {
  	var that = ui;

  	that.translateSubmitData(e);
  	pObj.inputData.apply(pObj, that.inputValues);
  	console.log(that.inputList);
  }
};