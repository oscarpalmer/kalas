(function($){
  var
  kalas = require("kalas");

  $.ender({
    off: function(type, fn) {
      return this.forEach(function(node) {
        kalas.off(node, type, fn);
      });
    },
    on: function(type, fn, off) { // if off is true, the event can be removed.
      return this.forEach(function(node, index, obj) {
        kalas.on(node, type, off ? fn : function(event) {
          fn.call(node, event, node, index, obj);
        });
      });
    },
    trigger: function(name) {
      return this.forEach(function(node) {
        kalas.trigger(node, name);
      });
    }
  }, true);

  $.ender({
    ready: kalas.ready
  });
}(ender));