// Also used t as name because table is often used as var for the
// the table element
var table = t = {
	// rows selected by user
	selectedList: [false],

	changeSelected(index, value) {
		this.selectedList[index] = Boolean(value);
	},

	getSelected() {
		var arr = [];

		for (var i = 0, len = this.selectedList.length; i < len; i++) {
			if (this.selectedList[i] == true) {
				arr.push(i);
			}
		}

		return arr;
	},

	makeTable(dataArr, headerObj) {
	/* Makes a table to doc by the headerObj (array) containing table heading
	 * to specify order of the headings (optional) and dataObj which is objs 
	 * in array that will contain the actual data.
	 *
	 * If headObj is not provided, then the headings might not be in order
	 * 
	 * Has an event handler for the entire table. Currently, only registers
	 * if user has clicked on the checked input
	 */
		var docFrag = document.createDocumentFragment(),
			selectedArr = [];

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

		// header row
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

		// should throw error if the first element is accessed
		selectedArr[0] = null;

		// rows of the table, Note: i starts at 1
		for (i = 1; i <= dataArr.length; i++) {
			selectedArr[i] = false;

			var tr = document.createElement("tr");
			tr.id = "row" + i;
			var td = document.createElement("td");
			var check = document.createElement("input");
			check.type = "checkbox";
			check.value = i;
			check.id = "check" + i;
			td.appendChild(check);
			tr.appendChild(td);
			for (var j = 0; j < keys.length; j++) {
				var td = document.createElement("td");
				td.textContent = moneyTranslator(dataArr[i - 1][keys[j]], keys[j]);
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}

		function toggleSelected(e) {
			var ele = e.target

			if (ele.type == "checkbox") {
				t.changeSelected(ele.value, ele.checked);
			} else {
				// accesses the live HTMLCollection of child elements
				// inefficient, but only solution I can think of for now
				// and should be okay for now since no other things are running
				try {
					if (ele.children[0].type == "checkbox") {
						var ele = ele.children[0];
						if (ele.checked) {
							ele.checked = false;
						} else {
							ele.checked = true;
						}

						t.changeSelected(ele.value, ele.checked);
					}
				} catch (e) { /*blank*/}
			}
		}

		table.addEventListener("click", toggleSelected );

		toggleSelected = null;

		this.selectedList = selectedArr;

		var test = document.getElementById("table");
		var tableHere = document.getElementById("tableHere");
		if (test === null) {
			tableHere.appendChild(docFrag);
		} else {
			tableHere.replaceChild(docFrag, test);
		}
	}
}