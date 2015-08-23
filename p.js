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
		 * returns array of objects for each month detailing interest,
		 * remaining balance, etc.
		 */

		var that = p;

		var arr = [],
			rate = that.rate/ 12,
			balance = that.balance,
			months = that.months,
			payment = that.payment,
		 	month = 0,
		 	interest = 0,
		 	totalInterest = 0;

		function pushIt() {
			// pushes obj of values to arr that will be returned
			arr.push({
			 	"Remaining Balance": moneyFormatter(balance),
			 	"Month": moneyFormatter(month),
			 	"Payment": moneyFormatter(payment),
			 	"Interest Paid": moneyFormatter(interest),
			 	"Total Interest": moneyFormatter(totalInterest),
			});
		}

		pushIt();

		for (month = 1; month <= months; month++) {
			
			interest = balance * rate;
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
		var that = p;
		p.balance = this.getObj("balance");
		p.rate = this.getObj("rate");
		p.months = this.getObj("months");
		p.payment = this.getObj("payment");
		p.paymentObj = this.getObj("paymentObj");
	}
}