var payF = {
  completeData: function(data) {
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
    run(function(i) {
      balance = balance * rate - payment;
    }, months)
    return balance;
  },

  calculateMonths: function(balance, rate, payment) {
    var months = 0;

    while (balance > 0) {
      months++;
      balance = balance * (rate) - payment;
    }
    return months
  },

  inputToMakePArray: function(data, pArrayType, pArray) {
    var rate = data.rate,
      balance = data.balance,
      months = data.months,
      payment = data.payment;

    if (pArrayType == "make_Payment_Array")
      return this.makePArray(this.pObjFormatter, balance, rate, months, payment);
    else if (pArrayType == "remake_Payment_Array") {
      var differingPayments = this.makeDifferingPaymentsObject(pArray, payment);
      return this.remakePArray(this.pObjMaker, differingPayments, balance, rate, payment, pArray.length);
    }
  },

  makePArray: function(pObjFormatter, balance, rate, months, payment) {
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
    var paymentArray = [],
      totalInterest = 0,
      payment,
      month = 1;

    for ( ; balance >= 0; month++) {
      if (month in differingPayments) {
        payment = differingPayments[month];
        if (payment < originalPayment) { // if user puts in a negative payment
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
    // Interprets data & returns object containing correct
    // format for the data. This is for negative payments.

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

  makeHeaderList: function(makePObjFunction) {
    var length = getNumArguments(makePObjFunction),
      rangedArray = range(0, length),
      obj = makePObjFunction.apply(null, rangedArray);

    var headerList = [];
    each(obj, function(order, header) {
      headerList[order] = header;
    });
    return headerList;
  },
  makeDifferingPaymentsObject: function(paymentArray, originalPayment) {
    var differingPayments = {};
    each(paymentArray, function(paymentObject) {
      if (paymentObject["Payment"] != originalPayment)
        differingPayments[ paymentObject["Month"] ] = paymentObject["Payment"];
    });
    return differingPayments;
  }
};