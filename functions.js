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

function makeCircle() {
/**
 * Makes circle with canvas that for now colors it in proportion
 *   amount of the total interest and the amount of balance. Also,
 *   it attaches itself to the canvas with id "canvas."
 */
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d"),
		width = 700,
		height = 320,
		radius = 160,
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
	ctx.arc(center, center, radius, 0, portion * pi, false);
	ctx.lineTo(center, center);
	ctx.closePath();
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.restore();

	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(center, center, radius, portion * pi, 0 , false);
	ctx.lineTo(center, center);
	ctx.closePath();
	ctx.fill();
	ctx.restore(); 

	ctx.textBaseline = "top";
	ctx.fillStyle = "green";
	ctx.fillRect(center + radius + 20, height / 15, 20, 20);
	ctx.font = "16px serif";
	ctx.fillText("Total Balance Paid: $" + makeCommas(String(startingBalance)) , center + radius + 45, height / 15);
	ctx.fillStyle = "red";
	ctx.fillRect(center + radius + 20, height / 15 + 25, 20, 20);
	ctx.font = "16px serif";
	ctx.fillText("Total Interest Paid: $" + makeCommas(String(totalInterest)) , center + radius + 45, height / 15 + 25);
}

function moneyFormatter(value) {
	// Makes number into correct format for money
	return Math.ceil(parseFloat(value) * 100) / 100
}

function makeCommas(value) {
	return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

function hideInput(bool) {
/* For now there are only two input forms, so if status if true
	then the inputForm will be hidden. If false, that will show,
	but optionsForm will be hidden.
*/
	var input = document.getElementById("inputForm"),
		options = document.getElementById("optionsForm");

	if (bool) {
		input.hidden = true;
		options.hidden = false;
	} else {
		input.hidden = false;
		options.hidden = true;
	}
}