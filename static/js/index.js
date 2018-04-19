// 左侧导航 栏

$('.left-nav ul li').on('click', function(e) {
	e.preventDefault();
	$(this).addClass('active');
	$(this).siblings().removeClass('active');
	var _url = $(this).data('url');
	//console.log(_url);
	router(_url);
})

//var letObj = document.getElementById('left-nav');
//var startY, endY;
//
//letObj.addEventListener('touchmove', function(ev) {
//	if(event.targetTouches.length == 1) {　　　　
//		event.preventDefault(); // 阻止浏览器默认事件，重要 
//		var touch = event.targetTouches[0];
//		// 把元素放在手指所在的位置
//		startY = touch.pageY;
//		
//	}
//});

function touch(startY, endY) {

}

$('#mali').load("./home/index.html");

//  自定义 路由

function router(url) {

	$('#mali').load(url);
}