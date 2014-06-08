(function() {
  var kalas;

  kalas = require("kalas");

  ender.ender({
    off: function(type, fn) {
      return this.forEach(function(node) {
        return kalas.off(node, type, fn);
      });
    },
    on: function(type, fn, capture) {
      return this.forEach(function(node) {
        return kalas.on(node, type, fn);
      });
    },
    trigger: function(type) {
      return this.forEach(function(node) {
        return kalas.trigger(node, type);
      });
    }
  }, true);

  ender.ender({
    ready: kalas.ready
  });

}).call(this);
