circle = {

function makeCircle(dataArray) {
  // dataArray -> [{name,amount,color}]
/**
 * Makes circle with canvas that for now colors it in proportion
 *   amount of the total interest and the amount of balance. Also,
 *   it attaches itself to the canvas with id "canvas."
 */
  var canvas = document.getElementById("circleCanvas");
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

  function drawCircle(x,y,radius, dataArray, ctx) {
    var pi = 2 * Math.PI,
      prev = 0;

    var total = getTotal(dataArray);

    each(dataArray, function(dataObj, i) {
      var color = dataObj["color"],
        portion = dataObj["amount"] / total * pi;
      if (i === 0) {
        drawCirclePortion(x, y, radius, 0, portion, color, ctx);
        prev = portion;
      } else if (i === len - 1) {
        drawCirclePortion(x, y, radius, prev, 0, color, ctx);
      } else {
        drawCirclePortion(x, y, radius, prev, pi - portion, color, ctx);
        prev = pi - portion;
      }
    });
    
  }

  function drawCirclePortion(x,y,radius,start,end,color, ctx){
    ctx.save();
    ctx.moveTo(center, center);
    ctx.beginPath();
    ctx.arc(x, y, radius, start, end, false);
    ctx.lineTo(center, center);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function getColors(dataArray) {
    map(dataObj, function(dataObj, i, dataArray) {
      return dataObj["color"];
    }
  }

  function getTotal(dataArray) {
    return map(dataArray, function(dataObj) { 
        return dataObj["amount"]; })
      .reduce(function(a,b) { return a + b;});
  }

  drawCircle(center, center, radius, {"green": startingBalance, "red": totalInterest}, ctx);

  // Insert key
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
};