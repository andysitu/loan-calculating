var p = {
	balance: 0,
	rate: 0,
	months: 0,
	dataIn(bal, rate, months) {
		this.balance = Number(bal);
		this.rate = Number(rate);
		this.months = Number(months);

		var payment = this.calculatePayment(bal, rate, months);
		display()
		this.displayInfo(bal, rate, months, payment);
	},
	calculatePayment(bal, apr, months) {
	  /* uses bisect method to figure out min payment to pay off credit 
	   * in that amount of time.
	   *
	   * Returns the min payment amount
	  */
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

			// console.log(newBal, guess, typeof guess);
		}

		return guess;
	},

	displayInfo(bal, apr, months, payment) {
		// displays all the appropriate info by using the display function
		var interest = 0,
			newBal = bal,
			rate = 1 + apr / 12,
			str = "";

		for (var i = 0; i < months; i++) {
			interest += newBal * rate - newBal;
			newBal -= interest - payment;
		}

		str += "With a balance of $" + bal + ", you will pay off everything in " + months + " months";
		str += "\n if you make a payment of $" + payment + " each month, but you will also pay $" + interest;
		str += "\n in total.";

		display(str);
	}
};