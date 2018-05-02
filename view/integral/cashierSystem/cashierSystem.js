/**
 *
 */


var num = 0,
	_curnum;
var curk = 0;

var price,
	unitPrice,
	_unitPrice,
	uniIntegral,
	realPrice;

var token;
var nick;

var gNo = [],
	isgNo = false;

var ListData = {
	goodsListData: []
};

var PaymentKey = '';
var isMemberVal = false;
var key;
init();

function init() {
	
	$('#ScanCodeMember').bind('keypress', function (event) {
		var inputkey = $('#ScanCodeMember').val();
		if (inputkey != "") {
			isMemberVal = true;
		}
		if (event.keyCode == "13") {
			getMemberInfo(inputkey);
		}
	});
	
	$('#ScanCodeinput').bind('keypress', function (event) {
		
		var inputkey = $('#ScanCodeinput').val();
		
		$.each($("input[type=radio]"), function (index, el) {
			if ($(this).is(':checked')) {
				PaymentKey = $(this).val();
				
			}
		})
		if (!isMemberVal) {
			layer.msg('请先添加会员信息');
			return false;
		} else if (PaymentKey == '') {
			layer.msg('请选择支付方式');
			return false;
		}
		
		if (event.keyCode == "13") {
			if (inputkey == "") {
				layer.msg('商品编码不能为空');
				return false;
			}
			//console.log(curk)
			$.each($("input[type=radio]"), function () {
				$(this).attr({"disabled":"disabled"});
			})
			getGoodsList(inputkey, curk, PaymentKey);
			curk++;
			//alert('你输入的内容为：' + $('#ScanCodeinput').val());
		}
	});
	
	
	$('body').on('click', '.add', function (e) {
		e.preventDefault();
		var _slef = $(this);
		
		num = $(this).siblings('.number').text();
		if (num == 0) {
			unitPrice = $(this).parent().siblings().find('.price').text();
			uniIntegral = $(this).parent().siblings().find('.integral').text();
		} else {
			unitPrice = $(this).parent().siblings().find('.price').text() / num;
			uniIntegral = $(this).parent().siblings().find('.integral').text() / num;
		}
		$(this).siblings(".number").text(addCount(_slef, num));
		
		if (PaymentKey == 1) {
			$(this).parent().siblings().find('.integral').text(priceCount(uniIntegral, _curnum));
			realPriceCount('add',uniIntegral, '0.00');
		} else {
			$(this).parent().siblings().find('.price').text(priceCount(unitPrice, _curnum));
			$(this).parent().siblings().find('.integral').text(priceCount(uniIntegral, _curnum));
			realPriceCount('add',unitPrice, uniIntegral);
		}
	})
	
	$('body').on('click', '.minus', function (e) {
		e.preventDefault();
		var _slef = $(this);
		num = $(this).siblings('.number').text();
		if (num == 0) {
			unitPrice = $(this).parent().siblings().find('.price').text();
			uniIntegral = $(this).parent().siblings().find('.integral').text();
		} else {
			unitPrice = $(this).parent().siblings().find('.price').text() / num;
			uniIntegral = $(this).parent().siblings().find('.integral').text() / num;
		}
		$(this).siblings(".number").text(minusCount(_slef, num));
		if (PaymentKey == 1) {
			$(this).parent().siblings().find('.integral').text(priceCount(uniIntegral, _curnum))
			realPriceCount('minus',uniIntegral, '0.00');
		}
		if (PaymentKey == 2) {
			$(this).parent().siblings().find('.price').text(priceCount(unitPrice, _curnum));
			$(this).parent().siblings().find('.integral').text(priceCount(uniIntegral, _curnum));
			realPriceCount('minus',unitPrice, uniIntegral);
		}
		
		
	})
}


/**
 *  渲染数据列表
 * @param inputkey
 */



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


function getGoodsList(key, status, PaymentKey) {
	//console.log(num);
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
		url: getIntegralGoods,
		data: {
			goodsNo: key
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (rs) {
			if (rs.status == 200) {
				$('#ScanCodeinput').val('');
				if (isgNo) {
					var index = returnIndexof(ListData.goodsListData, rs.data.goodsId);
					//console.log(index)
					//console.log(ListData.goodsListData[0].specValue)
					rs.data.num = ListData.goodsListData[index].num + 1
					ListData.goodsListData[index] = rs.data;
				} else {
					rs.data.num = 1;
					ListData.goodsListData.push(rs.data);
				}
				var integralIndex = returnIntegralIndex(rs.data.integralSellTypeList, PaymentKey);
				//console.log(integralIndex);
				rs.data.price = priceCount(rs.data.integralSellTypeList[integralIndex].money, rs.data.num);
				unitPrice = priceCount(rs.data.integralSellTypeList[integralIndex].money, rs.data.num);
				rs.data.integral = priceCount(rs.data.integralSellTypeList[integralIndex].integral, rs.data.num);
				uniIntegral = priceCount(rs.data.integralSellTypeList[integralIndex].integral, rs.data.num);
				
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

/**
 *  数量计算
 * @param el
 * @param num
 * @returns {number|*}
 */


function addCount(el, num) {
	_curnum = parseInt(num) + 1;
	var id = el.attr('data-goodsId');
	var index = returnIndexof(ListData.goodsListData, id);
	ListData.goodsListData[index].num = _curnum;
	if (_curnum > (ListData.goodsListData[index].stock)) {
		layer.msg('库存不足', {time: '1000'});
		el.addClass('disabled');
		return;
	}
	
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
		ListData.goodsListData[index].num = 0;
	} else {
		ListData.goodsListData[index].num = _curnum;
	}
	return _curnum;
}


/**
 * 计算价格
 * @param realPrice
 */



function priceCount(val, _num) {
	
	_unitPrice = parseFloat(val) * _num;
	//console.log(key);
	return _unitPrice.toFixed(2);
}


function realPriceCount(type, uniIntegral, unitPrice) {
	console.log(uniIntegral,unitPrice)
	var balance, integralPrice;
	if(type == 'add'){
		balance = parseFloat(unitPrice) + parseFloat($('#balance').text());
		integralPrice =  parseFloat(uniIntegral) + parseFloat($('#integralPrice').text());
	}else{
		balance = parseFloat($('#balance').text()) - parseFloat(unitPrice);
		integralPrice =parseFloat($('#integralPrice').text()) - parseFloat(uniIntegral) ;
	}
	
	$('#integralPrice').text(integralPrice.toFixed(2));
	$('#balance').text(balance.toFixed(2));
}


function getPrice(realPrice) {
	//console.log(realPrice);
	var balance, _payPrice, couponPrice, integralPrice;
	
	var str = '';
	var str2 = '';
	
	for (i in realPrice) {
		str += realPrice[i].price;
		str += '+';
		str2 += realPrice[i].integral;
		str2 += '+';
		
	}
	
	console.log(str2);
	
	str = str.substring(0, str.length - 1);
	str2 = str2.substring(0, str2.length - 1);
	balance = eval(str).toFixed(2);
	integralPrice = eval(str2).toFixed(2);
	
	
	//$('#couponPrice').text();
	$('#integralPrice').text(integralPrice);
	$('#balance').text(balance);
	
	
}

/**
 *  结账
 */



function checkOut() {
	var goodsList = [];
	var _payPrice = $('#payPrice').text();
	var _integralPrice =  $('#integralPrice').text();
	console.log(gNo)
	if (gNo.length <= 0) {
		layer.msg('请先添加商品');
		return false;
	}
	
	$('#Goods li').each(function (index, el) {
		var integralBillOptions = {
			"balance": 0,
			"goodsId": 0,
			"goodsNo": 0,
			"integral": 0,
			"cash": 0,
			"num": 0,
			"packet": 0,
			"sellType": 0
		};
		integralBillOptions.goodsNo = $(el).attr('data-gNo');
		integralBillOptions.goodsId = $(el).attr('data-goodsId');
		integralBillOptions.num = $(el).find('.number').text();
		integralBillOptions.integral = parseFloat($(el).find('.integral').text() / integralBillOptions.num);
		integralBillOptions.balance =  parseFloat($(el).find('.price').text() / integralBillOptions.num);
		//integralBillOptions.cash =     parseFloat($(el).find('.price').text() / integralBillOptions.num);
		integralBillOptions.sellType = PaymentKey;
		goodsList.push(integralBillOptions);
	})
	//console.log(goodsList)
	
	var data = {
		"integralBillOptions": goodsList,
		"sumMoney": _payPrice,
		"sumIntegral":_integralPrice,
		"token": token,
		"nick": nick,
		"payWay":PaymentKey
	}

	$.ajax({
		type: "post",
		url: payIntegralOrder,
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
			} else {
				layer.msg(rs.message)
			}
		}
	});
}



/**
 * 清空重置
 */

function reset() {
	$("#Goods").html('');
	$('#integralPrice').text('0.00');
	$('#balance').text('0.00');
	$('#ScanCodeMemberInput').show();
	$('#memberInfo').hide();
	gNo = [];
	curk = 0;
	isgNo = false;
	isMemberVal = false;
	num = 0;
	ListData.goodsListData = [];
	$.each($("input[type=radio]"), function () {
		$(this).removeAttr("disabled");
		$(this).removeAttr("checked");
	})
}


/**
 * 定义获取数组下标
 * @param arr
 * @param value
 * @returns {*}
 */


function returnIntegralIndex(arr, value) {
	var _curIndex;
	var a = arr;
	for (var i = 0; i < a.length; i++) {
		if (a[i].sellType == value) {
			_curIndex = i;
		}
	}
	//console.log(_curIndex);
	return _curIndex;
}

function returnSAIndexof(arr, value) {
	var _curIndex;
	
	var a = arr;
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
	var a = arr;
	for (var i = 0; i < a.length; i++) {
		if (a[i].goodsId == value) {
			_curIndex = i;
			isgNo = true;
		}
	}
	//console.log(_curIndex);
	return _curIndex;
}

	
