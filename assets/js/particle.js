var paths = document.getElementsByClassName("path");
    points = [];//holds our series of x/y values for anchors and control points


for(var i = 0; i<paths.length; i++) {
  points[i] = [];
  
  var data = Snap.path.toCubic(paths[i].getAttribute('d'))
      dataLength = data.length,
      pointsString = data.toString();

  // convert cubic data to GSAP bezier
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

var emitters = document.getElementsByClassName("emitter");

var emitter1 = {
    emitterSize: 45,
    dotPool: [],
    dotIndex: 0,
    dotQuantity: 20,
    dotSizeMax: 8,
    dotSizeMin: 1,
    speed: -1,
    gravity: 0
};

var carrot = {
    emitterSize: 45,
    dotPool: [],
    dotIndex: 0,
    dotQuantity: 20,
    dotSizeMax: 8,
    dotSizeMin: 1,
    speed: -1,
    gravity: 0
};

var emitterObjs = [ emitter1, carrot ];

var tweens = [];

// Set each path
for(var i=0; i<emitters.length; i++) {  
  TweenLite.set(emitters[i], {x:points[i][0].x, y:points[i][0].y})
  //this tween calls the hideDots function when it is done. All dots with class ".emitter"+i will be hidden
  //start both tweens paused
  var tween = TweenMax.to(emitters[i], 8, {bezier:{type:"cubic", values:points[i]}, force3D:true, ease:Power0.easeNone, onComplete:hideDots, onCompleteParams:[".emitter" + i], paused:true});
  
  tweens.push(tween);
  
  TweenLite.set(emitterObjs[i], { width:emitterObjs[i].emitterSize, height:emitterObjs[i].emitterSize, xPercent:-50, yPercent:-50 });
  
  for (var j = emitterObjs[i].dotQuantity - 1; j >= 0; j--) {
    dot = document.createElement("div");
    //give each dot a class based on which emitter it belongs to "dot emitter0" or "dot emitter1"
    dot.className = "dot emitter" + i;
    TweenLite.set(dot, { xPercent:-50, yPercent:-50, force3D:true });
    document.body.appendChild(dot);
    emitterObjs[i].dotPool[j] = dot;
  }
  
  var explosion = new TimelineMax({ repeat: -1 }).call(shootDot, [[emitters[i], emitterObjs[i]]], null, 2 / emitterObjs[i].dotQuantity);
}

$(".startPath").click(function(){
  tweens[0].restart();
  showDots(".emitter0")
})

$(".startPath2").click(function(){
  tweens[1].restart();
  showDots(".emitter1")
})

function shootDot(emit) {
  var elem = emit[0],
      emitter = emit[1];
    
  var angle, length, dot, size, bounds = elem.getBoundingClientRect();

  //create all the dots
    
  dot = emitter.dotPool[emitter.dotIndex++];
  if (emitter.dotIndex === emitter.dotQuantity) emitter.dotIndex = 0;
  size = getRandom(emitter.dotSizeMin, emitter.dotSizeMax);
  angle = Math.random() * Math.PI * 2; //random angle
  //figure out the maximum distance from the center, factoring in the size of the dot (it must never go outside the circle), and then pick a random spot along that length where we'll plot the point. 
  length = Math.random() * (emitter.emitterSize / 2 - size / 2); 
  //place the dot at a random spot within the emitter, and set its size.

  TweenLite.set(dot, {
    opacity:1,
    x:Math.cos(angle) * length + bounds.left + bounds.width / 2,
    y:Math.sin(angle) * length + bounds.top + bounds.height / 2,
    width:size,
    height:size
  });
  //this is where we do the animation...
  TweenLite.to(dot, 1 + Math.random(), {
    opacity:0,
    //if you'd rather not do physics, you could just animate out directly by using the following 2 lines instead of the physics2D:
    //x:Math.cos(angle) * length * 6, 
    //y:Math.sin(angle) * length * 6
  }, 0);
}


function getRandom(min, max) {
  return min + Math.random() * (max - min);
}


function hideDots(className) {
  TweenLite.set(className,  {visibility:"hidden"})
}


function showDots(className) {
  TweenLite.set(className,  {visibility:"visible"})
}

hideDots(".emitter0, .emitter1");



	