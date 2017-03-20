var dragging = false;
var veloc = 10;
var amplitude = 30;
var decay = .5;
var time = 0;
var pend = 0;

function update() {
  if (!dragging) {
    pend = amplitude * Math.sin(veloc * time) / Math.exp(decay * time);
    $(".strin").css({
      "transform": "rotate(" + pend + "deg)"
    });
    time = time + .01;
  }
  window.requestAnimationFrame(update);
}
update();

$("#reset").on("click", function(e) {
  time = 0;
})