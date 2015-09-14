function PaymentSystem(data) {
/* Data contains the complete set of data. Payment array 
 *  contains payment objects, which contains the payment 
 *  info with the keys being the names.
 * Values are formatted in decimal places.
 */
  this.data = payF.completeData(data);
  this.paymentArray = payF.inputToMakePArray( this.data, "make_Payment_Array" );
  this.index = 0;
}

PaymentSystem.prototype.getHeaderList = function() {
// Runs headerlist method in payment functions.
  return payF.makeHeaderList(payF.pObjFormatter);
};

PaymentSystem.prototype.getPaymentArray = function() {
// Payment systems will only give a copy of the payment
// arrays since other methods will allow changing the data.
  return copy(this.paymentArray);
};

PaymentSystem.prototype.resetNext = function() {
// Index for the generator next Payment Object.
  this.index = 0;
};
PaymentSystem.prototype.nextPaymentObject = function() {
/* Generator that returns the next payment object.
 * checkNext can be used so that functions will now when
 *  they have reached the end. If not, then this method
 *  will just reset the index and keep on running.
 */
  if (this.index === 0)
    return this.paymentArray[this.index++];
  else if (this.index >= this.paymentArray.length) {
    this.index = 0;
    return this.paymentArray[this.index++];
  } else
    return this.paymentArray[++this.index];
};
PaymentSystem.prototype.checkNext = function() {
// Returns false when this.index has reached the end.
  if (this.index === 0)
    return true;
  else if (this.index >= this.paymentArray.length)
    return false;
  else
    return true;
};

PaymentSystem.prototype.getBalance = function(month) {
  return this.paymentArray[month - 1]["Starting Balance"];
};

PaymentSystem.prototype.getTotalInterest = function() {
// Returns the total interest at the end of the payment array.
  return this.paymentArray[this.paymentArray.length - 1]["Total Interest"];
};

PaymentSystem.prototype.addPayments = function(amount, months) {
// Adds an amount to all the specified months. Months is an array
//  containing the months.
  amount = decimalConverter(amount);
  each(months, function(month) {
    this._changeDataObj(month - 1, "Payment", amount, true);
  }, this);
};

PaymentSystem.prototype._changeDataObj = function(index, type, value, add) {
// Internal method. Changes the payment objects in the array.
  if (add === true) {
    this.paymentArray[index][type] += value;
  } else {
    this.paymentArray[index][type] = value;
  }
};

PaymentSystem.prototype.remakePaymentArray = function() {
  this.paymentArray = payF.inputToMakePArray( this.data, "remake_Payment_Array", this.paymentArray )
};