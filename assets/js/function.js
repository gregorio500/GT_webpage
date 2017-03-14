$( window ).on( "load", function() {

console.log( "ready!22222" );

function setActive(li){
	var clickedIndex = li.index();
	
	$(".fp-slidesNav .active").removeClass("active");
	li.addClass("active");
	
	$(".slide-base > div").eq(clickedIndex).animate{ scrollTop: $(this).offset().top
            }, 2000);


	
$(".fp-slidesNav > li").on("click", function() {
	setActive($(this));
});



});


