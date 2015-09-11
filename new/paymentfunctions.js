var payF = {
  completeData: function(data) {
    var data = copy(data);

    data.rate = 1 + data.rate/12;

    if (data.months == '') {
      var months = this.calculateMonths(data.balance, data.rate, data.payment);
      data.months = months;
    } else if (data.payment == '') {
      var payment = this.calculatePayment(data.balance, data.rate, data.months);
      data.payment = payment;
    } else {
      console.log("Got everything");
    }
    return data;
  },

  calculatePayment: function(balance, rate, months) {
    var counter = 0,
      endingBalance,
      upLimit = Math.pow(rate, months) * balance / months,
      lowLimit = balance / months,
      guess;

    while ( upLimit - lowLimit > 0.01  ) {
      if (counter++ > 1000) {
        console.log("Something went wrong");
        break;
      }
      guess = (upLimit + lowLimit) / 2;
      endingBalance = this.calculateEndBalance(balance, rate, months, guess);

      if (endingBalance > 0) {
        lowLimit = guess;
      } else { upLimit = guess; }
      //console.log(limit, "guess " + guess + " endingBalance: " + endingBalance + " lowLimit: " + lowLimit + " upLimit: "+ upLimit)
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

  makePArray: function(data) {
    var rate = data.rate,
      balance = data.balance,
      months = data.months,
      payment = data.payment;

    return this.makePObj(this.pObjMaker, balance, rate, months, payment);
  },

  makePObj: function(objMaker, balance, rate, months, payment) {
    var array = [],
      startBalance,
      actualPayment = 0,
      month = 0,
      interest = 0,
      totalInterest = 0;

    for (month = 1; month <= months && balance >= 0; month++) {
      startBalance = balance;     
      interest = balance * rate - balance;
      actualPayment = payment - interest;
      totalInterest += interest;
      balance -= actualPayment;

      array.push( objMaker(startBalance, month, payment, interest, actualPayment, totalInterest, balance) );
    }

    return array;
  },

  pObjMaker: function(startingBalance, month, payment, interest, actualPayment, totalInterest, endBalance) {
    // Interprets data & returns object containing correct
    // format for the data. This is for negative payments.

    return {
      "Starting Balance": decimalConverter(startingBalance),
      "Month": month,
      "Payment": decimalConverter(payment),
      "Interest": decimalConverter(interest),
      "Actual Payment to Balance": decimalConverter(actualPayment),
      "Total Interest": decimalConverter(totalInterest),
      "End Balance": decimalConverter(endBalance)
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