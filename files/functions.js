/**
 * Function List: setInput, clearInput, testForNumber,
 *    decimalConverter, each, map, copy, every, some
 */

function setInput(id, value) {
// sets the individual input by id.
	var input = document.getElementById(id);
	input.value = value;
}

function testForNumber(value) {
// Test if a string contains a useable number.
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
  // Takes in number and returns string with commas added.
  // Converts to 2 decimal places. commas doesn't.
	value = String(decimalConverter(value).toFixed(2));
	return commas(value);
}

function commas(value) {
  // Takes in number and returns string with commas added.
  return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function each(obj, callback, context) {
// each function for both objects & arrays.
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
// map function for both objects & arrays.
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
// Returns n object/ array copy.
  return map(obj, function(value) { return value; })
}

// Every and some are planned to be used later.
function every(obj, callback, context) {
// every function for both objects & arrays.
  if (context === undefined)
    context = window;

  for (var key in obj) {
    if (!callback.call(context, obj[key], key, obj))
      return false;
  }
  return true;
}
function some(obj, callback, context) {
// some function for both objects & arrays.
  if (context === undefined)
    context = window;

  for (var key in obj) {
    if (callback.call(context, obj[key], key, obj))
      return true;
  }
  return false;
}

function getParameters(func) {
// Returns an array containing strings of the
//  parameter names of a function.
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

function getNumParameters(func) {
// Returns the number of paramters of a function.
  return getParameters(func).length;
}

function range(start, end) {
// Range function in python. Returns array of
// the range from start to end - 1.
  var array = [];
  for (var i = start; i < end; i++)
    array.push(i);
  return array;
}

function run(callback, end, start, increment, context) {
// Runs a function x number of times (end).
// Additional parameters changes the for loop.
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

function addHandler(type, event, handler) {
// Adds an event handler to document by type either
//  being the id or the element.
  if (typeof type == 'string') { // element Id
    var element = document.getElementById(type);
    element.addEventListener(event, handler);
  } else if (typeof type == 'object') { // element node
    type.addEventListener(event, handler);
  }
}

function repeatString(string, times) {
// Returns a string repeated x number of times.
  var newString = '';
  run(function() {
    newString += string;
  }, times);

  return newString;
}

function numberAndDot(value) {
// input (value) should be a string.
// output: number containing numbers & .
  console.log(value);
  return value.split("").filter(function(value){
      if (parseInt(value) >= 0 || value == ".")
        return value;
  }).join("");
}