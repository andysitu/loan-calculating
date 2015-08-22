postMessage("Got it");

onmessage = function(e) {
	if (e.data) {
		postMessage("I got an object");
		postMessage(e.data);
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

	var newBal = bal,
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
		}

		// console.log(newBal, guess, typeof guess);
	}

	return guess;
}