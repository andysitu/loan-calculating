function display(msg) {
	var msgArea = document.getElementById('msg');

	msgArea.textContent = msg;
	
}

function setInput(id, value) {
	var input = document.getElementById(id);

	input.value = value;
}

function makeTable(dataArr, headerObj) {
	/* Makes a table to doc by the headerObj (array) containing table heading
	 * to specify order of the headings (optional) and dataObj which is objs 
	 * in array that will contain the actual data.
	 *
	 * If headObj is not provided, then the headings might not be in order
	 */
	var docFrag = document.createDocumentFragment();

	var table = document.createElement("table");
	table.id = "table";
	docFrag.appendChild(table);

	var keys = [];
	if (headerObj != undefined && typeof headerObj === "object") {
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

	table.appendChild(tr);

	for (i = 0; i < dataArr.length; i++) {
		var tr = document.createElement("tr");
		for (var j = 0; j < keys.length; j++) {
			var td = document.createElement("td");
			td.textContent = dataArr[i][keys[j]];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	var test = document.getElementById("table");
	if (test === null) {
		document.body.appendChild(docFrag);
	} else {
		document.body.replaceChild(docFrag, test);
	}
}

function moneyFormatter(value) {
	// Makes number into correct format for money
	return Math.ceil(value * 100) / 100
}