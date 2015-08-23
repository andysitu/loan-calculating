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

function calculatePayment(balance, rate, months) {
  /** 
   * uses bisect method to figure out min payment to pay off credit 
   * in that amount of time.
   *
   * Returns the min payment amount
  */
  	balance = parseFloat(balance);
  	rate = parseFloat(rate) / 12;
  	months = parseFloat(months);

	var counter = 0,
		newBal = balance,
		upLimit = Math.pow(1 + rate, months) * balance / months,
		lowLimit = balance / months,
		guess,
		limit = -0.1; // accepting limit of the bisect method (in $ amount)

	while ((newBal > 0 || newBal < limit)  ) {
		if (counter++ > 100) {
			console.log("Something was wrong");
			break;
		}
		newBal = balance;
		guess = (upLimit + lowLimit) / 2;
		for (var i = 0; i < months; i++) {
			newBal = newBal * (1 + rate) - guess;
		}

		if (newBal > 0) { // newBal is amount left over after X months
			lowLimit = guess;
		} else {
			upLimit = guess;
		}

		// console.log("guess " + guess + " newBal: " + newBal + " lowLimit: " + lowLimit + " upLimit: "+ upLimit)

	}

	return Math.ceil(guess * 100) / 100;
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
