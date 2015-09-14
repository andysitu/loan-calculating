function PaymentSystem(data) {
  this.data = payF.completeData(data);
  this.paymentArray = payF.inputToMakePArray( this.data, "make_Payment_Array" );
  this.index = 0;
}

PaymentSystem.prototype.getHeaderList = function() {
  return payF.makeHeaderList(payF.pObjFormatter);
};

PaymentSystem.prototype.getPaymentArray = function() {
  return copy(this.paymentArray);
};

PaymentSystem.prototype.resetNext = function() {
  this.index = 0;
};
PaymentSystem.prototype.nextPaymentObject = function() {
  if (this.index === 0)
    return this.paymentArray[this.index++];
  else if (this.index >= this.paymentArray.length) {
    this.index = 0;
    return this.paymentArray[this.index++];
  } else
    return this.paymentArray[++this.index];
};
PaymentSystem.prototype.checkNext = function() {
  if (this.index === 0)
    return true;
  else if (this.index + 1 >= this.paymentArray.length)
    return false;
  else
    return true;
};

PaymentSystem.prototype.getBalance = function(month) {
  return this.paymentArray[month - 1]["Starting Balance"];
};

PaymentSystem.prototype.getTotalInterest = function() {
  return this.paymentArray[this.paymentArray.length - 1]["Total Interest"];
};

PaymentSystem.prototype.addPayments = function(amount, months) {
  amount = decimalConverter(amount);
  each(months, function(month) {
    this._changeDataObj(month - 1, "Payment", amount, true);
  }, this);
};

PaymentSystem.prototype._changeDataObj = function(index, type, value, add) {
  if (add === true) {
    this.paymentArray[index][type] += value;
  } else {
    this.paymentArray[index][type] = value;
  }
};

PaymentSystem.prototype.remakePaymentArray = function() {
  this.paymentArray = payF.inputToMakePArray( this.data, "remake_Payment_Array", this.paymentArray )
};