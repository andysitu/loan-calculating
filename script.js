function init() {
	function changeInput(e) {

		function changeTextDiv() {
		  // When the select option is changed, this changes the
		  // text divs that label for the 3 text inputs
			for (var i = 0, len = arguments.length; i < len; i++) {
				var id = "text" + i;
				var textElem = document.getElementById(id);

				textElem.textContent = arguments[i];

			}

			// clearing text inputs
			for (var i = 0; i < 3; i++) {
				var id = "input" + i;
				var input = document.getElementById(id);

				input.value = "";

			}
		}
		var value = e.target.value;

		p.changeStatus(value);
		if (value === "pay") {
			changeTextDiv("Balance:", "APR:", "Pay in months:");
		} else {
			changeTextDiv("Balance:", "APR:", "Pay each month:")
		}
	}

	var select = document.getElementById("options");
	select.addEventListener("change", changeInput, false); 
	select = null;

	function onSubmit(e) {
		var bal = document.getElementById("input0").value;
		var rate = document.getElementById("input1").value;
		var months = document.getElementById("input2").value;

		p.dataIn(bal, rate, months);
		p.calculatePayment();
		waitForWorker();

		function waitForWorker() {
			if (p.payment > 0) {
				p.paymentObj = p.makePaymentObj();
				p.displayInfo();
				p.stor.storeP();

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