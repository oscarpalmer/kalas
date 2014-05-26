var
index = 0;

function equal(a, b) {
  console.log((a === b ? "ok " : "not ok ") + (++ index));
}

console.log("TAP version 13");
console.log("1..3");

kalas.ready(function() {
  var
  click  = document.getElementById("click"),
  ready  = document.getElementById("ready"),
  number = 0;

  function callback() {
    click.innerHTML = number;
    number++;
  }

  // Test ready function
  ready.innerHTML = "ready";
  equal(ready.innerHTML, "ready");

  // Test on and click functions
  kalas.on(click, "click", callback);
  kalas.trigger(click, "click");
  equal(click.innerHTML, "0");

  // Test off function
  kalas.off(click, "click", callback);
  kalas.trigger(click, "click");
  equal(click.innerHTML, "0");
});