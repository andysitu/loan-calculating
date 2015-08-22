onmessage = function(e) {
	if (e.data) {
		var data = e.data;
		console.log(data);

		var arg1 = data.input1,
			arg2 = data.input2,
			arg3 = data.input3;
		var guess = calculatePayment(arg1, arg2, arg3);

		postMessage(guess);
	} else {
		postMessage("I didn't get an object.");
	}

};

function calculatePayment(bal, rate, months) {
  /** 
   * uses bisect method to figure out min payment to pay off credit 
   * in that amount of time.
   *
   * Returns the min payment amount
  */
  	bal = parseFloat(bal);
  	rate = parseFloat(rate) / 12;
  	months = parseFloat(months);

	var counter = 0,
		newBal = bal,
		upLimit = Math.pow(1 + rate, months) * bal / months,
		lowLimit = bal / months,
		guess,
		limit = .20; // accepting limit of the bisect method (in $ amount)

	while (newBal > 0 || newBal > -limit ) {
		newBal = bal;
		guess = Math.floor( (upLimit + lowLimit) / 2 * 100 ) / 100;
		for (var i = 0; i < months; i++) {
			newBal = newBal * (1 + rate) - guess;
		}

		if (newBal > 0) { // newBal is amount left over after X months
			lowLimit = guess;
		} else {
			upLimit = guess;
		}

		// console.log(newBal, guess, typeof guess);
	}

	return guess;
}

/** 
	   OLD VERSION CALCULATEPAYMENT THAT USED TO BE IN P
	  
calculatePayment() {
  	var that = p;

	var months = that.months,
		bal = that.balance,
		rate = that.rate / 12,
		newBal = bal,
		upLimit = Math.pow(1 + rate, months) * bal / months,
		lowLimit = bal / months,
		guess,
		limit = .20; // accepting limit of the bisect method (in $ amount)

	while (newBal > 0 || newBal < -limit ) {
		newBal = bal;
		guess = Math.floor( (upLimit + lowLimit) / 2 * 100 ) / 100;
		for (var i = 0; i < months; i++) {
			newBal = newBal * (1 + rate) - guess;
		}

		if (newBal > 0) { // newBal is amount left over after X months
			lowLimit = guess;
		} else {
			upLimit = guess;

		// console.log(newBal, guess, typeof guess);

	return guess;
}

 */
