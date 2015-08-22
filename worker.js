postMessage("Got it");

onmessage = function(e) {
	if (e.data) {
		postMessage("I got an object");
		postMessage(e.data);
	} else {
		postMessage("I didn't get an object.");
	}

};
}