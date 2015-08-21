function display(msg) {
	var msgArea = document.getElementById('msg');

	if (msg !== false) {
		msgArea.textContent += msg;
	} else {
		msgArea.textContent = "";
	}
	
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