var p = {
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
	 * Calculates the payment necessary to pay off a loan in a certain
	 * amount of time by sending it to the worker.
	 * 
	 * Input: values are given to work based on p.balance, p.rate
	 * and p.months.
	 *
	 * Output: the payment value is set to p.payment
	 */
		var worker = new Worker("worker.js");
			worker.postMessage({input1:p.balance, input2: p.rate, input3: p.months});

			worker.onmessage = function(event) {
				p.payment = event.data;
				console.log("from worker:" + typeof event.data);
			}

			worker.onerror = function(event) {
				console.log("ERROR: " + event.filename + " ")
		}
	},

	makePaymentObj() {
		/**
		 * Makes the paymentObject that makeTable will use.
		 *
		 * Input: reads from p.balance, p.rate, p.months, p.payment
		 *
		 * Output: returns array of objects for each month detailing interest,
		 * remaining balance, tallying interest from previous months
		 */

		var that = p;

		var arr = [],
			rate = that.rate/ 12,
			balance = that.balance,
			oldBalance = 0,
			months = that.months,
			payment = that.payment,
			realPayment = 0,
		 	month = 0,
		 	interest = 0,
		 	totalInterest = 0;

		function pushIt() {
			// pushes obj of values to arr that will be returned
			arr.push({
			 	"Starting Balance": moneyFormatter(oldBalance),
			 	"Month": moneyFormatter(month),
			 	"Payment": moneyFormatter(payment),
			 	"Interest": moneyFormatter(interest),
			 	"Actual Payment to Balance": moneyFormatter(realPayment),
			 	"Total Interest": moneyFormatter(totalInterest),
			 	"End Balance": moneyFormatter(balance)
			});
		}

		for (month = 1; month <= months; month++) {
			oldBalance = balance;			
			interest = balance * rate;
			realPayment = payment - interest;
			totalInterest += interest;
			balance += interest - payment;

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

p.stor = {
	checkObjInStor(name) {
		if (sessionStorage.getObject(name) === null) {
			return false;
		} else {
			return true;
		}
	},

	storeObj(key, obj) {
		localStorage.setObject(key, obj);
	},

	getObj(key) {
		return localStorage.getObject(key);
	},

	delObj(key) {
		localStraoge.deleteObject(key);
	},

	storeP() {
		// stores balance, payment, apr, month & paymentObj into storage
		this.storeObj("balance", p.balance);
		this.storeObj("rate", p.rate);
		this.storeObj("months", p.months);
		this.storeObj("payment", p.payment);
		this.storeObj("paymentObj", p.paymentObj);
	},
	setP(){
	/**
	 * Reads from localStorage and stores the values into p
	 * Values can be seen below
	 */
		var that = p;
		p.balance = this.getObj("balance");
		p.rate = this.getObj("rate");
		p.months = this.getObj("months");
		p.payment = this.getObj("payment");
		p.paymentObj = this.getObj("paymentObj");
	}
}

p.date = {
	getMonthYear() {
		var date = new Date();
		console.log(date.getUTCMonth());
		console.log(date.getUTCFullYear());
	}
}