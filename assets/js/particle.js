

var snapA = Snap("#svgA");

var pathA = snapA.path("M0.4,0.4c0,360.1,291.9,652,652,652c225.1,0,407.5-182.4,407.5-407.5c0-135-109.5-244.5-244.5-244.5c-90,0-163,73-163,163c0,45,36.5,81.5,81.5,81.5s81.5-36.5,81.5-81.5").attr({
	id: "fibanocci",
	fill: "none",
	strokeWidth: "4",
	stroke: "#419ccc",
	strokeMiterlimit: "10",
	d: "M0.4,0.4c0,360.1,291.9,652,652,652c225.1,0,407.5-182.4,407.5-407.5c0-135-109.5-244.5-244.5-244.5c-90,0-163,73-163,163c0,45,36.5,81.5,81.5,81.5s81.5-36.5,81.5-81.5"
});


var animatePath = pathA.getTotalLength();



var snapEmitter = snapA.circle(40,40,26);
  snapEmitter.attr({
    fill: "#f00959",
    stroke: "#eff5ee",
    strokeWidth: 1
  });

/*var emit = $("#redBox").addClass("emitterDiv");
var emit2 = Snap(emit);*/
$(".startPath").on("click", function() {
	
	setTimeout( function() {
		Snap.animate(0, animatePath, function( value ) {
		   movePoint = pathA.getPointAtLength( value );
		   snapEmitter.attr({ cx: movePoint.x, cy: movePoint.y });
		}, 4000);
	});
	
	/*canvas particle animation*/
	
window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
};

var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var settings = {

    'basic': {

        'emission_rate': 20,
        'min_life': 3,
        'life_range': 24,
        'min_angle': 0,
        'angle_range': 360,
        'min_speed': 25,
        'speed_range': 15,
        'min_size': 1,
        'size_range': 2,
        'colour': '#82c4f5'
    }
};

var Particle = function(x, y, angle, speed, life, size) {

    /* the particle's position */

    this.pos = {

        x: x || 0,
        y: y || 0
    };

    /* set specified or default values */

    this.speed = speed || 5;

    this.life = life || 1;

    this.size = size || 2;

    this.lived = 0;

    /* the particle's velocity */

    var radians = angle * Math.PI / 180;

    this.vel = {

        x: Math.cos(radians) * speed,
        y: -Math.sin(radians) * speed
    };
};

var Emitter = function(x, y, settings) {

    /* the emitter's position */

    this.pos = {

        x: x,
        y: y
    };

    /* set specified values */

    this.settings = settings;

    /* How often the emitter needs to create a particle in milliseconds */

    this.emission_delay = 1000 / settings.emission_rate;

    /* we'll get to these later */

    this.last_update = 0;

    this.last_emission = 0;

    /* the emitter's particle objects */

    this.particles = [];
};

Emitter.prototype.update = function() {

    /* set the last_update variable to now if it's the first update */

    if (!this.last_update) {

        this.last_update = Date.now();

        return;
    }

    /* get the current time */

    var time = Date.now();

    /* work out the milliseconds since the last update */

    var dt = time - this.last_update;

    /* add them to the milliseconds since the last particle emission */

    this.last_emission += dt;

    /* set last_update to now */

    this.last_update = time;

    /* check if we need to emit a new particle */

    if (this.last_emission > this.emission_delay) {

        /* find out how many particles we need to emit */

        var i = Math.floor(this.last_emission / this.emission_delay);

        /* subtract the appropriate amount of milliseconds from last_emission */

        this.last_emission -= i * this.emission_delay;

        while (i--) {

            /* calculate the particle's properties based on the emitter's settings */

            this.particles.push(
                new Particle(
                    0,
                    0,
                    this.settings.min_angle + Math.random() * this.settings.angle_range,
                    this.settings.min_speed + Math.random() * this.settings.speed_range,
                    this.settings.min_life + Math.random() * this.settings.life_range,
                    this.settings.min_size + Math.random() * this.settings.size_range
                )
            );
        }
    }

    /* convert dt to seconds */

    dt /= 1000;

    /* loop through the existing particles */

    var i = this.particles.length;

    while (i--) {

        var particle = this.particles[i];

        /* skip if the particle is dead */

        if (particle.dead) {
            
            /* remove the particle from the array */
            this.particles.splice(i, 1);
            
            continue;   
        }

        /* add the seconds passed to the particle's life */

        particle.lived += dt;

        /* check if the particle should be dead */

        if (particle.lived >= particle.life) {

            particle.dead = true;

            continue;
        }

        /* calculate the particle's new position based on the seconds passed */

        particle.pos.x += particle.vel.x * dt;
        particle.pos.y += particle.vel.y * dt;

        /* draw the particle */

        ctx.fillStyle = this.settings.colour;

        var x = this.pos.x + particle.pos.x;
        var y = this.pos.y + particle.pos.y;

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }
};

var emitter = new Emitter(canvas.width / 2, canvas.height / 2, settings.basic);

function loop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    emitter.update();

    requestAnimFrame(loop);
}

loop();


});





   var points = [];//holds our series of x/y values for anchors and control points


for(var i = 0; i<pathA.node.getAttribute('d').length; i++) {
  points[i] = [];
  
  var data = Snap.path.toCubic(pathA.node.getAttribute('d'));

  var dataLength = data.length;
  var pointsString = data.toString();

	
	//convert data cubic to gsap
	
for (var j = 0; j < dataLength; j++) {
    var seg = data[j];
    if (seg[0] === "M") { // move (starts the path)
      var point = {};
      point.x = seg[1];
      point.y = seg[2];
      points[i].push(point);
    } else { // seg[0] === "C" (Snap.path.toCubic should return only curves after first point)
      for (var k = 1; k < 6; k+=2) {
        var point = {};
        point.x = seg[k];
        point.y = seg[k+1];
        points[i].push(point);
      }
    }
  }  
}

/*
var tweens = [];
// Set each path
var emitters = $(".emitterDiv");
for(var i=0; i<18; i++) { 
	  TweenLite.set(emitters, {x:points[0][0].x, y:points[0][0].y});
	  //this tween calls the hideDots function when it is done. All dots with class ".emitter"+i will be hidden
	  //start both tweens paused
	  var trackX = points[0][i].x;
	  var trackY = points[0][i].y;

	 tweens.push(trackX);
	 tweens.push(trackY);	
};
var tweens2 = points[0];
 var tween = TweenMax.to(emitters, 8, {bezier:tweens2, type:'soft', curviness:1.25, autoRotate:true, ease:Power0.easeNone});
//make the tween
//var tween = TweenMax.to("#redBox", 3, {bezier:{type:"cubic", values:points}, //force3D:true, ease:Power0.easeNone});

$(".startPath").on("click", function(){
  tween.restart();
});
*/

