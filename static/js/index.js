// 左侧导航 栏

var integral =  sessionStorage.getItem('integral');

setInit();

function setInit() {
    var dutyType = sessionStorage.getItem('dutyType');
    var letNavhtml = '';
    letNavhtml += '<ul>';
    console.log(integral);
    if(integral != 1){
        if (dutyType == 1) {
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
        } else {
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
        }
        letNavhtml += '<li   class=""  data-url="" id="changeSystem">';
        letNavhtml += '<span class="icon07"></span>';
        letNavhtml += '<font class="title">切换</font>';
        letNavhtml += '</li>';
    }else{
        letNavhtml += '<li class="integral"  data-url=\'cashierSystem/index.html\'>';
        letNavhtml += '<span class="icon01"></span>';
        letNavhtml += '<font class="title">收银</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li class="integral" data-url=\'tradingRecord/index.html\'>';
        letNavhtml += '<span class="icon02"></span>';
        letNavhtml += '<font class="title">交易记录</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li class="integral"  data-url=\'orderSystem/index.html\'>';
        letNavhtml += '<span class="icon03"></span>';
        letNavhtml += '<font class="title">挂单</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li class="integral"  data-url=\'swopSystem/index.html\'>';
        letNavhtml += '<span class="icon04"></span>';
        letNavhtml += '<font class="title">退还货</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li class="integral"  data-url=\'alterationSystem/index.html\'>';
        letNavhtml += '<span class="icon05"></span>';
        letNavhtml += '<font class="title">交换班</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li class="integral" data-url=\'setSystem/index.html\'>';
        letNavhtml += '<span class="icon06"></span>';
        letNavhtml += '<font class="title">设置</font>';
        letNavhtml += '</li>';
        letNavhtml += '<li   class="active"  data-url="" id="changeSystem">';
        letNavhtml += '<span class="icon07"></span>';
        letNavhtml += '<font class="title">切换</font>';
        letNavhtml += '</li>';
    }


    letNavhtml += '</ul>';
    $('#left-nav').html(letNavhtml);
}


$('.left-nav ul li').on('click', function (e) {
    e.preventDefault();
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    var _url = $(this).data('url');
    router(_url);
})
$('#changeSystem').on('click', function(e){
    e.preventDefault();
    var _self = $(this);
    var url;
    if(_self.hasClass("active")){
        sessionStorage.setItem('integral','1');
        url = '../view/integralSystem.html';
    }else{
        sessionStorage.setItem('integral','');
        url = '../view/index.html';
    }
    console.log(url)
    window.location.href = url;
})



var letObj = document.getElementById('left-nav');
var startY, endY;
letObj.addEventListener("touchstart", function(event) {
    event.preventDefault();
    startY = event.targetTouches[0].pageY;
});
letObj.addEventListener('touchmove', function (event) {
    var _self = $(this);
    if (event.targetTouches.length == 1) {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        endY = touch.pageY;
        getTouch(endY - startY )
    }
});


function getTouch(Y) {
    console.log(parseInt(Y))
    if(Math.abs(Y) > 240){
        return false;
    }else{
        $("#left-nav").animate({top:Y + "px"},0)
    }

}


$('#mali').load("./home/index.html");

//  自定义 路由

function router(url) {
    if(url){
        var index = layer.load(3);
        $('.loading').show();
        $.ajaxSetup({
            cache: false //close AJAX cache
        });
        $('#mali').load(url, function (result) {
            setTimeout(function () {
                layer.close(index);
                $('.loading').hide();
            }, 1000)
            $result = $(result);
            $result.find("script").appendTo('#mali');
        });
    }
}