(function() {
  var Kalas, doc;

  doc = this.document;

  Kalas = {
    off: function(node, type, fn, capture) {
      return node.removeEventListener(type, fn, capture || false);
    },
    on: function(node, type, fn, capture) {
      return node.addEventListener(type, fn, capture || false);
    },
    ready: function(fn, capture) {
      return doc.addEventListener("DOMContentLoaded", fn, capture || false);
    },
    trigger: function(node, type) {
      var event;
      event = doc.createEvent("Event");
      event.initEvent(type, true, true);
      return node.dispatchEvent(event);
    }
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Kalas;
  } else if (typeof define === "function" && define.amd) {
    define(Kalas);
  } else {
    this.kalas = Kalas;
  }

}).call(this);
