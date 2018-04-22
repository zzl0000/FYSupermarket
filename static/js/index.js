// 左侧导航 栏


setInit();
function setInit(){
    var dutyType = sessionStorage.getItem('dutyType');
    var letNavhtml = '';
    if (dutyType == 1) {
        letNavhtml += '<ul>';
        letNavhtml += '<li  data-url=\'cashierSystem/index.html\'>';
        letNavhtml += '<span class="icon01"></span>';
        letNavhtml += '<font class="title">收银</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li  data-url=\'tradingRecord/index.html\'>';
        letNavhtml += '<span class="icon02"></span>';
        letNavhtml += '<font class="title">交易记录</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li  data-url=\'orderSystem/index.html\'>';
        letNavhtml += '<span class="icon03"></span>';
        letNavhtml += '<font class="title">挂单</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li  data-url=\'swopSystem/index.html\'>';
        letNavhtml += '<span class="icon04"></span>';
        letNavhtml += '<font class="title">退还货</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li  data-url=\'alterationSystem/index.html\'>';
        letNavhtml += '<span class="icon05"></span>';
        letNavhtml += '<font class="title">交换班</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li  data-url=\'setSystem/index.html\'>';
        letNavhtml += '<span class="icon06"></span>';
        letNavhtml += '<font class="title">设置</font>';
        letNavhtml += '</li>';
        letNavhtml += '</ul>';
    }else{
        letNavhtml += '<ul>';
        letNavhtml += '<li  data-url=\'tradingRecord/index.html\'>';
        letNavhtml += '<span class="icon02"></span>';
        letNavhtml += '<font class="title">交易记录</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li  data-url=\'alterationSystem/index.html\'>';
        letNavhtml += '<span class="icon05"></span>';
        letNavhtml += '<font class="title">交换班</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li  data-url=\'setSystem/index.html\'>';
        letNavhtml += '<span class="icon06"></span>';
        letNavhtml += '<font class="title">设置</font>';
        letNavhtml += '</li>';
        letNavhtml += '</ul>';
    }
    $('#left-nav').html(letNavhtml);
}


$('.left-nav ul li').on('click', function (e) {
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
    layer.load(2)
    $('.loading').show();
    $.ajaxSetup ({
        cache: false //close AJAX cache
    });
    $('#mali').load(url,function(result){
            setTimeout(function(){
                layer.closeAll();
                $('.loading').hide();
            },1000)
            $result = $(result);
            $result.find("script").appendTo('#mali');
    });
}