$(document).ready(function(){
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
});





