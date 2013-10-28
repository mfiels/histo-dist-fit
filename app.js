(function(global) {

  HistoDistFit = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext('2d');
    this.intervalBegin = 0;
    this.intervalSize = 1.0;

    this.data = [];
    this.range = 0;
    this.numIntervals = 0;

    this.setData = function(data) {
      this.data = data.slice(0).sort(function(a, b) {
        return a - b;
      });
      this.range = this.data[this.data.length - 1] - this.data[0];
    };

    this.countIntervals = function() {
      this.numIntervals = Math.ceil(this.range / this.intervalSize);
      
      var counts = [];
      var count = 0;
      var thresh = this.intervalBegin + this.intervalSize;
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i] < thresh) {
          count++;
        } else {
          thresh += this.intervalSize;
          counts.push(count);
          count = 0;
          i--;
        }
      }
      while (counts.length < this.numIntervals) {
        counts.push(0);
      }
      return counts;
    };

    this.render = function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      var intervalCounts = this.countIntervals();
      var pixelsPerInterval = this.canvas.width / this.numIntervals;
      var pixelsPerCount = this.canvas.height / intervalCounts.slice(0).sort(function(a, b) {
        return b - a;
      })[0];
      var x = 0;
      var y = canvas.height;

      this.ctx.fillStyle = 'blue';
      for (var i = 0; i < this.numIntervals; i++) {
        this.ctx.fillRect(
          x, 
          y - pixelsPerCount * intervalCounts[i], 
          pixelsPerInterval, 
          pixelsPerCount * intervalCounts[i]);
        x += pixelsPerInterval;
      }
    };
  };

  global.HistoDistFit = HistoDistFit;

})(this);