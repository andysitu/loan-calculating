var p = {
	workerStatus: false,
	balance: 0,
	rate: 0,
	months: 0,
	monthsI: 0,
	payment: 0,
	paymentI: 0,
	headerObj: null,
	paymentObj: null,

	runIt() {
		if (this.paymentI == 0) {
			p.calculatePayment();
		} else if (this.monthsI == 0) {
			var min = this.balance * (1 + this.rate/12) - this.balance;
			if (min >= this.payment) {
				display("Your payment is too low. Need to be at least larger than $	" + min);
			} else {
				p.calculateMonths();
			}
		}
		
		waitForWorker();
		function waitForWorker() {
			if (p.workerStatus == true) {
				p.paymentObj = p.makePaymentObj();
				p.displayInfo();
				p.stor.storeP();

				makeTable(p.paymentObj);
			} else {
				window.setTimeout(waitForWorker, 50);
			}
		}
	},

	dataIn(bal, rate, months, payment) {
		this.balance = Number(bal);
		rate = this.rate = Number(rate);
		if (months == undefined) {
			months = 0;
		}
		this.months = this.monthsI = Number(months);
		if (payment == undefined) {
			payment = 0;
		}
		this.payment = this.paymentI = Number(payment);

		this.runIt();
	},
	dataOut(){

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
	 	p.workerStatus = false;

		var worker = new Worker("worker.js");
		worker.postMessage({"balance":p.balance, "rate": p.rate, "months": p.monthsI, "payment": 0});

		worker.onmessage = function(event) {
			p.payment = event.data;
			p.workerStatus = true;
			console.log("from worker:" + typeof event.data + " payment:" + event.data);
		}

		worker.onerror = function(event) {
			console.log("ERROR: " + event.filename + " ")
		}
	},
	calculateMonths() {
	/**
	 * Calculates the months necessary to pay off a loan in a certain
	 * by sending it to the worker.
	 * 
	 * Input: values are given to work based on p.balance, p.rate
	 * and p.payment.
	 *
	 * Output: the months value is set to p.months
	 */
		p.workerStatus = false;

		var worker = new Worker("worker.js");
		worker.postMessage({"balance":p.balance, "rate": p.rate, "months": 0, "payment": p.paymentI});

		worker.onmessage = function(event) {
			p.months = event.data;
			p.workerStatus = true;
			console.log("from worker:" + typeof event.data + " payment:" + event.data);
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
		try {
			this.storeObj("balance", p.balance);
			this.storeObj("rate", p.rate);
			this.storeObj("months", p.months);
			this.storeObj("payment", p.payment);
			this.storeObj("monthsInput", p.monthsI);
			this.storeObj("paymentInput", p.paymentI);
			this.storeObj("paymentObj", p.paymentObj);
			//console.log("StoreP: ", p.balance, p.rate, p.months, p.payment,	 p.monthsI, p.paymentI, p.paymentObj);
		} catch (e) {
			console.log("ERROR with storeP: " + e)
		}
	},
	setP(){
	/**
	 * Reads from localStorage and stores the values into p
	 * Values can be seen below
	 */
		p.balance = this.getObj("balance");
		p.rate = this.getObj("rate");
		p.months = this.getObj("months");
		p.payment = this.getObj("payment");
		p.monthsI = this.getObj("monthsInput");
		p.paymentI = this.getObj("paymentInput");
		p.paymentObj = this.getObj("paymentObj");
		//console.log("Set P: ", this.getObj("balance"), this.getObj("rate"), this.getObj("months"), this.getObj("payment"))
		//console.log("Payment Obj of setP:", this.getObj("paymentObj"));
	},

	setInputs(){
		setInput("balanceInput", p.balance);
		setInput("rateInput", p.rate);
		setInput("monthsInput", p.monthsI);
		setInput("paymentInput", p.paymentI)
	}
}

p.date = {
	getMonthYear() {
		var date = new Date();
		console.log(date.getUTCMonth());
		console.log(date.getUTCFullYear());
	}
}