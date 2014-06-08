kalas = require "kalas"

ender.ender({
  off: (type, fn) ->
    return this.forEach (node) ->
      kalas.off node, type, fn
  on: (type, fn, capture) ->
    return this.forEach (node) ->
      kalas.on node, type, fn
  trigger: (type) ->
    return this.forEach (node) ->
      kalas.trigger node, type
}, true)

ender.ender({
  ready: kalas.ready
})