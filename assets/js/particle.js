$bezierData = MorphSVGPlugin.pathDataToBezier("#thePath", {relative:true});
TweenMax.set("#thePath", {stroke:"red", strokeWidth:5, fill: "none"});

TweenMax.set([".emitter", "#em-line"], {xPercent:-50, yPercent:-50});

TweenMax.to($(".emitter"), 5, {bezier: {values:$bezierData, type:"cubic"}, ease:Quad.easeNone, repeat:-1, yoyo:true});

/*var snapA = Snap(".line");
var pathA = snapA.path("M0.4,0.4c0,360.1,291.9,652,652,652c225.1,0,407.5-182.4,407.5-407.5c0-135-109.5-244.5-244.5-244.5c-90,0-163,73-163,163c0,45,36.5,81.5,81.5,81.5s81.5-36.5,81.5-81.5").attr({
	id: "fibanocci",
	fill: "none",
	strokeWidth: "4",
	stroke: "#419ccc",
	strokeMiterlimit: "10",
});


var animatePath = pathA.getTotalLength();
var movePoint = pathA.getPointAtLength( animatePath );
var xx = movePoint.x;
var yy = movePoint.y;
var gsap = {x: movePoint.x, y:movePoint.y};
TweenMax.to($('.emitter'),20, {values:gsap});*/
/*var snapEmitter = snapA.circle(40,40,26);
  snapEmitter.attr({
    fill: "#f00959",
    stroke: "#eff5ee",
    strokeWidth: 1
  });

$("#startPoint").on("click", function() {
	
	setTimeout( function() {
		Snap.animate(0, animatePath, function( value ) {
		   var movePoint = pathA.getPointAtLength( value );
		   snapEmitter.attr({ cx: movePoint.x, cy: movePoint.y });
		}, 7000);
	});
});*/

/*first option where points work

var data = Snap.path.toCubic(document.getElementById("path").getAttribute('d'));
var dataLength = data.length;
 var points = []; //holds our series of x/y values for anchors and control points,
  pointsString = data.toString();

// convert cubic data to GSAP bezier
for (var i = 0; i < dataLength; i++) {
  var seg = data[i];
  if (seg[0] === "M") { // move (starts the path)
    var point = {};
    point.x = seg[1];
    point.y = seg[2];
    points.push(point);
  } else { // seg[0] === "C" (Snap.path.toCubic should return only curves after first point)
    for (var j = 1; j < 6; j += 2) {
      var point = {};
      point.x = seg[j];
      point.y = seg[j + 1];
      points.push(point);
    }
  }
}*/




/*next option which should works*/


/*
var path = convertToCubicBezier($('path')[0]);
$(window).resize(Resize);
  function Resize() {
    var $window = $(window) ,
        maxWidth  = $('.emitter').width() ,
        width = $window.width(),
        scale;
    if( width >= maxWidth ) { return } // U can remove this line if you want always container fit to screen 
    TweenMax.set('.emitter',{scale: Math.min(width/maxWidth),transformOrigin:"0% 0%"});
};
Resize(); 

$("#startPoint").on("click", function() { 	  
    TweenMax.set(".emitter",{x:0,y:0});
	TweenMax.set('.emitter',{xPercent:-150,yPercent:-100});
	TweenMax.set('.emitter',{svgOrigin:"500, 300"});
	
	var t = TweenMax.to($('.emitter'),20,{bezier:{type:'cubic', values:path}});
	});
*/












//draw the fib line
//start
/*var orig = document.querySelector('path'), length, timer;
var obj = {length:10,
           pathLength:orig.getTotalLength()};
orig.style.stroke = '#419ccc';


var tl = new TimelineMax;
var t1 = tl.to(obj, 7, {length:obj.pathLength, onUpdate:drawLine, ease:Linear.easeNone});
 

function drawLine() {
	orig.style.strokeDasharray =
   [obj.length,obj.pathLength].join(' '); 
}
$(".who").click(function() {
		t1.restart();
});*/


// end



/*the new*/

/*jQuery(document).ready(function(){
		//calc_positions(80);
   

		var percent = 0;
		var move_objects = function(){
			calc_positions(percent);
			percent += 0.035;
			if(percent < 100){
				setTimeout(move_objects, 5);
			}
				
		}

		move_objects();
	

});







function calc_positions(percent_down_the_line){
		var $svg = jQuery('.line-cont .line');
		var $path = $svg.find('path');

		var percent = percent_down_the_line / 100;

		//get the viewbox
		var box = $svg[0].getAttribute('viewBox');

		box = box.split(/\s+|,/);


		//setup path
		var p = $path[0];
		var $object = jQuery('.line-cont .emitter');
		var len = p.getTotalLength();

		//center of the object
		var object_half_width_percent = ($object.width() / 2) / $svg.width() * 100;
		var object_height_percent = ($object.height() / 2 ) / $svg.height() * 100;

		var starting_point = p.getPointAtLength(percent*len);
		var left = (((starting_point.x  / box[2] ) * 100 ) - object_half_width_percent);
		var top = (((starting_point.y  / box[3] ) * 100 ) - object_height_percent);
		

		$object.css({ left: left + '%', top: top + '%' })

		//find the location on the line thats the height of the object down the line
		//need to find what percent the height of the box is relative to the viewbox
		var object_height_svg_percent =  $object.height() / $svg.height();

		//find the height of the box if it was in the viewbox
		var object_height_in_viewbox =  box[3] * object_height_svg_percent;

		//find the percent of the line the height of half the box is
		var offset_percent_on_line = (object_height_in_viewbox / 2)  / len;


		 //angle calculations
		p[0] = p.getPointAtLength((percent + offset_percent_on_line)*len);
		p[1] = p.getPointAtLength((percent - offset_percent_on_line)*len);

		//find what percent the x and y cord is in the container div
		//find percent
		viewbox_p0_y_percent = (p[0].y / box[3]);
		viewbox_p0_x_percent = (p[0].x / box[2]);

		viewbox_p1_y_percent = (p[1].y / box[3]);
		viewbox_p1_x_percent = (p[1].x / box[2]);


		container_p0_y_pixels = $svg.height() * viewbox_p0_y_percent;
		container_p0_x_pixels = $svg.width() * viewbox_p0_x_percent;

		container_p1_y_pixels = $svg.height() * viewbox_p1_y_percent;
		container_p1_x_pixels = $svg.width() * viewbox_p1_x_percent;



		/*jQuery('.top-dot').css({ top:container_p0_y_pixels, left:container_p0_x_pixels});
		jQuery('.bottom-dot').css({ top:container_p1_y_pixels, left:container_p1_x_pixels});*/


		//angle = Math.atan2(p[1].y-p[0].y,p[1].x-p[0].x)*180 / Math.PI;
		/*angle = Math.atan2(container_p1_y_pixels-container_p0_y_pixels,container_p1_x_pixels-container_p0_x_pixels)*180 / Math.PI;
		
	
	$(".who").click(function() {
		var t = TweenMax.to($object, 3, { css: {rotation: angle + 90}, ease:Linear.easeNone });
		t.restart();
});
} */


		



	  
