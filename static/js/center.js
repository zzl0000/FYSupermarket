
/*接口*/
var turl = "http://120.79.90.220:8080";
/*图片*/
var imgurl = "http://49.4.12.221:8082/NuoQiHuiMaven/";

function imgurls() {
    return "http://49.4.12.221:8082/NuoQiHuiMaven";
}


/*接口api*/


var getUser = turl + "/cashier/cashier/getUser"; // 获取会员信息
var getGoods = turl + "/cashier/cashier/getGoods"; // 获取商品信息
var payByCash = turl + "/cashier/cashier/payByCash";  // 现金支付
var saveHangOrder = turl + "/cashier/hangOrder/saveHangOrder"; // 保存挂单


var getLoginEmployee = turl + "/cashier/login/getLoginEmployee";   //获取当前登录员工 
var updateStatus = turl + "/cashier/login/updateStatus";   //上传员工 当班状态
var updateImprestCash = turl + "/cashier/login/updateImprestCash"; // 更新备用现金
var logout = turl + "/cashier/login/logout";  // 下班

var findOrderAll = turl + "/cashier/order/findAll";   // 获取所有订单数据
var findOrderOne = turl + "/cashier/order/findOne";   // 根据订单号查询
var findOrderDetail = turl + "/cashier/order/findOrderDetail";   // 查询订单详情
var findPage = turl + "/cashier/order/findPage";   // 分页查询

var deleteOrder = turl + "/cashier/order/delete"; //删除订单


var getHangOrderList = turl + "/cashier/hangOrder/getHangOrderList";   //获取挂单数据
var removeHangOrder = turl + "/cashier/hangOrder/removeHangOrder";   //删除挂单数据




function queryMenberInfo(token){
	$.ajax({
        type: "get",
        url: getUser,
        data: {
            phone: token
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (rs) {
            if (rs.status == 200) {
				localStorage.setItem("menberInfo",rs.data);
            }
        }
    });
}




function removeHTML(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
    str = str.replace(/\s/g, ''); //将空格去掉
    return str;
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

/*判断为空*/
function nulls(s) {
    if (s == null) {
        s = ""
    }
    return 1;
}

function gainpage(pages, alltotal) {
    if (alltotal < 0) {
        return false;
    } else {
        laypage({
            cont: 'page',
            skip: true, //是否开启跳页
            skin: '#1E9FFF',
            pages: pages,
            jump: function(obj, first) {
                var curr = obj.curr;
                console.log(obj);
                //得到了当前页，用于向服务端请求对应数据
            }
        })
    }
}


