function PaymentObject(data) {
  this.data = payF.completeData(data);
  this.paymentArray = payF.inputToMakePArray( this.data );
  this.index = 0;
}

PaymentObject.prototype.getHeaderList = function() {
  return payF.makeHeaderList(payF.pObjMaker);
};

PaymentObject.prototype.getPaymentArray = function() {
  return this.paymentArray;
};

PaymentObject.prototype.resetNext = function() {
  this.index = 0;
};
PaymentObject.prototype.nextPaymentObject = function() {
  if (this.index === 0)
    return this.paymentArray[this.index++];
  else
    return this.paymentArray[++this.index];
};
PaymentObject.prototype.checkNext = function() {
  if (this.index === 0)
    return true;
  else if (this.index + 1 >= this.paymentArray.length)
    return false;
  else
    return true;
};

PaymentObject.prototype.getBalance = function(month) {
  return this.paymentArray[month - 1]["Starting Balance"];
};

PaymentObject.prototype.getTotalInterest = function() {
  return this.paymentArray[this.paymentArray.length - 1]["Total Interest"];
};


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

