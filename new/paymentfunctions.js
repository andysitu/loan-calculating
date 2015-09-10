var payF = {
  completeData: function(data) {
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
      endingBalance = balance,
      rate = 1 + rate,
      upLimit = Math.pow(rate, months) * balance / months,
      lowLimit = balance / months,
      guess;

    while ( upLimit - lowLimit > 0.01  ) {
      if (counter++ > 1000) {
        console.log("Something went wrong");
        break;
      }
      endingBalance = balance;
      guess = (upLimit + lowLimit) / 2;
      for (var i = 0; i < months; i++) {
        endingBalance = endingBalance * (rate) - guess;
        console.log(Math.ceil(guess * 100) / 100, endingBalance);
      }

      if (endingBalance > 0) {
        lowLimit = guess;
      } else { upLimit = guess; }
      //console.log(limit, "guess " + guess + " endingBalance: " + endingBalance + " lowLimit: " + lowLimit + " upLimit: "+ upLimit)
    }
    return Math.ceil(guess * 100) / 100;
  },

  calculateMonths: function(balance, rate, payment) {
    var months = 0,
      rate = rate / 12;

    while (balance > 0) {
      months++;
      balance = balance * (1 + rate) - payment;
    }
    return months
  },

  makePObj: function(data) {
    var array = [],
      rate = data.rate/ 12,
      balance = data.balance,
      months = data.months,
      payment = data.payment;

    return this.makePayingArray(this.makePayingObject, balance, rate, months, payment);
  },

  makePayingArray: function(objMaker, balance, rate, months, payment) {
    var array = [],
      oldBalance = 0,
      actualPayment = 0,
      month = 0,
      interest = 0,
      totalInterest = 0;

    for (month = 1; month <= months && balance >= 0; month++) {
      oldBalance = balance;     
      interest = balance * rate;
      actualPayment = payment - interest;
      totalInterest += interest;
      balance -= actualPayment;

      array.push( objMaker(oldBalance, month, payment, interest, actualPayment, totalInterest, balance) );
    }

    return array;
  },

  makePayingObject: function(startingBalance, month, payment, interest, actualPayment, totalInterest, endBalance) {
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
  }
};