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
		width = 600,
		height = 400,
		radius = 200
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

}

function moneyFormatter(value) {
	// Makes number into correct format for money
	return Math.ceil(parseFloat(value) * 100) / 100
}

function makeCommas(value) {
	return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}