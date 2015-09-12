/**
 * Function List: setInput, clearInput, testForNumber,
 *    decimalConverter, each, map, copy, every, some
 */

// function display(msg) {
// 	var msgArea = document.getElementById('msg');

// 	msgArea.textContent = msg;
	
// }

function setInput(id, value) {
	var input = document.getElementById(id);
	input.value = value;
}

function testForNumber(value) {
  if (parseFloat(value) > 0)
    return true;
  else
    return false;
}

function decimalConverter(value) {
  // Makes number into correct format for money
  if (value == '')
  	return value;
  if (typeof value == 'string' || typeof value == 'number')
  	return Math.round(parseFloat(value) * 100) / 100;
}

function makeCommas(value) {
	if (typeof value == 'number') {
		value = String(value);
	}
  value = String(parseFloat(value).toFixed(2));
	return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

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
    obj.forEach(callback, context);
  } else { throw "each was given a non-object"; }
}

function map(obj, callback, context) {
  if (context === undefined)
  	context = window;
  var newObj = null;
  if (Object.prototype.toString.call(obj) == '[object Object]') {
  	newObj = {};
    each(obj, function(value, key, obj) {
      newObj[key] = callback.call(context, value, key, obj);
    }, context);

    return newObj;
  } else if (Object.prototype.toString.call(obj) == '[object Array]') {
  	return obj.map(callback, context);
  } else { throw "map was given a non-object"; }

 
}

function copy(obj) {
  return map(obj, function(value) { return value; })
}

function every(obj, callback, context) {
  if (context === undefined)
    context = window;

  for (var key in obj) {
    if (!callback.call(context, obj[key], key, obj))
      return false;
  }
  return true;
}

function some(obj, callback, context) {
  if (context === undefined)
    context = window;

  for (var key in obj) {
    if (callback.call(context, obj[key], key, obj))
      return true;
  }
  return false;
}

function getArguments(func) {
  var functionString = func.toString();
  if (/function\s*\(.*\)/.test(functionString)) {
    var parameter = /function\s*\(([\w,\s]+)\)/g.exec(functionString);
    if (parameter) {
      return parameter[1].replace(/\s/g, "").split(",");
    } else {
      return [];
    }
  } else {
    return false;
  }
}

function getNumArguments(func) {
  return getArguments(func).length;
}

function range(start, end) {
  var array = [];
  for (var i = start; i < end; i++)
    array.push(i);
  return array;
}

function run(callback, end, start, increment, context) {
  if (start === undefined)
    start = 0;
  if (increment === undefined)
    increment = 1;

  if (increment >= 1 && start <= end) {
    for (var i = start; i < end; i += increment) {
      callback.call(context, i);
    }
  } else if (increment <= -1 && start >= end) {
    for (var i = start; i > end; i += increment) {
      callback.call(context, i);
    }
  } else { throw "Error with run"; }
}

function addHandler(id, event, handler) {
  var element = document.getElementById(id);
  element.addEventListener(event, handler);
}