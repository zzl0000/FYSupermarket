function removeHTML(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
    str = str.replace(/\s/g, ''); //将空格去掉
    return str;
}
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


var getHangOrderList = turl + "/cashier/hangOrder/getHangOrderList";   //获取挂单数据
var removeHangOrder = turl + "/cashier/hangOrder/removeHangOrder";   //删除挂单数据






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