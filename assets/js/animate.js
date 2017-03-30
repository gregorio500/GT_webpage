var $logo = $(".logo-gt");




//$(".logo-gt").on('click mouseover', function() { 
//	
//	var rotation = 0;
//	var tween1;
//	var tween2;
//	var tl = new TimelineMax();
//	
//	/*tl.set($logo, {scale: 1, rotation: 0});*/
//	
//	if(tween1 && tween2) {
//		return 0;
//	} else {
//	tween1 = tl.to($logo, 0.4, {scale: 0.1, rotation: rotation + 360 });
//	/*tl.set($logo, {rotation: 0});*/
//	tween2 = tl.to($logo, 0.5, {scale: 1, rotation: 360});
//	tl.set($logo, {scale: 1, rotation: 0});
//	};
//	
//});


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


//document.getElementById("thing").addEventListener('mouseover', btnHandler, false);
//var rotation = 0;
//var tween;
//function btnHandler(e)
//{
//  if (tween && tween.isActive()) return;
//  tween = TweenMax.to("#thing", 2, {rotation: rotation-=360});
//}