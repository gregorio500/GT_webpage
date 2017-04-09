(function(){
		'use strict';
/*$(document).ready(function(){*/
var slide = $(".slide");
var viewHeight = $(window).height();
var sliderInner = $(".slider-inner");
var childrenNo = sliderInner.children().length;
sliderInner.height( viewHeight * childrenNo );
$(window).resize(function(){
viewHeight = $(window).height();
});
function setHeight(){
slide.each(function(){
$(this).height(viewHeight);
$(this).css("top", viewHeight * $(this).index());
});
}
function setActive(element){
var clickedIndex = element.index();
	
var hei = $(".slider").height();

	
$(".slider-nav .active").removeClass("active");
element.addClass("active");
sliderInner.css("transform", "translateY(-" + clickedIndex * viewHeight + "px) translateZ(0)");
$(".slider-inner .active").removeClass("active");
$(".slider-inner .slide").eq(clickedIndex).addClass("active");
}
setHeight();
$(".slider-nav > div").on("click", function(){
setActive($(this));
});
$(window).resize(function(){
setHeight();
});
setTimeout(function(){
$(".slider").fadeIn(500);
}, 2000);
	

var dragging = false;
var veloc = 10;
var amplitude = 30;
var decay = .5;
var time = 0;
var pend = 0;

function update() {
  if (!dragging) {
    pend = amplitude * Math.sin(veloc * time) / Math.exp(decay * time);
    $(".string").css({
      "transform": "rotate(" + pend + "deg)"
    });
    time = time + .01;
  }
  window.requestAnimationFrame(update);
}
update();
	
	
})(jQuery);





