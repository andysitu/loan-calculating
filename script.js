function onSubmit(e) {
	var bal = document.getElementById("balanceInput").value;
	var rate = document.getElementById("rateInput").value;
	var months = document.getElementById("monthsInput").value;
	var payment = document.getElementById("paymentInput").value;

	if ( parseInt(months) > 0 || parseFloat(payment) > 0) {
		p.dataIn(bal, rate, months, payment);
	} else {
		display("You need to fill in either months or payment with a valid value");
	}
	
}

function init() {

	var reset = document.getElementById("resetButton");
	reset.addEventListener("click", onSubmit);

	var submit = document.getElementById("submit");
	submit.addEventListener("click", onSubmit);
	// add right click events for the inputs

	var tableButton = document.getElementById("tableButton");
	tableButton.addEventListener("click", function(e) {
		hideInput(false);
	});

	addClearEvents();

	reset = null;
	submit = null;
	onsubmit = null;

	// Check from localStorage if anything has been stored.
	// If so, will make table and change values to last setting
	// of the HTML input element. Then, will plot the table.
	if (p.stor.getObj("paymentObj") !== null) {
		p.stor.setP();
		p.stor.setInputs();
		
		table.tableMaker( p.getPObj() );
		makeCircle();
	} else {
		hideInput(false);
	}

	var add = document.getElementById("addSubmit");
	add.addEventListener("click", function(e){
		var addInput = document.getElementById("addInput");
		if (parseFloat(addInput.value) > 0) {
			p.addPayments(moneyFormatter(addInput.value));
		} else {
			display("You didn't enter an value into Add");
		}
		addInput.value = "";
	});

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