

// 左侧导航 栏

$('.left-nav ul li').on('click',function(e){
	e.preventDefault();
	$(this).addClass('active');
	$(this).siblings().removeClass('active');
	var _url = $(this).data('url');
	//console.log(_url);
	router(_url);
})


$('#mali').load("./home/index.html");


//  自定义 路由

function router(url){
	$('#mali').load(url);
}