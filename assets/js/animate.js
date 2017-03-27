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


$('.logo-gt').on('mouseover', function(){
	
	function overHandler(e) {
		var rotation = 0;
		var rotation2 = 720;
		var tween1 = true;
		var tween2 = true;
		var tl = new TimelineMax();	
		
		tl.set($logo, {scale: 1, rotation: 0});
		console.log("primary " + tween1);
		if(tl.isActive() === true) {
			console.log("if it is false "+ tween1);
			return tl.resume();
		} else {
		tween1 = tl.to($logo, 2, {scale: 0.7, rotation: rotation + 720 });
		/*tl.set($logo, {rotation: 0});*/
		tween2 = tl.to($logo, 3, {scale: 1, rotation: rotation2 + 360});
		/*tl.set($logo, {scale: 1, rotation: 0});*/ 
			console.log("after else" + tween1);
		
		}
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