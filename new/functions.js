// function display(msg) {
// 	var msgArea = document.getElementById('msg');

// 	msgArea.textContent = msg;
	
// }

// // setInput & clearInput are used when page is loaded
// // and local storage has prev info, so the inputs are
// // set as they are previously.
// function setInput(id, value) {
// 	var input = document.getElementById(id);

// 	input.value = value;
// }

// function clearInput(id) {
// 	setInput(id, "");
// }

// function addClearEvents() {
// 	function addClearEvent(id) {
// 		// Sets clear event on ele with right click.
// 		var ele = document.getElementById(id);

// 		ele.addEventListener("contextmenu", function(e){
// 			e.preventDefault();
// 			clearInput(id);
// 		});

// 		ele = null;
// 	}

// 	addClearEvent("balanceInput");
// 	addClearEvent("rateInput");
// 	addClearEvent("monthsInput");
// 	addClearEvent("paymentInput");
// }

// function makeCircle() {
// /**
//  * Makes circle with canvas that for now colors it in proportion
//  *   amount of the total interest and the amount of balance. Also,
//  *   it attaches itself to the canvas with id "canvas."
//  */
// 	var canvas = document.getElementById("canvas");
// 	var ctx = canvas.getContext("2d"),
// 		width = 700,
// 		height = 320,
// 		radius = 160,
// 		pi = 2 * Math.PI,
// 		startingBalance = p.getPayObjValue(1, "Starting Balance"),
// 		totalInterest = p.getPayObjValue("end", "Total Interest"),
// 		center = Math.floor(height/2);

// 	canvas.width = width;
// 	canvas.height = height;
// 	portion = startingBalance / (startingBalance + totalInterest);

// 	function drawCircle(x,y,radius, dataObj, ctx) {
// 		var total = 0,
// 			colors = Object.keys(dataObj),
// 			pi = 2 * Math.PI,
// 			prev = "";

// 		each(dataObj, function(value) { total += value; })
		
// 		for (var i = 0, len = colors.length; i < len; i++) {
// 			var color = colors[i],
// 				portion = dataObj[color] / total * pi;
// 			if (i === 0) {
// 				drawCirclePortion(x, y, radius, 0, portion, color, ctx);
// 				prev = portion;
// 			} else if (i === len - 1) {
// 				drawCirclePortion(x, y, radius, prev, 0, color, ctx);
// 			} else {
// 				drawCirclePortion(x, y, radius, prev, pi - portion, color, ctx);
// 				prev = pi - portion;
// 			}
// 		}
// 	}

// 	function drawCirclePortion(x,y,radius,start,end,color, ctx){
// 		ctx.save();
// 		ctx.moveTo(center, center);
// 		ctx.beginPath();
// 		ctx.arc(x, y, radius, start, end, false);
// 		ctx.lineTo(center, center);
// 		ctx.closePath();
// 		ctx.fillStyle = color;
// 		ctx.fill();
// 		ctx.restore();
// 	}

// 	drawCircle(center, center, radius, {"green": startingBalance, "red": totalInterest}, ctx);

// 	// Insert key
// 	ctx.textBaseline = "top";
// 	ctx.fillStyle = "green";
// 	ctx.fillRect(center + radius + 20, height / 15, 20, 20);
// 	ctx.font = "16px serif";
// 	ctx.fillText("Total Balance Paid: $" + makeCommas(String(startingBalance)) , center + radius + 45, height / 15);
// 	ctx.fillStyle = "red";
// 	ctx.fillRect(center + radius + 20, height / 15 + 25, 20, 20);
// 	ctx.font = "16px serif";
// 	ctx.fillText("Total Interest Paid: $" + makeCommas(String(totalInterest)) , center + radius + 45, height / 15 + 25);
// }

function decimalConverter(value) {
  // Makes number into correct format for money
  // Chose ceil, because money esp. money you owe is
  // usually round up.
  return Math.ceil(parseFloat(value) * 100) / 100
}

// function makeCommas(value) {
// 	if (typeof value == 'number') {
// 		value = String(value);
// 	}
// 	return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
// }

// function hideInput(bool) {
// /* For now there are only two input forms, so if status if true
// 	then the inputForm will be hidden and optionsForm will show.
// 	If false, then the opposite.
// */
// 	var input = document.getElementById("inputForm"),
// 		options = document.getElementById("optionsForm");

// 	if (bool) {
// 		input.hidden = true;
// 		options.hidden = false;
// 	} else {
// 		input.hidden = false;
// 		options.hidden = true;
// 	}
// }

function each(obj, callback, context) {
  if (context === undefined)
  	context = window;

  if (Object.prototype.toString.call(obj) == '[object Object]') {
    for (var key in obj) {
      callback.call(context, obj[key], key, obj);
    }
  } else if (Object.prototype.toString.call(obj) == '[object Array]') {
    for (var i = 0, len = obj.length; i < len; i++) {
      callback.call(context, obj[i], i, obj);
    }
  } else { throw "each was given a non-object"; }
}

function map(obj, callback, context) {
  if (context === undefined)
  	context = window;
  var newObj = null;
  if (Object.prototype.toString.call(obj) == '[object Object]') {
  	newObj = {};
  } else if (Object.prototype.toString.call(obj) == '[object Array]') {
  	newObj = [];
  } else { throw "map was given a non-object"; }

  each(obj, function(value, key, obj) {
  	newObj[key] = callback.call(context, value, key, obj);
  }, context);

  return newObj;
}

function copy(obj) {
  return map(obj, function(value) { return value; })
}