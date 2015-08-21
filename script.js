function display(msg) {
	var msgArea = document.getElementById('msg');

	msgArea.textContent = msg;
	
}

function makeTable(headerObj, dataObj) {
	/* Makes a table to doc by the headerObj (array) containing table heading
	 * to specify order of the headings (optional) and dataObj which is objs 
	 * in array that will contain the actual data.
	 *
	 * If headObj is not provided, then the headings might not be in order
	 */
	var docFrag = document.createDocumentFragment();

	var tr = document.createElement("tr");
	var th = document.createElement("th");
	th.textContent = "TESTING HEADING";
	tr.appendChild(th);
	docFrag.appendChild(tr);

	document.body.appendChild(docFrag);
}

function init() {
	function test(e) {
		console.log(e.target.value, typeof e.target.value);
	}

	var select = document.getElementById("options");
	select.addEventListener("change", test, false); 
	select = null;

	function onSubmit(e) {
		var bal = document.getElementById("balance");
		var rate = document.getElementById("rate");
		var date = document.getElementById("date");

		p.dataIn(bal.value, rate.value, date.value);
	}

	var submit = document.getElementById("submit");
	submit.addEventListener("click", onSubmit);
	submit = null;
}

window.onload = init;