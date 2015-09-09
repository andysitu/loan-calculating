var ui = {
  translateSubmitData(e) {
  	console.log("works");
    var inputList = ['balanceInput', 'rateInput', 'monthsInput', 'paymentInput'];

  	function getValue(elementId) {
  	  return document.getElementById(elementId).value;
  	}

  	var inputValues = inputList.map(function(id, i, arr) {
  	  return getValue(id);
    });

    pObj.inputData.apply(pObj, inputValues);
  }
};