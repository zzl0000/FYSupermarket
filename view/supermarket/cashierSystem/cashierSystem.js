/**
 *
 */

var num = 0,
	_curnum;
var curk = 0;

var price, unitPrice, _unitPrice, realPrice, couponPrice = $('#couponPrice').text(),
	integralPrice = $('#integralPrice').text();
var _realPrice, _payPrice, money;

// 档区价格


var token;
var nick;
var goodsList = [];

var gNo = [],
	isgNo = false;

var ListData = {
	goodsListData: []
};
var hangOrderDtata;
var key;
var keyId;
var isMemberVal = false;
var hangOrderNum = [];
init();

function init() {
	gNo = [];
	hangOrderDtata = null
	keyId = ''
	if (sessionStorage.getItem("hangOrderData") != null) {
		hangOrderDtata = JSON.parse(sessionStorage.getItem("hangOrderData"));
		keyId = sessionStorage.getItem("clearingId");
	}
	;
	//console.log(hangOrderDtata)
	
	//console.log(hangOrderDtata)
	if (hangOrderDtata != null) {
		isMemberVal = true;
		$("#memberInfo").show();
		getMemberInfo(hangOrderDtata[keyId].token);
		
		//console.log(hangOrderDtata[0].goodsList);
		$.each(hangOrderDtata[keyId].goodsList, function (index, val) {
			getGoodsList(val.gNo, curk);
			hangOrderNum.push(val.num);
			curk++;
			
		});
		
	}
}

$('#ScanCodeinput').bind('keypress', function (event) {
	var inputkey = $('#ScanCodeinput').val();
	hangOrderNum = [];
	if (!isMemberVal) {
		layer.msg('请先添加会员信息');
		return false;
	}
	if (event.keyCode == "13") {
		if (inputkey == "") {
			return false;
		}
		//console.log(curk)
		getGoodsList(inputkey, curk);
		curk++;
		//alert('你输入的内容为：' + $('#ScanCodeinput').val());
	}
});

$('#ScanCodeMember').bind('keypress', function (event) {
	var inputkey = $('#ScanCodeMember').val();
	if (inputkey != "") {
		isMemberVal = true;
	}
	if (event.keyCode == "13") {
		getMemberInfo(inputkey);
	}
});

function getMemberInfo(inputkey) {
	//console.log(inputkey);
	var phone = inputkey;
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
				renderMenberInfo(rs);
				token = rs.data.token;
				nick = rs.data.nick;
			} else {
				layer.msg(rs.message);
			}
		}
	});
}

function renderMenberInfo(rs) {
	var html = template('memberInfoList', {
		value: rs.data
	});
	$("#memberInfo").html(html);
}


function getGoodsList(key, status) {
	
	if (status <= 0) {
		gNo.push(key);
	} else {
		if (gNo[returnSAIndexof(gNo, key)] == key) {
			//num++;
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
				if (isgNo) {
					var index = returnIndexof(ListData.goodsListData, rs.data.goods.id);
					//console.log(index)
					//console.log(ListData.goodsListData[0].specValue)
					rs.data.specValue.num = ListData.goodsListData[index].specValue.num + 1
					ListData.goodsListData[index] = rs.data;
				} else {
					if (hangOrderNum.length > 0) {
						rs.data.specValue.num = hangOrderNum[returnSAIndexof(gNo, key)];
					} else {
						rs.data.specValue.num = 1;
					}
					ListData.goodsListData.push(rs.data);
				}
				rs.data.specValue.price = priceCount(rs.data.specValue.price, rs.data.specValue.num);
				renderGoodsList(ListData);
			} else {
				layer.msg(rs.message)
			}
		}
	})
	
	
}


function renderGoodsList(data) {
	//console.log(data);
	var html = template('GoodsList', {
		list: data
	});
	$("#Goods").html(html);
	
	getPrice(data.goodsListData);
	
}

var _allotOnePrice = [];
var _allotTowPrice = [];

setTimeout(function () {
	$('#Goods li').each(function (index, el) {
		//console.log(index);
		var type = $(el).attr('data-allotType');
		if (type == '一档区') {
			_allotOnePrice.push($(el).find('.price').text().substring(1));
		} else {
			//console.log($(el).find('.price').text().substring(1));
			_allotTowPrice = $('#allotTowPrice').text($(el).find('.price').text().substring(1));
		}
	})
	
	$('#allotOnePrice').text(priceAcount(_allotOnePrice));
	$('#allotTowPrice').text(priceAcount(_allotTowPrice));
	
	
}, 2000);

function priceAcount(rs) {
	console.log(rs)
	if (rs.length > 0) {
		var str = '';
		for (i in rs) {
			str += rs[i];
			str += '+';
		}
		str = str.substring(0, str.length - 1);
		var Price = eval(str).toFixed(2);
		return Price;
	}
}

// 数量计算
function addCount(el, num) {
	_curnum = parseInt(num) + 1;
	var id = el.attr('data-goodsId');
	var index = returnIndexof(ListData.goodsListData, id);
	ListData.goodsListData[index].specValue.num = _curnum;
	//console.log(_curnum,num);
	return _curnum;
}

function minusCount(el, _num) {
	_curnum = parseInt(_num) - 1;
	var id = el.attr('data-goodsId');
	var index = returnIndexof(ListData.goodsListData, id);
	
	if (_curnum <= 0) {
		// console.log(el);
		el.addClass('disabled');
		el.parent().parent().parent().hide();
		$('#realPrice').text('0.00');
		$('.payPrice').text('0.00');
		ListData.goodsListData[index].specValue.num = 0;
	} else {
		ListData.goodsListData[index].specValue.num = _curnum;
	}
	//console.log(num);
	return _curnum;
}

// 价格计算

function priceCount(unitPrice, _curnum) {
	
	_unitPrice = parseFloat(unitPrice) * _curnum;
	//console.log(key);
	return _unitPrice.toFixed(2);
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

// 返回数组下标
function returnSAIndexof(arr, value) {
	var _curIndex;
	
	var a = arr; //为了增加方法扩展适应性。我这稍微修改了下
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
	
	var a = arr; //为了增加方法扩展适应性。我这稍微修改了下
	for (var i = 0; i < a.length; i++) {
		if (a[i].goods.id == value) {
			_curIndex = i;
			isgNo = true;
		}
		
	}
	
	return _curIndex;
}


function getPrice(realPrice) {
	var _realPrice, _payPrice;
	var str = '';
	for (i in realPrice) {
		str += realPrice[i].specValue.price;
		str += '+';
	}
	str = str.substring(0, str.length - 1);
	_realPrice = eval(str).toFixed(2);
	_payPrice = (_realPrice - couponPrice - integralPrice).toFixed(2);
	//console.log(_realPrice);
	$('#realPrice').text(_realPrice);
	$('.payPrice').text(_payPrice);
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
	sessionStorage.setItem("hangOrderData", null);
	$('#allotOnePrice').text('0.00');
	$('#allotTowPrice').text('0.00');
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
			"gNo": '0',
			"goodsId": 0,
			"money": 0,
			"num": 0,
			"specValueId": 0
		};
		goodsInfo.gNo = $(el).attr('data-gNo');
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
		"token": token,
		
	}
	//console.log(data)
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
			"specValueId": 0,
			"allotTitle": 0
		};
		goodsInfo.goodsId = $(el).attr('data-goodsId');
		goodsInfo.specValueId = $(el).attr('data-specValueId');
		goodsInfo.allotTitle = $(el).attr('data-allotType');
		goodsInfo.num = $(el).find('.number').text();
		goodsInfo.money = parseFloat($(el).find('.price').text().substring(1) / goodsInfo.num);
		goodsList.push(goodsInfo);
	})
	//console.log(goodsList)
	
	var data = {
		"goodsList": goodsList,
		"sumMoney": _payPrice,
		"token": token,
		"nick": nick
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


$('body').on('click', '.add', function (e) {
	e.preventDefault();
	var _slef = $(this);
	var allotType = _slef.attr('data-allotType');
	var allotOnePrice = $('#allotOnePrice').text();
	var allotTowPrice = $('#allotTowPrice').text()
	num = $(this).siblings('.number').text();
	realPrice = $('#realPrice').text();
	if (num <= 0) {
		unitPrice = 5;
		$(this).siblings('.minus').removeClass('disabled');
	} else {
		unitPrice = $(this).parent().siblings().text().substring(1) / num;
		
	}
	
	if (allotType == '一档区') {
		$('#allotOnePrice').text((parseFloat(unitPrice) + parseFloat(allotOnePrice)).toFixed(2));
	} else {
		$('#allotTowPrice').text((parseFloat(unitPrice) + parseFloat(allotTowPrice)).toFixed(2));
	}
	;
	
	$(this).siblings(".number").text(addCount(_slef, num))
	$(this).parent().siblings().text("¥ " + priceCount(unitPrice, _curnum));
	realPriceCount("add", realPrice, unitPrice);
})

$('body').on('click', '.minus', function (e) {
	e.preventDefault();
	var _slef = $(this);
	num = $(this).siblings('.number').text();
	realPrice = $('#realPrice').text();
	var allotType = _slef.attr('data-allotType');
	var allotOnePrice = $('#allotOnePrice').text();
	var allotTowPrice = $('#allotTowPrice').text();
	if (num == 0) {
		unitPrice = $(this).parent().siblings().text().substring(1)
	} else {
		unitPrice = $(this).parent().siblings().text().substring(1) / num;
	}
	$(this).siblings(".number").text(minusCount(_slef, num))
	$(this).parent().siblings().text("¥ " + priceCount(unitPrice, _curnum));
	
	if (allotType == '一档区') {
		$('#allotOnePrice').text((parseFloat(allotOnePrice) - parseFloat(unitPrice)).toFixed(2));
	} else {
		$('#allotTowPrice').text((parseFloat(allotTowPrice) - parseFloat(unitPrice)).toFixed(2));
	}
	;
	realPriceCount("minus", realPrice, unitPrice);
})

