$( window ).on( "load", function() {

console.log( "ready!22222" );


var slide = $(".slide");
var viewHeight = $(window).height();
var sliderInner = $(".slide-base");
var childrenNo = sliderInner.children().length;
sliderInner.height( viewHeight * childrenNo );
$(window).resize(function(){
viewWidth = $(window).height();
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
$(".slide-base .active").removeClass("active");
$(".slide-base .slide").eq(clickedIndex).addClass("active");
}
setHeight();
$(".slider-nav > div").on("click", function(){
setActive($(this));
});
$(window).resize(function(){
setHeight();
});
setTimeout(function(){
$(".slider-top").fadeIn(500);
}, 2000);



});






