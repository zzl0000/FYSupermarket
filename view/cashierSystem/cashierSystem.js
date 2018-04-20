/**
 *
 */

init();

function init() {
    //getMemberInfo();
    //getGoodsList();
}

var num = 0,
    _curnum;
var price, unitPrice, _unitPrice, realPrice, couponPrice = $('#couponPrice').text(),
    integralPrice = $('#integralPrice').text();
var _realPrice, _payPrice, money;

var token;
var goodsList = [];

$('body').on('click', '.add', function (e) {
    e.preventDefault();

    num = $(this).siblings('.number').text();
    realPrice = $('#realPrice').text();
    if (num <= 0) {
        unitPrice = 5;
        $(this).siblings('.minus').removeClass('disabled');
    } else {
        unitPrice = $(this).parent().siblings().text().substring(1) / num;

    }

    $(this).siblings(".number").text(addCount(num))
    $(this).parent().siblings().text(priceCount(unitPrice, _curnum));
    realPriceCount("add", realPrice, unitPrice);
})

$('body').on('click', '.minus', function (e) {
    e.preventDefault();
    var _slef = $(this);
    num = $(this).siblings('.number').text();
    realPrice = $('#realPrice').text();
    if (num == 0) {
        unitPrice = $(this).parent().siblings().text().substring(1)
    } else {
        unitPrice = $(this).parent().siblings().text().substring(1) / num;
    }
    $(this).siblings(".number").text(minusCount(_slef, num))
    $(this).parent().siblings().text(priceCount(unitPrice, _curnum));
    realPriceCount("minus", realPrice, unitPrice);
})

// 输入键盘 
var _relTakePrice = 0;
var _inputkey = '';
var _specialKey = 0;
var decimal = '';
var isSpecialKey = false;
var isdecimalKey = false;

$('body').on('click', '.input-key', function (e) {

    e.preventDefault();
    if (!isSpecialKey && !isdecimalKey) {
        _relTakePrice = 0;
    }
    var _curval = $(this).text();
    var key;

    _inputkey += _curval;
    _relTakePrice = _relTakePrice + _inputkey;

    if (isdecimalKey) {
        _inputkey = '';

        if (_relTakePrice.split('.')[1].length > 2) {
            layer.msg('小数位数书不能超过两位');
            return;
        }
        key = parseFloat(_relTakePrice);
    } else {
        key = parseFloat(_specialKey + _inputkey);
    }

    keyCount(key)
})

$('body').on('click', '.specialKey', function (e) {
    e.preventDefault();
    _inputkey = '';
    var _curval = $(this).text().substring(1);
    _specialKey = parseFloat(_relTakePrice) + parseFloat(_curval)
    //console.log(_specialKey, _relTakePrice, _curval)
    _relTakePrice = _specialKey;
    isSpecialKey = true;

    keyCount(_relTakePrice)
})

$('body').on('click', '.decimal', function () {
    $(this).addClass('disabled');
    if ($('#relTakePrice').val() == '') {
        return false;
    }
    decimal = $(this).text();

    var key = parseFloat(_relTakePrice) + decimal;
    _relTakePrice = parseFloat(_relTakePrice) + decimal;
    isdecimalKey = true;

    _inputkey = '';
    keyCount(key);
})
var curk = 0;
$('#ScanCodeinput').bind('keypress', function (event) {
    var inputkey = $('#ScanCodeinput').val();
    if (event.keyCode == "13") {
    	//console.log(curk)
        getGoodsList(inputkey, curk);
        curk++;
        //alert('你输入的内容为：' + $('#ScanCodeinput').val());
    }
});

$('#ScanCodeMember').bind('keypress', function (event) {
    var inputkey = $('#ScanCodeMember').val();
    if (event.keyCode == "13") {
        getMemberInfo(inputkey);
    }
});



function keyCount(val) {
    var price = _payPrice || $('#payPrice').text();
    //console.log(price);
    if (parseFloat(val) > parseFloat(price)) {
        layer.msg('输入的价格不能大于应收金额');
        resetKeyboard();
        return;
    }
    var changePrice = (parseFloat(price) - parseFloat(val)).toFixed(2);
    $('#relTakePrice').val(val);
    $('#changePrice').val(changePrice)
}

// 重置键盘
function resetKeyboard() {
    $('.decimal').removeClass('disabled');
    $('#relTakePrice').val('');
    $('#changePrice').val('')
    _relTakePrice = 0;
    _inputkey = '';
    _specialKey = 0;
    isdecimalKey = false;
    isSpecialKey = false;
}

// 数量计算
function addCount(num) {
    _curnum = parseInt(num) + 1;
    //console.log(_curnum,num);
    return _curnum;
}

function minusCount(el, _num) {
    _curnum = parseInt(_num) - 1;
    num = parseInt(_num) - 1;
	curk = 0;
    if (_curnum <= 0) {
       // console.log(el);
        el.addClass('disabled');  
        el.parent().parent().parent().hide();
        $('#realPrice').text('0.00');
        $('.payPrice').text('0.00');
    }
    //console.log(num);
    return _curnum;
}

// 价格计算

function priceCount(unitPrice, _curnum) {

    _unitPrice = parseFloat(unitPrice) * _curnum;
    //console.log(key);
    return '¥' + _unitPrice.toFixed(2);
}

function realPriceCount(type, realPrice, unitPrice) {
    //console.log(realPrice, unitPrice)
    if (unitPrice <= 0) {
        return false;
    }

    if (type == "add") {
        _realPrice = (parseFloat(realPrice) + unitPrice).toFixed(2);
    } else if (type == "minus") {
        _realPrice = (parseFloat(realPrice) - unitPrice).toFixed(2);
        if (_realPrice <= 0) {
            _realPrice = '0.00';
        }
    }
    if (_realPrice == 0) {
        _payPrice = '0.00';
    } else {
        _payPrice = (_realPrice - couponPrice - integralPrice).toFixed(2);
    }
    //console.log(_payPrice);
    $('#realPrice').text(_realPrice);
    $('.payPrice').text(_payPrice);
}

function getMemberInfo(inputkey) {
	//console.log(inputkey);
    var phone = inputkey || "18012345678";
	
    $.ajax({
        type: "get",
        url: getUser,
        data: {
            phone: phone
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (rs) {
            if (rs.status == 200) {
            	$('#ScanCodeMemberInput').hide();
            	$('#ScanCodeMember').val('');
            	$("#memberInfo").show();
                var html = template('memberInfoList', {
                    value: rs.data
                });
                $("#memberInfo").html(html);
                token = rs.data.token;
            }
        }
    });
}

var gNo = [], isgNo = false;

var ListData = {
    goodsListData: []
};

function getGoodsList(key,status) {
	
    if(status <=0){
        gNo.push(key);
    }else{
        if (gNo[returnSAIndexof(gNo, key)] == key) {
            num++;
            isgNo = true;
        } else {
            gNo.push(key);
            isgNo = false;
            num = 0;
        }
    }
    //console.log(gNo,isgNo,status)
    //return;
    $.ajax({
        type: "get",
        url: getGoods,
        data: {
            gNo: key
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (rs) {
            if (rs.status == 200) {
            	
                $('#ScanCodeinput').val('');
                rs.data.specValue.price = priceCount(rs.data.specValue.price, addCount(num));
                rs.data.specValue.num = addCount(num);
                if (isgNo) {
                    ListData.goodsListData[returnIndexof(ListData.goodsListData, rs.data.goods.id)] = rs.data;
                } else {
                    ListData.goodsListData.push(rs.data);
                }
                renderGoodsList(ListData);

            } else {
                layer.msg(rs.message)
            }
        }
    })
}

// 返回数组下标
function returnSAIndexof(arr, value) {
    var _curIndex;

    var a = arr;//为了增加方法扩展适应性。我这稍微修改了下
    for (var i = 0; i < a.length; i++) {
        if (a[i] == value) {
            _curIndex = i;
        }

    }

    //console.log(_curIndex);
    return _curIndex;
}

// 返回数组下标
function returnIndexof(arr, value) {
    var _curIndex;

    var a = arr;//为了增加方法扩展适应性。我这稍微修改了下
    for (var i = 0; i < a.length; i++) {
        if (a[i].goods.id == value) {
            _curIndex = i;
            isgNo = true;
        }

    }

    //console.log(_curIndex);
    return _curIndex;
}


function renderGoodsList(data) {
	console.log(data);
    var html = template('GoodsList', {
        list: data
    });
    $("#Goods").html(html);
    getPrice(data.goodsListData);
}

function getPrice(realPrice) {
    var _realPrice, _payPrice;
    //console.log(realPrice);
    
   var str='';  
	   for (i in realPrice){  
	       str+= strFormat(realPrice[i].specValue.price);
	       str+='+';  
	  
	}  
	str=str.substring(0, str.length - 1); 
	_realPrice = eval(str).toFixed(2)
    _payPrice = (_realPrice - couponPrice - integralPrice).toFixed(2);
    //console.log(_realPrice);
    $('#realPrice').text(_realPrice);
    $('.payPrice').text(_payPrice);
}

function strFormat(val) {
    //console.log(val);
    var curVal;
    curVal = parseFloat(val.substring(1))
    return curVal
}

// 清空重置

function reset() {
    $("#Goods").html('');
    $('#realPrice').text('0.00');
    $('.payPrice').text('0.00');
    $('#ScanCodeMemberInput').show();
    $('#memberInfo').hide();
    gNo = [];
    curk = 0;
    isgNo = false;
    num = 0;
    ListData.goodsListData = [];
}

// 挂账

function uplodOrder() {
	var goodsList = [];
    var _payPrice = $('#payPrice').text();
    if (parseFloat(_payPrice) <= 0) {
        layer.msg('请先添加商品');
        return false;
    }

    $('#Goods li').each(function (index, el) {
        var goodsInfo = {
            "goodsId": 0,
            "money": 0,
            "num": 0,
            "specValueId": 0
        };
        goodsInfo.goodsId = $(el).attr('data-goodsId');
        goodsInfo.specValueId = $(el).attr('data-specValueId');
        goodsInfo.num = $(el).find('.number').text();
        goodsInfo.money = $(el).find('.price').text().substring(1);
        goodsList.push(goodsInfo);
    })
    //console.log(goodsList)

    var data = {
        "goodsList": goodsList,
        "sumMoney": _payPrice,
        "token": token
    }
	$.ajax({
        type: "post",
        url: saveHangOrder,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (rs) {
            if (rs.status == 200) {
                layer.msg('挂账成功');
				reset();
				resetKeyboard();
            } else {
                layer.msg(rs.message)
            }
        }
    });
}

// 结账

function checkOut() {
    var goodsList = [];
    var _payPrice = $('#payPrice').text();
    if (parseFloat(_payPrice) <= 0) {
        layer.msg('请先添加商品');
        return false;
    }

    $('#Goods li').each(function (index, el) {
        var goodsInfo = {
            "goodsId": 0,
            "money": 0,
            "num": 0,
            "specValueId": 0
        };
        goodsInfo.goodsId = $(el).attr('data-goodsId');
        goodsInfo.specValueId = $(el).attr('data-specValueId');
        goodsInfo.num = $(el).find('.number').text();
        goodsInfo.money = $(el).find('.price').text().substring(1);
        goodsList.push(goodsInfo);
    })
    //console.log(goodsList)

    var data = {
        "goodsList": goodsList,
        "sumMoney": _payPrice,
        "token": token
    }
    $.ajax({
        type: "post",
        url: payByCash,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (rs) {
            if (rs.status == 200) {
                layer.msg('结账成功');
				reset();
				resetKeyboard();
            } else {
                layer.msg(rs.message)
            }
        }
    });
}