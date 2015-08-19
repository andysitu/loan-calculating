function init() {
	var select = document.getElementById("options");

	function test(e) {
		console.log(e);
	}

	select.addEventListener("change", test, false); 

	select = null;
}

window.onload = init;
