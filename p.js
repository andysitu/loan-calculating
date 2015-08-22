var p = {
	status: "pay",
	changeStatus(value) {
		p.status = value;
	},
	balance: 0,
	rate: 0,
	months: 0,
	payment: 0,
	headerObj: null,
	paymentObj: null,
	dataIn(bal, rate, months) {
		bal = this.balance = Number(bal);
		rate = this.rate = Number(rate);
		months = this.months = Number(months);
	},

	calculatePayment() {
	  /** 
	   * uses bisect method to figure out min payment to pay off credit 
	   * in that amount of time.
	   *
	   * Returns the min payment amount
	  */
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
			}

			// console.log(newBal, guess, typeof guess);
		}

		return guess;
	},

	makePaymentObj() {
		/**
		 * returns array of objects for each month detailing interest,
		 * remaining balance, etc.
		 */

		var that = p;

		var arr = [],
			rate = that.rate/ 12,
			bal = that.balance,
			months = that.months,
			payment = that.payment,
		 	month = 0,
		 	interest = 0,
		 	totalInterest = 0;
		
		function pushIt() {
			// pushes obj of values to arr that will be returned
			arr.push({
			 	"Remaining Balance": moneyFormatter(bal),
			 	"Interest Paid": moneyFormatter(interest),
			 	"Total Interest": moneyFormatter(totalInterest),
			 	"Month": moneyFormatter(month)
			});
		}

		pushIt();

		for (month = 1; month <= months; month++) {
			
			interest = bal * rate;
			totalInterest += interest;
			bal += interest - payment;

			pushIt();
		}

		return arr;
	},

	displayInfo() {
		// displays all the appropriate info by using the display function
		var that = p;

		var bal = that.balance,
			rate = that.rate / 12,
			months = that.months,
			payment = that.payment,
			interest = 0,
			newBal = bal,
			str = "";

		for (var i = 0; i < months; i++) {
			interest += newBal * (1 + rate) - newBal;
			newBal = newBal * (1+ rate) - payment;
		}

		interest = moneyFormatter(interest);

		str += "With a balance of $" + bal + ", you will pay off everything in " + months + " months";
		str += "\n if you make a payment of $" + payment + " each month, but you will also pay $" + interest;
		str += "\n in total to interest for a grand total of $" + (bal + interest) + ".";

		display(str);
	}
};