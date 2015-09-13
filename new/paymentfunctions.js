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

    while ( upLimit - lowLimit > 0.005 || endingBalance > 0 ) {
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
      return this.makePArray(this.pObjMaker, balance, rate, months, payment);
    else if (pArrayType == "remake_Payment_Array")
      return this.remakePArray(this.pObjMaker, pArray, balance, rate, months, payment);
  },

  makePArray: function(objMaker, balance, rate, months, payment) {
    var array = [],
      startBalance,
      actualPayment = 0,
      month = 1,
      interest = 0,
      totalInterest = 0;

    for ( ; month <= months && balance >= 0; month++) {
      startBalance = balance;     
      interest = balance * rate - balance;
      actualPayment = payment - interest;
      totalInterest += interest;
      balance -= actualPayment;

      var pObj = objMaker(month, startBalance, payment, interest, actualPayment, totalInterest, balance);
      array.push(pObj);
    }

    return array;
  },
  remakePArray: function(objMaker, paymentArray, balance, rate, originalPayment) {
    var differentPayment = {};
    each(paymentArray, function(dataObj) {
      if (dataObj["Payment"] != originalPayment)
        differentPayment[dataObj["Month"]] = dataObj["Payment"];
    });

    var paymentArray = [],
      startBalance,
      actualPayment = 0,
      month = 1,
      interest = 0,
      totalInterest = 0,
      payment;

    for ( ; balance >= 0; month++) {
      startBalance = balance;
      interest = balance * rate - balance;
      if (month in differentPayment) {
        payment = differentPayment[month];
      } else {
        payment = originalPayment;
      }
      actualPayment = payment - interest;
      totalInterest += interest;
      balance -= actualPayment;

      var pObj = objMaker(month, startBalance, payment, interest, actualPayment, totalInterest, balance);
      paymentArray.push(pObj);
    }

    return paymentArray;
  },

  pObjMaker: function(month, startingBalance, payment, interest, actualPayment, totalInterest, endBalance) {
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
  }
};