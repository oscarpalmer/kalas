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
  addEvent    = "addEventListener",
  remEvent    = "removeEventListener",
  attEvent    = "attachEvent",
  detEvent    = "detachEvent",
  createEvent = "createEvent",
  createEvObj = "createEventObject",
  mouseEvents = /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,
  onready     = "onreadystatechange",
  readyCall   = "readyCallback",
  readyFuncs  = [],
  domReady,
  Kalas;

  /**
   * preventDefault polyfill for IE.
   */
  if (!Event.prototype.preventDefault) {
    Event.prototype.preventDefault = function() {
      this.returnValue = false;
    };
  }

  /**
   * stopPropagation polyfill for IE.
   */
  if (!Event.prototype.stopPropagation) {
    Event.prototype.stopPropagation = function() {
      this.cancelBubble = true;
    };
  }

  /**
   * Main event handler; delegates to eventOff and eventOn.
   */
  function eventHandler(node, type, fn, add) {
    var
    callback = add ? eventOn : eventOff,
    index;

    if (typeof type === "string") {
      callback(node, type, fn);
    } else if (type === Object(type)) {
      for (index in type) {
        if (type.hasOwnProperty(index)) {
          callback(node, index, type[index]);
        }
      }
    }
  }

  /**
   * Remove an event from a node.
   */
  function eventOff(node, type, fn) {
    if (node[remEvent]) {
      node[remEvent](type, fn, false);
    } else if (node[detEvent]) {
      node[detEvent]("on" + type, node[type + fn]);

      try {
        delete node[type + fn];
      } catch (error) {
        node[type + fn] = undefined;
      }
    }
  }

  /**
   * Add an event to a node.
   */
  function eventOn(node, type, fn) {
    if (node[addEvent]) {
      node[addEvent](type, fn, false);
    } else if (node[attEvent]) {
      var
      event;

      node[type + fn] = function() {
        event = win.event;
        event.target = event.target || event.srcElement;

        if (fn.handleEvent) {
          fn.handleEvent.call(node, event);
        } else {
          fn.call(node, event);
        }
      };

      node[attEvent]("on" + type, node[type + fn]);
    }
  }

  /**
   * Event handler for when the DOM is ready.
   */
  domReady = (function(){
    function domReady(fn) {
      readyFuncs.push(fn);

      Kalas.on(doc, "DOMContentLoaded", domReady[readyCall]);
      Kalas.on(doc, onready, domReady[readyCall]);
      Kalas.on(win, "load", domReady[readyCall]);
    }

    domReady.isReady = false;

    domReady[readyCall] = function(event) {
      var
      index,
      langd,
      node;

      if (domReady.isReady || event.type === onready && doc.readyState !== "complete") {
        return;
      }

      domReady.isReady = true;

      index = 0;
      langd = readyFuncs.length;
      node  = event.type === "load" ? win : doc;

      for (; index < langd; index++) {
        readyFuncs[index].call(node, event);
      }
    };

    return domReady;
  }());

  Kalas = {
    /**
     * Remove an event from a node.
     */
    off: function(node, name, fn) {
      eventHandler(node, name, fn, false);
    },

    /**
     * Add an event to a node.
     */
    on: function(node, name, fn) {
      eventHandler(node, name, fn, true);
    },

    /**
     * Add a function to run when the DOM is ready.
     */
    ready: function(fn) {
      domReady(fn);
    },

    /**
     * Trigger an event for a node.
     */
    trigger: function(node, name) {
      var
      event,
      type;

      if (doc[createEvObj]) {
        event = doc[createEvObj]();
        node.fireEvent("on" + name, event);
      } else {
        if (doc[createEvent]) {
          type  = mouseEvents.test(name) ? "MouseEvents" : "HTMLEvents";
          event = doc[createEvent](type);
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