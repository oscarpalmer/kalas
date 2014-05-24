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
  win         = this,
  doc         = win.document,
  callbacks   = [],
  mouseEvents = /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,
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
    off: function(node, type, fn) {
      if (doc.removeEventListener) {
        node.removeEventListener(type, fn, false);
      } else if (doc.detachEvent) {
        node.detachEvent("on" + type, fn);
      }
    },

    /**
     * Add an event to a node.
     *
     * @param {Element} node
     * @param {String} type
     * @param {Function} fn
     */
    on: function(node, type, fn) {
      if (doc.addEventListener) {
        node.addEventListener(type, fn, false);
      } else if (doc.attachEvent) {
        node.attachEvent("on" + type, fn);
      }
    },

    /**
     * Add a function to run when the DOM is ready.
     *
     * @param {Function} fn
     */
    ready: function(fn) {
      kalas.on(doc, "DOMContentLoaded", fn);
    },

    /**
     * Trigger an event for a node.
     * @param {Element} node
     * @param {String} type
     */
    trigger: function(node, type) {
      var
      event;

      if (doc.dispatchEvent) {
        event = mouseEvents.test(type) ? "MouseEvents" : "HTMLEvents";
        event = doc.createEvent(event);

        event.initEvent(type, true, true);

        node.dispatchEvent(event);
      } else if (doc.fireEvent) {
        event = doc.createEventOBject();

        node.fireEvent("on" + type, event);
      }
    }
  };

  return Kalas;
});