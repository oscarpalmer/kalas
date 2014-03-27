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
  docElement  = doc.documentElement,
  mouseEvents = /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,
  readyFuncs  = [],
  ready,
  Kalas;

  /**
   * preventDefault polyfill for IE.
   */
  if (!win.Event.prototype.preventDefault) {
    win.Event.prototype.preventDefault = function() {
      this.returnValue = false;
    };
  }

  /**
   * stopPropagation polyfill for IE.
   */
  if (!win.Event.prototype.stopPropagation) {
    win.Event.prototype.stopPropagation = function() {
      this.cancelBubble = true;
    };
  }

  /**
   * Event handler for when the DOM is ready.
   */
  ready = (function(){
    function ready(fn) {
      readyFuncs.push(fn);

      Kalas.on(doc, "DOMContentLoaded", ready.readyCallback);
      Kalas.on(doc, "onreadystatechange", ready.readyCallback);
      Kalas.on(win, "load", ready.readyCallback);
    }

    ready.isReady = false;

    ready.readyCallback = function(event) {
      var
      index,
      langd,
      node;

      if (ready.isReady || event.type === "onreadystatechange" && doc.onreadystatechange !== "complete") {
        return;
      }

      ready.isReady = true;

      node  = event.type === "load" ? win : doc;

      for (index = 0, langd = readyFuncs.length; index < langd; index++) {
        readyFuncs[index].call(node, event);
      }
    };

    return ready;
  }());

  /**
   * The Kalas object.
   */
  Kalas = {
    /**
     * Remove an event from a node.
     */
    off: function(node, type, fn) {
      if (docElement.removeEventListener) {
        node.removeEventListener(type, fn, false);
      } else if (docElement.detachEvent) {
        node.detachEvent("on" + type, node[type + fn]);

        try {
          delete node[type + fn];
        } catch (error) {
          node[type + fn] = undefined;
        }
      }
    },

    /**
     * Add an event to a node.
     */
    on: function(node, type, fn) {
      var
      event;

      if (docElement.addEventListener) {
        node.addEventListener(type, fn, false);
      } else if (docElement.attachEvent) {
        node[type + fn] = function() {
          event = win.event;
          event.target = event.target || event.srcElement;

          if (fn.handleEvent) {
            fn.handleEvent.call(node, event);
          } else {
            fn.call(node, event);
          }
        };

        node.attachEvent("on" + type, node[type + fn]);
      }
    },

    /**
     * Add a function to run when the DOM is ready.
     */
    ready: function(fn) {
      ready(fn);
    },

    /**
     * Trigger an event for a node.
     */
    trigger: function(node, name) {
      var
      event,
      type;

      if (doc.createEventObject) {
        event = doc.createEventObject();
        node.fireEvent("on" + name, event);
      } else {
        if (doc.createEvent) {
          type  = mouseEvents.test(name) ? "MouseEvents" : "HTMLEvents";
          event = doc.createEvent(type);
          event.initEvent(name, true, true);
        } else {
          event = new Event(name);
        }

        node.dispatchEvent(event);
      }
    }
  };

  return Kalas;
});