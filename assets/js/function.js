$( window ).on( "load", function() {

console.log( "ready!22222" );




	
$(".slider-nav > div").on("click", function(event) {
	
	/*setActive($(this));*/
	var index = $(this).index(); 
	var domElement = $(".slide-base .slide").eq(index);
	
	/*$(".slide-base .active").removeClass("active");*/
	domElement.addClass("active");
	$("html, body").animate({
		scrollTop: domElement.offset().top }, 2500);
	});





});






