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
	var th = document.createElement("th");
	th.textContent = "Select";
	tr.appendChild(th);
	for (var i = 0; i < keys.length; i++) {
		var th = document.createElement("th");
		th.textContent = headerTranslator(keys[i]);

		tr.appendChild(th);
	}

	var commas = makeCommas;

	function moneyTranslator(value, key) {
		switch(key) {
			case "Month":
				return value;
			default:
				return commas(value.toFixed(2));
		}
	}

	table.appendChild(tr);

	for (i = 0; i < dataArr.length; i++) {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		tr.appendChild(td);
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

function makeCircle() {
/**
 * Makes circle with canvas that for now colors it in proportion
 *   amount of the total interest and the amount of balance. Also,
 *   it attaches itself to the canvas with id "canvas."
 */
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d"),
		width = 600,
		height = 400,
		pi = 2 * Math.PI,
		startingBalance = p.getPayObjValue(1, "Starting Balance"),
		totalInterest = p.getPayObjValue("end", "Total Interest"),
		center = Math.floor(height/2);

	canvas.width = width;
	canvas.height = height;
	portion = startingBalance / (startingBalance + totalInterest);

	ctx.save();
	ctx.moveTo(center, center);
	ctx.beginPath();
	ctx.arc(center, center, center, 0, portion * pi, false);
	ctx.lineTo(center, center);
	ctx.closePath();
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.restore();

	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(center, center, center, portion * pi, 0 , false);
	ctx.lineTo(center, center);
	ctx.closePath();
	ctx.fill();
	ctx.restore(); 
}

function moneyFormatter(value) {
	// Makes number into correct format for money
	return Math.ceil(parseFloat(value) * 100) / 100
}

function makeCommas(value) {
	return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}