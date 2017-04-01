var $logo = $(".logo-gt");

$('.logo-gt').on('mouseenter', function(){
	
	function overHandler(e) {
		var rotation = 0;
		var rotation2 = 720;
		var tl = new TimelineMax();	
		
		if(TweenMax.isTweening($logo)) {
			return; } else {
		tl.set($logo, {scale: 1, rotation: 0});
		tl.to($logo, 0.8, {scale: 0.5, rotation: rotation + 720, ease: SlowMo.ease.config(0.7, 0.4) });
		tl.to($logo, 1.2, {scale: 1, rotation: "+=360", ease: Elastic.easeOut.config(0.5, 0.3) });
			};
		
};
	overHandler();
	return false;
});


