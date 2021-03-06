(function(name, context, definition){
  if (typeof module !== "undefined" && module.exports) {
    module.exports = definition();
  } else if (typeof define === "function" && define.amd) {
    define(definition);
  } else {
    context[name] = definition();
  }
})("kalas", this, function(){
  var
  doc = this.document,
  event,
  Kalas;

  /**
   * The Kalas object.
   */
  Kalas = {
    /**
     * Remove an event from a node.
     *
     * @param {Element} node
     * @param {String} type
     * @param {Function} fn
     */
    off: function(node, type, fn, capture) {
      node.removeEventListener(type, fn, capture || false);
    },

    /**
     * Add an event to a node.
     *
     * @param {Element} node
     * @param {String} type
     * @param {Function} fn
     */
    on: function(node, type, fn, capture) {
      node.addEventListener(type, fn, capture || false);
    },

    /**
     * Add a function to run when the DOM is ready.
     *
     * @param {Function} fn
     */
    ready: function(fn, capture) {
      doc.addEventListener("DOMContentLoaded", fn, capture || false);
    },

    /**
     * Trigger an event for a node.
     * @param {Element} node
     * @param {String} type
     */
    trigger: function(node, type) {
      event = doc.createEvent("Event");

      event.initEvent(type, true, true);

      node.dispatchEvent(event);
    }
  };

  return Kalas;
});