doc = this.document

Kalas =
  off: (node, type, fn, capture) ->
    node.removeEventListener type, fn, capture || false
  on: (node, type, fn, capture) ->
    node.addEventListener type, fn, capture || false
  ready: (fn, capture) ->
    doc.addEventListener "DOMContentLoaded", fn, capture || false
  trigger: (node, type) ->
    event = doc.createEvent "Event"
    event.initEvent type, true, true
    node.dispatchEvent event

if typeof module isnt "undefined" and module.exports
  module.exports = Kalas
else if typeof define is "function" and define.amd
  define Kalas
else
  this.kalas = Kalas