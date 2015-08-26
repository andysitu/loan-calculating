function onSubmit(e) {
	var bal = document.getElementById("balanceInput").value;
	var rate = document.getElementById("rateInput").value;
	var months = document.getElementById("monthsInput").value;
	var payment = document.getElementById("paymentInput").value;

	p.dataIn(bal, rate, months, payment);
}

function init() {

	var submit = document.getElementById("submit");
	submit.addEventListener("click", onSubmit);
	addClearEvent("balanceInput");
	addClearEvent("rateInput");
	addClearEvent("monthsInput");
	addClearEvent("paymentInput");

	// Check from localStorage if anything has been stored.
	// If so, will make table and change values to last setting
	// of the HTML input element
	if (p.stor.getObj("paymentObj") !== null) {
		p.stor.setP();
		p.stor.setInputs();
		
		submit.click();
	}

	makeCircle();
	submit = null;
	onsubmit = null;

}

window.onload = init;
init = null;

Storage.prototype.setObject = function(key, value) {
	this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
	var value = this.getItem(key);
	return JSON.parse(value);
};

Storage.prototype.deleteObject = function(key) {
	this.removeItem(key);
}