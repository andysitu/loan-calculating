var p = {
	balance: 0,
	rate: 0,
	months: 0,
	dataIn(bal, rate, months) {
		this.balance = Number(bal);
		this.rate = Number(rate);
		this.months = Number(months);

		this.calculatePayment(bal, rate, months);
	},
	calculatePayment(bal, apr, months) {
	  // uses bisect method to figure out min payment to pay off credit 
	  // in that amount of time
		var rate = 1 + apr / 12,
			newBal = bal,
			upLimit = Math.pow(rate, months) * bal / months,
			lowLimit = bal / months,
			guess,
			limit = .20; // accepting limit of the bisect method (in $ amount)

		while (newBal > 0 || newBal < -limit ) {
			newBal = bal;
			guess = Math.floor( (upLimit + lowLimit) / 2 * 100 ) / 100;
			for (var i = 0; i < months; i++) {
				newBal = newBal * rate - guess;
			}

			if (newBal > 0) { // newBal is amount left over after X months
				lowLimit = guess;
			} else {
				upLimit = guess;
			}

			console.log(newBal, guess, typeof guess);
		}

		console.log(guess);
	}
};