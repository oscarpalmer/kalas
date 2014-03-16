# Kalas

Events for modern browsers.

## Installation

Kalas is available (as `kalas`) via [Bower](http://bower.io), [Jam](http://jamjs.org), and [npm](http://npmjs.org). Kalas also works with [Ender](http://ender.var.require.io).

## Usage

```js
kalas.off(node, name, fn); // Remove an event called 'name' from a node;
                           // the function 'fn' must be identical to the one added.
kalas.on(node,  name, fn); // Add an event called 'name' to a node.

kalas.ready(fn);           // Add a function to run when the DOM is ready.

kalas.trigger(node, name); // Run the function for an event called 'name' on a node.
```

## Todo

- Tests.
- JSDoc.
- Improved documentation.

## License

MIT Licensed; see the [LICENSE file](LICENSE) for more info.