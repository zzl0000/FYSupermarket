function removeHTML(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
    str = str.replace(/\s/g, ''); //将空格去掉
    return str;
}
/*接口*/
var turl = "http://49.4.12.221:8082/NuoQiHuiMaven";
/*图片*/
var imgurl = "http://49.4.12.221:8082/NuoQiHuiMaven/";

function imgurls() {
    return "http://49.4.12.221:8082/NuoQiHuiMaven";
}
/*时间渲染*/
function add0(m) {
    return m < 10 ? '0' + m : m
}

function format(times) {
    var time = new Date(times);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    /*  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);*/
    return y + '-' + add0(m) + '-' + add0(d);
}

function formats(times) {
    var time = new Date(times);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm);
    /*return y + '-' + add0(m) + '-' + add0(d);*/
}
//判断比例  %
function typebl(val) {
    if (val == null) {
        return val;
    } else {
        return parseFloat((val * 100).toPrecision(12)) + "%";
    }
}
/*字典属性列表*/
function Dictionary(tbl) {
    $.ajaxSettings.async = false;
    $.post(turl + "/sdict/querydict", {
        "code": tbl,
        "startPage": 1,
        "pageSize": 100000
    }, function(rs) {
        /*console.log(rs, 11111)*/
        var html = template('Dictionary', {
            list: rs.data.data
        });
        /*console.log(html)*/
        setTimeout(function() {
            $("#Dictionary01").append(html)
        }, 300)

    })
}
/*字典属性列表*/
function Dictionary02(tbl) {
    $.ajaxSettings.async = false;
    $.post(turl + "/sdict/querydict", {
        "code": tbl,
        "startPage": 1,
        "pageSize": 100000
    }, function(rs) {
        /*console.log(rs, 11111)*/
        var html = template('Dictionary02', {
            list: rs.data.data
        });
        /*console.log(html)*/
        setTimeout(function() {
            $("#Dictionary02").append(html)
        }, 300)

    })
}
/*判断为空*/
function nulls(s) {
    if (s == null) {
        s = ""
    }
    return 1;
}
/*接口api*/
var queryOrder = turl + "/morder/queryOrder"; //查询订单列表 
var updateOrder = turl + "/morder/updateOrder"; //删除订单
var queryIntegral = turl + "/tsystemuser/queryIntegral"; //积分管理
var queryUser = turl + "/suser/queryUser"; //会员管理列表
var queryFeedBack = turl + "/mfeedback/queryFeedBack"; //意见反馈
var deleteFeedBack = turl + "/mfeedback/deleteFeedBack"; //删除意见反馈
var queryTheme = turl + "/mtheme/queryTheme"; //发布管理
var deleteThemesy = turl + "/mtheme/deleteTheme"; //删除发布
var queryThemeDetail = turl + "/mtheme/queryThemeDetail"; //查看发布
var saveTheme = turl + "/mtheme/saveTheme"; //发布主题
var updateTheme = turl + "/mtheme/updateTheme"; //修改主题是否审核
var queryHotel = turl + "/mhotel/queryHotel"; //酒店列表
var queryHotelDetail = turl + "/mhotel/queryHotelDetail"; //酒店详细
var queryHotelRoomDetail = turl + "/mhotel/queryHotelRoomDetail"; //酒店房间详情
var deleteHotelService = turl + "/mhotel/deleteHotelService"; //删除酒店服务
var deleteHotelRoom = turl + "/mhotel/deleteHotelRoom"; //删出酒店房间
var updateHotel = turl + "/mhotel/updateHotel"; //修改酒店
var saveHotel = turl + "/mhotel/saveHotel"; //酒店发布
var querydict = turl + "/sdict/querydict"; //字典查询
var saveHotelRoom = turl + "/mhotel/saveHotelRoom"; //发布酒店房间
var saveHotelService = turl + "/mhotel/saveHotelService"; //添加酒店服务
var deleteHotelService = turl + "/mhotel/deleteHotelService"; //删除酒店服务
var saveGoods = turl + "/mgoods/saveGoods"; //添加商品
var updateGoods = turl + "/mgoods/updateGoods"; //商品修改
var queryAlldictType = turl + "/sdict/queryAlldictType" //查询所有字典
var queryParentCode = turl + "/sdict/queryParentCode"; //查询Code
var savedict = turl + "/sdict/savedict"; //添加字典
var queryCashapply = turl + "/mcashapply/queryCashapply"; //提现列表
var updateCashapply = turl + "/mcashapply/updateCashapply"; //提现审核
var querySystemUserAndRole = turl + "/tsystemuser/querySystemUserAndRole"; //获取后台管理用户
var queryRoleAndMenu = turl + "/tsystemuser/queryRoleAndMenu"; //根据角色ID查询用户权限列表
var deleteSystemuser = turl + "/tsystemuser/deleteSystemuser"; //删除系统用户
var queryMenu = turl + "/tsystemuser/queryMenu"; //获取菜单列表
var queryRole = turl + "/tsystemuser/queryRole"; //获取角色列表
var deleteRole = turl + "/tsystemuser/deleteRole"; //删除角色
var saveRole = turl + "/tsystemuser/saveRole"; //添加角色
var saveSystemUser = turl + "/tsystemuser/saveSystemUser"; //添加后台管理
var queryMnews = turl + "/mnews/queryMnews"; //获取消息列表
var appointPush = turl + "/lpush/appointPush"; //消息推送
var querySystemUserDetail = turl + "/tsystemuser/querySystemUserDetail"; //后台用户信息
var queryShopToGoodsComment = turl + "/mcomment/queryShopToGoodsComment"; //商家评论列表
var queryGoodsDetail = turl + "/mgoods/queryGoodsDetail"; //商品详细
var replayComment = turl + "/mcomment/replayComment"; //评论回复
var allPush = turl + "/lpush/allPush"; //全员推送
var queryCompayNews = turl + "/mcompanynews/queryCompayNews"; //查询公司信息
var saveCompayNews = turl + "/mcompanynews/saveCompayNews"; //公司信息修改
var querySellerAttach = turl + "/sseller/querySellerAttach"; //商品美食休闲娱乐查询
var querySeller = turl + "/sseller/querySeller"; //商家列表
var updateUser = turl + "/suser/updateUser"; //删除用户
var sellerLogin = turl + "/sseller/sellerLogin"; //商家登陸
var setSmscode = turl + "/msmscode/setSmscode"; //验证码
var backPasswordOne = turl + "/sseller/backPasswordOne"; //商家找回密码
var querySellerDetail = turl + "/sseller/querySellerDetail"; //商家详细
var readNews = turl + "/mnews/readNews"; //确定消息
var updateSeller = turl + "/sseller/updateSeller"; //修改商家
var deleteSellerAttach = turl + "/sseller/deleteSellerAttach"; //删除套餐
var sellerAttachDetail = turl + "/sseller/sellerAttachDetail"; //套餐详细
var saveSellerAttach = turl + "/sseller/saveSellerAttach"; //添加套餐
var queryBank = turl + "/sbank/queryBank"; //查询银行卡
var todaySales = turl + "/morder/todaySales"; //今日销量
var queryAccountPrice = turl + "/saccount/queryAccountPrice"; //账户信息
var queryAccountRecord = turl + "/saccount/queryAccountRecord"; //查询账户记录
var saveAnswer = turl + "/manswer/saveAnswer"; // 添加题目 
var queryAnswer = turl + "/manswer/queryAnswer"; // 查询题目 
var deleteAnswer = turl + "/manswer/deleteAnswer"; // 删除题目 
var fastCashier = turl+ "/sseller/fastCashier"; // 快速收银



function gainpage(pages, alltotal) {
    if (alltotal < 0) {
        return false;
    } else {
        laypage({
            cont: 'biuuu_city',
            skip: true, //是否开启跳页
            skin: '#425EC1',
            pages: pages,
            jump: function(obj, first) {
                var curr = obj.curr;
                console.log(obj);
                //得到了当前页，用于向服务端请求对应数据
                if (obj.curr == 0) {
                    $('#pagetxt').css("display", "none");
                } else {
                    $('#pagetxt').html("当前在第 " + obj.curr + " 页/" + "共 " + obj.pages + " 页").removeAttr("style");
                }
            }
        })
    }
}

function reumover() {
    setTimeout(function() {
        layer.closeAll();
    }, 500)
}

function settron() {
    var syc = '[' + localStorage.getItem("sddy") + ']';
    var sby = "";
    for (var i = 0; i < JSON.parse(syc).length; i++) {
        sby += ",.ction" + JSON.parse(syc)[i];
    }
    var nod = document.createElement('style'),
        str = 'html' + sby + '{display:table-cell; border:none;}';
    nod.type = 'text/css';
    if (nod.styleSheet) {
        nod.styleSheet.cssText = str;
    } else {
        nod.innerHTML = str;
    }
    document.getElementById('mali').appendChild(nod);
}
var nuis = localStorage.getItem("numlsid");