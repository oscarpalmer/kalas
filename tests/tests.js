var
index = 0;

function equal(a, b) {
  console.log((a === b ? "ok " : "not ok ") + (++ index));
}

console.log("TAP version 13");
console.log("1..2");

kalas.ready(function() {
  var
  ready = document.getElementById("ready"),
  click = document.getElementById("click");

  ready.innerHTML = "ready";
  equal(ready.innerHTML, "ready");

  kalas.on(click, "click", function() {
    click.innerHTML = "clicked";
  });

  kalas.trigger(click, "click");
  equal(click.innerHTML, "clicked");
});