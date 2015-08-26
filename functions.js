function display(msg) {
	var msgArea = document.getElementById('msg');

	msgArea.textContent = msg;
	
}

function setInput(id, value) {
	var input = document.getElementById(id);

	input.value = value;
}

function clearInput(id) {
	setInput(id, "");
}

function addClearEvent(id) {
	var ele = document.getElementById(id);

	ele.addEventListener("contextmenu", function(e){
		e.preventDefault();
		clearInput(id);
	});

	ele = null;
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

	function headerTranslator(value) {
		switch(value) {
			case "Actual Payment to Balance":
				return "Actual Payment\nto Balance";
				break;
			default: return value;
		}
	}

	var tr = document.createElement("tr");
	for (var i = 0; i < keys.length; i++) {
		var th = document.createElement("th");
		th.textContent = headerTranslator(keys[i]);

		tr.appendChild(th);
	}

	function moneyTranslator(value, key) {
		switch(key) {
			case "Month":
				return value;
			default:
				return value.toFixed(2);
		}
	}

	table.appendChild(tr);

	for (i = 0; i < dataArr.length; i++) {
		var tr = document.createElement("tr");
		for (var j = 0; j < keys.length; j++) {
			var td = document.createElement("td");
			td.textContent = moneyTranslator(dataArr[i][keys[j]], keys[j]);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	var test = document.getElementById("table");
	var tableHere = document.getElementById("tableHere");
	if (test === null) {
		tableHere.appendChild(docFrag);
	} else {
		tableHere.replaceChild(docFrag, test);
	}
}

function moneyFormatter(value) {
	// Makes number into correct format for money
	return Math.ceil(parseFloat(value) * 100) / 100
}