// Contains the functions that payment systems will use.
var payF = {
  completeData: function(data) {
  /* Decides how to complete the data object given to it by calling other
   *  other methods in the object.
   * The data object in its complete form contains balance, rate, payment,
   *  and months for now.
   */
    var data = copy(data);

    data.rate = 1 + data.rate/12;

    if (data.months == '') {
      data.months = this.calculateMonths(data.balance, data.rate, data.payment);
    } else if (data.payment == '') {
      data.payment = this.calculatePayment(data.balance, data.rate, data.months);
    }
    return data;
  },

  calculatePayment: function(balance, rate, months) {
  // Calculates payment given 3 parameters and returns it.
    var counter = 0,
      endingBalance = balance,
      upLimit = Math.pow(rate, months) * balance / months,
      lowLimit = balance / months,
      guess;

    if (months <= 1) { return Math.ceil( balance * rate); }

    while ( upLimit - lowLimit > 0.005 || endingBalance > 0.001 ) {
      if (counter++ > 1000) {
        console.log("Something went wrong");
        break;
      }
      guess = (upLimit + lowLimit) / 2;
      endingBalance = this.calculateEndBalance(balance, rate, months, guess);

      if (endingBalance > 0) {
        lowLimit = guess;
      } else { upLimit = guess; }
      //console.log("guess " + guess + " endingBalance: " + endingBalance + " lowLimit: " + lowLimit + " upLimit: "+ upLimit)
    }
    return Math.ceil(guess * 100) / 100;
  },

  calculateEndBalance: function(balance, rate, months, payment) {
  // Helper function for calculatePayment. Returns balance after 
  // months times of calculations.
    run(function(i) {
      balance = balance * rate - payment;
    }, months)
    return balance;
  },

  calculateMonths: function(balance, rate, payment) {
  // Calculates months it takes for balance to reach 0. 
  // Returns months.
    var months = 0;

    while (balance > 0) {
      months++;
      balance = balance * (rate) - payment;
    }
    return months
  },

  inputToMakePArray: function(data, pArrayType, pArray) {
  // Handles the inputs required for each payment array maker.
  // Might change this later, but no good ideas for simplification.
    var rate = data.rate,
      balance = data.balance,
      months = data.months,
      payment = data.payment;

    if (pArrayType == "make_Payment_Array")
      return this.makePArray(this.pObjFormatter, balance, rate, months, payment);
    else if (pArrayType == "remake_Payment_Array") {
      // This is when user modifies the payment array.
      var differingPayments = this.makeDifferingPaymentsObject(pArray, payment);
      return this.remakePArray(this.pObjFormatter, differingPayments, balance, rate, payment, pArray.length);
    }
  },

  makePArray: function(pObjFormatter, balance, rate, months, payment) {
  /* Makes a payment array and returns it using helper functions,
   *  object maker decided by inputToMakePArray. Note that it depends 
   *  on the payment objects having "Ending Balance" & "Total Interest"
   *  as properties since it looks them up. 
   * Returns a payment array, containing payment objects.
   */
    var paymentArray = [],
      paymentObject,
      month = 1,
      totalInterest = 0;

    for ( ; month <= months && balance >= 0; month++) {
      paymentObject = this.makePaymentObject(pObjFormatter, balance, rate, month, payment, totalInterest)
      balance = paymentObject["Ending Balance"];
      totalInterest = paymentObject["Total Interest"];
      paymentArray.push(paymentObject);
    }

    return paymentArray;
  },
  remakePArray: function(pObjFormatter, differingPayments, balance, rate, originalPayment, months) {
  /* Used when user modifies the payments and then the balances, etc
   *  have to be calculated again. Returns a new payment array.
   */
    var paymentArray = [],
      totalInterest = 0,
      payment,
      month = 1;

    for ( ; balance >= 0; month++) {
      if (month in differingPayments) {
        payment = differingPayments[month];
        if (payment < originalPayment) { // if user puts in a negative payment
          // This is for when the user adds negative payment in the last month.
          var monthsRemaining = months - month >= 0 ? months - month : 1;
          originalPayment = this.calculatePayment(balance, rate, monthsRemaining);
        }
      } else {
        payment = originalPayment;
      }
      var paymentObject = this.makePaymentObject(pObjFormatter, balance, rate, month, payment, totalInterest)
      balance = paymentObject["Ending Balance"];
      totalInterest = paymentObject["Total Interest"];
      paymentArray.push(paymentObject);
    }
    return paymentArray;
  },
  makePaymentObject: function(pObjFormatter, balance, rate, month, payment, totalInterest) {
    startBalance = balance;
    var interest = balance * rate - balance;
    actualPayment = payment - interest;
    totalInterest += interest;
    balance -= actualPayment;

    var pObj = pObjFormatter(month, startBalance, payment, interest, actualPayment, totalInterest, balance);
    return pObj;
  },

  pObjFormatter: function(month, startingBalance, payment, interest, actualPayment, totalInterest, endBalance) {
    /* Interprets data & returns object containing correct
     *  format for the data. This is for negative payments.
     * Note: ordering of parameters matter since makeHeaderList
     *  uses it for the ordering of the headers.
     */
    return {
      "Month": month,
      "Starting Balance": decimalConverter(startingBalance),
      "Payment": decimalConverter(payment),
      "Interest": decimalConverter(interest),
      "Actual Payment": decimalConverter(actualPayment),
      "Total Interest": decimalConverter(totalInterest),
      "Ending Balance": decimalConverter(endBalance)
    };
  },

  makeHeaderList: function(pObjFormatter) {
  /* Gets number of arguments for pObjFormatter and runs it to
   *  get a payment object that has values that are numbered,
   *  essentially ordering the payment object to return an
   *  array of this ordered header list.
   */ 
    var length = getNumArguments(pObjFormatter),
      rangedArray = range(0, length),
      obj = pObjFormatter.apply(null, rangedArray);

    var headerList = [];
    each(obj, function(order, header) {
      headerList[order] = header;
    });
    return headerList;
  },
  makeDifferingPaymentsObject: function(paymentArray, originalPayment) {
  // Returns an object of any payments that differ from the payment array
  //  with the month being the key and the payment as the value.
    var differingPayments = {};
    each(paymentArray, function(paymentObject) {
      if (paymentObject["Payment"] != originalPayment)
        differingPayments[ paymentObject["Month"] ] = paymentObject["Payment"];
    });
    return differingPayments;
  }
};