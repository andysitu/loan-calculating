var circle = {
  makeCircle: function(paymentSystem) {
  /* Sets the canvas properties and creates ctx.
   * Then, handles drawing the pie chart representing 
   *  the data and the text.
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
  // Draws the circle by running drawCirclePortion to draw part by part.

  // Reads from dataArray created getTotal. Data Array is an array
  //  containing objects of what properties to have.
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
  // Draws a portion of the pie chart.
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
  // Gets the total amount of the entire data array.
    return map(dataArray, function(dataObj) { 
        return dataObj["amount"]; })
      .reduce(function(a,b) { return a + b;});
  },

  fillText: function(ctx, dataArray, center, radius, height) {
  // Fills in text representing amounts of each category.
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
  // Data array contains info as described and will be read
  //  by other methods in this object.
    var totalInterest = paymentSystem.getTotalInterest(),
      balance = paymentSystem.getBalance(1);

    return [{name:"Balance", amount: balance, color: "green"},
            {name:"Total Interest", amount: totalInterest, color: "red"}]
  },
};