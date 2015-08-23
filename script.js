Storage.prototype.setObject = function(key, value) {
	this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
	var value = this.getItem(key);
	return JSON.parse(value);
}

function init() {
	function changeInput(e) {

		function changeT() {
			for (var i = 0, len = arguments.length; i < len; i++) {
				var id = "text" + i;
				var textElem = document.getElementById(id);

				textElem.textContent = arguments[i];
			}
		}
		var value = e.target.value;

		p.changeStatus(value);
		if (value === "pay") {
			changeT("Balance:", "APR:", "Pay in months:");
		} else {
			changeT("Balance:", "APR:", "Pay each month:")
		}
	}

	var select = document.getElementById("options");
	select.addEventListener("change", changeInput, false); 
	select = null;

	function onSubmit(e) {
		var bal = document.getElementById("balance").value;
		var rate = document.getElementById("rate").value;
		var months = document.getElementById("date").value;

		p.dataIn(bal, rate, months);
		p.calculatePayment();
		waitForWorker();

		function waitForWorker() {
			console.log("time");
			if (p.payment > 0) {
				p.paymentObj = p.makePaymentObj();
				p.displayInfo();

				makeTable(p.paymentObj);
			} else {
				window.setTimeout(waitForWorker, 50);
			}
		}

	}

	var submit = document.getElementById("submit");
	submit.addEventListener("click", onSubmit);
	submit = null;
}

window.onload = init;