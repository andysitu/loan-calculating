var ui = {
  inputList: ['balanceInput', 'rateInput', 'monthsInput', 'paymentInput'],
  inputValues: [],
  translateSubmitData(e) {
  	function getValue(elementId) {
  	  return document.getElementById(elementId).value; 
  	}

  	this.inputValues = this.inputList.map(function(id, i, arr) {
  	  return getValue(id);
    });
  },
  submitData(e) {
  	var that = ui;

  	that.translateSubmitData(e);
  	pObj.inputData.apply(pObj, that.inputValues);
  }
};