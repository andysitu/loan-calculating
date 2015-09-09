var ui = {
  inputList: ['balanceInput', 'rateInput', 'monthsInput', 'paymentInput'],
  inputValues: [],
  translateSubmitData(e) {
  	var that = ui;	

  	function getValue(elementId) {
  	  return document.getElementById(elementId).value; 
  	}

  	that.inputValues = that.inputList.map(function(id, i, arr) {
  	  return getValue(id);
    });
  },
  submitData(e) {
  	var that = ui;

  	translateSubmitData(e);
  	pObj.inputData.apply(pObj, that.inputValues);
  }
};