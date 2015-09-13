var circle = {
  makeCircle: function(paymentSystem) {
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
      center = Math.floor(height/2);
    var dataArray = this.makeDataArray(paymentSystem);

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    this.drawCircle(center, center, center, radius, dataArray, ctx);
    this.fillText(ctx, dataArray, center, radius, height);
  },
  drawCircle: function(x, y, center, radius, dataArray, ctx) {
    var pi = 2 * Math.PI,
      prev = 0,
      total = this.getTotal(dataArray);

    each(dataArray, function(dataObj, i, dataArray) {
      var color = dataObj["color"],
        portion = dataObj["amount"] / total * pi;

      if (i === 0) {
        this.drawCirclePortion(x, y, center, radius, 0, portion, color, ctx);
        prev = portion;
      } else if (i === dataArray.length - 1) {
        this.drawCirclePortion(x, y, center, radius, prev, 0, color, ctx);
      } else {
        this.drawCirclePortion(x, y, center, radius, prev, pi - portion, color, ctx);
        prev = pi - portion;
      }
    }, this);
    
  },

  drawCirclePortion: function(x, y, center, radius, start, end, color, ctx){
    ctx.save();
    ctx.moveTo(center, center);
    ctx.beginPath();
    ctx.arc(x, y, radius, start, end, false);
    ctx.lineTo(center, center);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  },

  getTotal: function(dataArray) {
    return map(dataArray, function(dataObj) { 
        return dataObj["amount"]; })
      .reduce(function(a,b) { return a + b;});
  },

  fillText: function(ctx, dataArray, center, radius, height) {
    ctx.textBaseline = "top";
    each(dataArray, function(dataObj, i, dataArray) {
      ctx.save();
      ctx.fillStyle = dataObj["color"];
      ctx.fillRect(center + radius + 20, height / 15 + 25 * i, 20, 20);
      ctx.font = "16px serif";
      ctx.fillText(dataObj["name"] + ": $" + makeCommas(dataObj["amount"]) , center + radius + 45, height / 15 + 25 * i);
      ctx.restore()
    }, this);
  },
  makeDataArray(paymentSystem) {
    var totalInterest = paymentSystem.getTotalInterest(),
      balance = paymentSystem.getBalance(1);

    return [{name:"Balance", amount: balance, color: "green"},
            {name:"Total Interest", amount: totalInterest, color: "red"}]
  },
};