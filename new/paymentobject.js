var pObj = paymentObject = {
  inputData(dataObj) {
  	this.data = copy(dataObj);
  },
  data: null
};

// var p = {
// _workerStatus: true,
// // table formation should go on only if workerstatus is true
// set workerStatus(status) {this._workerStatus = status;},
// get workerStatus() {return this._workerStatus;},
// _balance: 0,
// set balance(value) { this._balance = decimalConverter(value);},
// get balance() { return this._balance; },
// _rate: 0,
// set rate(value) {
// if (value >= 1) { this._rate = parseFloat(value) / 100; }
// else { this._rate = parseFloat(value); }
// },
// get rate() { return this._rate; },
// _months: 0,
// set months(value) { 
// if (value != undefined) {
// 	this._months = parseInt(value);
// } else {
// 	this._months = 0;
// }
// },
// get months() { return this._months; },
// monthsI: 0,
// _payment: 0,
// set payment(value) { 
// if (value != undefined) {
// 	this._payment = decimalConverter(value); 
// } else {
// 	this._payment = 0;
// }
// },
// get payment() { return this._payment; },
// paymentI: 0,
// headerObj: null,
// paymentObj: null,

// getPObj() {
// return this.paymentObj;
// },

// getPaymentObject(month) {
// /**
// * I want to prevent direct access to obj & want to ensure that
// * future modifications to anything here will break as least as
// * possible.
// *
// * Input: month, can type "end" &
// * Output: Return the object of that month
// */
// 	if (month === "end") {
// 		month = this.paymentObj.length - 1;
// 	} else {
// 		month -= 1;
// 	}

// return this.paymentObj[month];
// },

// translatePaymentObject(name) {
// /**
// * In case I want to change the Payment Object's key names later on
// * Just a simple switch case. Keep the cases constant.
// */
// switch(name) {
// 	case "Starting Balance":
// 		return "Starting Balance";
// 	case "Month":
// 		return "Month";
// 	case "Payment":
// 		return "Payment";
// 	case "Interest":
// 		return "Interest";
// 	case "Actual Payment to Balance":
// 		return "Actual Payment to Balance";
// 	case "Total Interest":
// 		return "Total Interest";
// 	case "End Balance":
// 		return "End Balance";
// }
// },

// makeOnePObj(a, b, c, d, e, f, g) {
// // makes obj of the values. To be used in creation 
// // and recreation of the payment object.
// var moneyF = decimalConverter;

// return {
//  	"Starting Balance": moneyF(a),
//  	"Month": b,
//  	"Payment": moneyF(c),
//  	"Interest": moneyF(d),
//  	"Actual Payment to Balance": moneyF(e),
//  	"Total Interest": moneyF(f),
//  	"End Balance": moneyF(g)
// };
// },

// getPayObjValue(month, name) {
// /**
// * Combine getPaymentObject & translatPaymentObject into one to
// * return a value depending on the month and the name of the value.
// */
// 	var obj = this.getPaymentObject(month);
// 	return obj[this.translatePaymentObject(name)]
// },

// changePaymentObject(month, name, value) {
// /** 
// * Change the payment object values based on month, name of 
// * key, ane value for the amount to change it by (note: not set
// * to this value, but changed to).
// */
// month -= 1;
// name = this.translatePaymentObject(name);

// this.paymentObj[month][name] += value;
// },

// replacePObj(obj) {
// // In addition to replacing PObj, also stores new one to local Storage
// if (Array.isArray(obj)) {
// 	p.paymentObj = obj;
// 	p.stor.storeP();
// } else {
// 	throw "replacePObj was given a non-Array";
// }
// },

// addPayments(amount) {
// /**
// * Add payment in bulk depending on what user selects on the table
// * to paymentObject.
// *
// * Note: table deals in i representing the actual month, meaning it
// * starts with 1, not 0.
// */

// var selectedArr = t.getSelected();
// selectedArr.forEach(function(value, i, arr) {
// 	p.changePaymentObject(value, "Payment", amount);
// });

// p.recalPObj();
// table.tableMaker( p.getPObj() );
// makeCircle();
// table.deselectTable();

// },

// runIt() {
// /** 
//  * Handles running of everything after data goes in.
//  * Called by p.dataIn.
//  */
// if (this.paymentI == 0) {
// 	p.calculatePayment();
// } else if (this.monthsI == 0) {
// 	var min = this.balance * (1 + this.rate/12) - this.balance;
// 	if (min >= this.payment) {
// 		display("Your payment is too low. Need to be at least larger than $	" + min);
// 	} else {
// 		p.calculateMonths();
		
// 	}
// } 

// waitForWorker();

// function waitForWorker() {
// 	if (p.workerStatus == true) {
// 		p.makePaymentObj();

// 		table.tableMaker( p.getPObj() );
// 		makeCircle();
// 	} else {
// 		window.setTimeout(waitForWorker, 50);
// 	}
// }
// },

// dataIn(bal, rate, months, payment) {
// // properties have setters that'll convert to correct format.
// this.balance = bal;
// this.rate = rate;
// this.months = this.monthsI = months;
// this.payment = this.paymentI = payment;

// this.runIt();
// },

// calculatePayment() {
// /**
// * Calculates the payment necessary to pay off a loan in a certain
// * amount of time by sending it to the worker.
// * 
// * Input: values are given to work based on p.balance, p.rate
// * 	and p.months.
// * Output: the payment value is set to p.payment
// */
// 	p.workerStatus = false;

// var worker = new Worker("worker.js");
// worker.postMessage({"balance":p.balance, "rate": p.rate, "months": p.months, "payment": 0});

// worker.onmessage = function(event) {
// 	p.payment = event.data;
// 	p.workerStatus = true;
// 	console.log("from worker:" + typeof event.data + " payment:" + event.data);
// }

// worker.onerror = function(event) {
// 	console.log("ERROR: " + event.filename + " ")
// }
// },
// calculateMonths() {
// /**
// * Calculates the months necessary to pay off a loan in a certain
// * by sending it to the worker.
// * 
// * Input: values are given to work based on p.balance, p.rate
// * 	and p.payment.
// * Output: the months value is set to p.months
// */
// p.workerStatus = false;

// var worker = new Worker("worker.js");
// worker.postMessage({"balance":p.balance, "rate": p.rate, "months": 0, "payment": p.payment});

// worker.onmessage = function(event) {
// 	p.months = event.data;
// 	p.workerStatus = true;
// 	console.log("from worker:" + typeof event.data + " payment:" + event.data);
// }

// worker.onerror = function(event) {
// 	console.log("ERROR: " + event.filename + " ")
// }
// },

// makePaymentObj() {
// /**
// * Makes the paymentObject that makeTable will use.
// *
// * Input: reads from p.balance, p.rate, p.months, p.payment
// * Output: replaces p.paymentObject (null) for each month detailing interest,
// * 	remaining balance, tallying interest from previous months
// */

// var that = p;

// var arr = [],
// 	rate = that.rate/ 12,
// 	balance = that.balance,
// 	oldBalance = 0,
// 	months = that.months,
// 	payment = that.payment,
// 	realPayment = 0,
//  	month = 0,
//  	interest = 0,
//  	totalInterest = 0;

// for (month = 1; month <= months && balance >= 0; month++) {
// 	oldBalance = balance;			
// 	interest = balance * rate;
// 	realPayment = payment - interest;
// 	totalInterest += interest;
// 	balance += interest - payment;

// 	arr.push(that.makeOnePObj(oldBalance, month, payment, interest, realPayment, totalInterest, balance) );
// }

// p.replacePObj(arr);
// },

// recalPObj() {
// /** 
// * Change the paymentObj by first make a new object, using 
// * the starting of the object (just the first one) and the 
// * payments (all of them).
// * 
// * Then, everything is recalculated from there. If more 
// * months are need then the old payment object, then 
// * calculation will use payment from the last month.
// *
// * Output: Doesn't return anything. Directly replaces 
// * paymentObj with a new, updated one.
// */

// var that = p;

// var arr = [],
// 	rate = that.rate/ 12,
// 	balance = that.getPayObjValue(1, "Starting Balance"),
// 	oldBalance = 0,
// 	payment = 0,
// 	realPayment = 0,
//  	month = 1,
//  	interest = 0,
//  	totalInterest = 0;

// while (balance >= 0) {
// 	oldBalance = balance;
// 	try {
// 		payment = that.paymentObj[month - 1][that.translatePaymentObject("Payment")];
// 	} catch(e) {
// 		// do nothing, let payment stay as it is
// 	}
// 	interest = balance * rate;
// 	realPayment = payment - interest;
// 	totalInterest += interest;
// 	balance += interest - payment;

// 	arr.push(that.makeOnePObj(oldBalance, month, payment, interest, realPayment, totalInterest, balance) );
// 	month++;
// }

// p.replacePObj(arr);
// }
// };

// p.stor = {
// checkObjInStor(name) {
// if (sessionStorage.getObject(name) === null) {
// 	return false;
// } else {
// 	return true;
// }
// },

// storeObj(key, obj) {
// localStorage.setObject(key, obj);
// },

// getObj(key) {
// return localStorage.getObject(key);
// },

// delObj(key) {
// localStraoge.deleteObject(key);
// },

// storeP() {
// // stores balance, payment, apr, month & paymentObj into storage
// try {
// 	this.storeObj("balance", p.balance);
// 	this.storeObj("rate", p.rate);
// 	this.storeObj("months", p.months);
// 	this.storeObj("payment", p.payment);
// 	this.storeObj("monthsInput", p.monthsI);
// 	this.storeObj("paymentInput", p.paymentI);
// 	this.storeObj("paymentObj", p.paymentObj);
// 	//console.log("StoreP: ", p.balance, p.rate, p.months, p.payment,	 p.monthsI, p.paymentI, p.paymentObj);
// } catch (e) {
// 	console.log("ERROR with storeP: " + e)
// }
// },
// setP(){
// /**
// * Reads from localStorage and stores the values into p
// * Values can be seen below
// */
// p.balance = this.getObj("balance");
// p.rate = this.getObj("rate");
// p.months = this.getObj("months");
// p.payment = this.getObj("payment");
// p.monthsI = this.getObj("monthsInput");
// p.paymentI = this.getObj("paymentInput");
// p.paymentObj = this.getObj("paymentObj");
// //console.log("Set P: ", this.getObj("balance"), this.getObj("rate"), this.getObj("months"), this.getObj("payment"))
// //console.log("Payment Obj of setP:", this.getObj("paymentObj"));
// },

// setInputs(){
// setInput("balanceInput", p.balance);
// setInput("rateInput", p.rate);
// setInput("monthsInput", p.monthsI);
// setInput("paymentInput", p.paymentI);
// }
// }

// p.date = {
// getMonthYear() {
// var date = new Date();
// console.log(date.getUTCMonth());
// console.log(date.getUTCFullYear());
// }
// }