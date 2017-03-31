

var snapA = Snap("#svgA");

var pathA = snapA.path("M738.5,249.5c45.01,0,81.5-36.49,81.5-81.5 M657,168c0,45.01,36.49,81.5,81.5,81.5 M820,5c-90.02,0-163,72.98-163,163 M1064.5,249.5C1064.5,114.47,955.03,5,820,5 M657,657c225.06,0,407.5-182.44,407.5-407.5 M5,5c0,360.09,291.91,652,652,652").attr({
	id: "fibanocci",
	fill: "none",
	strokeWidth: "4",
	stroke: "#419ccc",
	strokeMiterlimit: "10"
});


var animatePath = pathA.getTotalLength();



var emitter = snapB.circle(26,26,16);
  CircleB.attr({
    fill: "#f00959",
    stroke: "#fff",
    strokeWidth: 2
  });


	