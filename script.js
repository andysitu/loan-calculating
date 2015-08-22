function display(msg) {
	var msgArea = document.getElementById('msg');

	msgArea.textContent = msg;
	
}

function makeTable(dataArr, headerObj) {
	/* Makes a table to doc by the headerObj (array) containing table heading
	 * to specify order of the headings (optional) and dataObj which is objs 
	 * in array that will contain the actual data.
	 *
	 * If headObj is not provided, then the headings might not be in order
	 */
	var docFrag = document.createDocumentFragment();

	var keys = [];
	if (Array.isArray(headerObj)) {
		keys = headerObject.slice(0);
	} else {
		keys = Object.keys(dataArr[0]);
	}

	

	var tr = document.createElement("tr");
	for (var i = 0; i < keys.length; i++) {
		var th = document.createElement("th");
		th.textContent = keys[i];
		tr.appendChild(th);
	}

	docFrag.appendChild(tr);

	for (i = 0; i < dataArr.length; i++) {
		var tr = document.createElement("tr");
		for (var j = 0; j < keys.length; j++) {
			var td = document.createElement("td");
			td.textContent = dataArr[i][keys[j]];
			tr.appendChild(td);
		}
		docFrag.appendChild(tr);
	}
	
	document.body.appendChild(docFrag);
}

function moneyFormatter(value) {
	// Makes number into correct format for money
	return Math.ceil(value * 100) / 100
}

function init() {
	function test(e) {
		console.log(e.target.value, typeof e.target.value);
	}

	var select = document.getElementById("options");
	select.addEventListener("change", test, false); 
	select = null;

	function onSubmit(e) {
		var bal = document.getElementById("balance").value;
		var rate = document.getElementById("rate").value;
		var months = document.getElementById("date").value;

		p.dataIn(bal, rate, months);
		p.payment = p.calculatePayment();
		p.paymentObj = p.makePaymentObj();
		p.displayInfo();

		makeTable(p.paymentObj);
	}

	var submit = document.getElementById("submit");
	submit.addEventListener("click", onSubmit);
	submit = null;
}

window.onload = init;