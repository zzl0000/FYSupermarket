/**
 * 
 */

var num, _curnum;
var price, unitPrice, _unitPrice, realPrice, couponPrice = $('#couponPrice').text(),
	integralPrice = $('#integralPrice').text();
var _realPrice, _payPrice;
$('.add').on('click', function(e) {
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

$('.minus').on('click', function(e) {
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

$('.input-key').on('click', function(e) {

	e.preventDefault();
	if (!isSpecialKey && !isdecimalKey) {
		_relTakePrice = 0;
	}
	var _curval = $(this).text();
	var key; 
	
	_inputkey += _curval;
	_relTakePrice = _relTakePrice + _inputkey;

	if(isdecimalKey){
		_inputkey = '';	
		
		if(_relTakePrice.split('.')[1].length > 2){			
			layer.msg('小数位数书不能超过两位');
			return;
		}
		key = parseFloat(_relTakePrice);
	}else{
		key = parseFloat(_specialKey + _inputkey);
	}
	
	keyCount(key)
})

$('.specialKey').on('click', function(e) {
	e.preventDefault();
	_inputkey = '';
	var _curval = $(this).text().substring(1);
	_specialKey = parseFloat(_relTakePrice) + parseFloat(_curval)
	//console.log(_specialKey, _relTakePrice, _curval)
	_relTakePrice = _specialKey;
	isSpecialKey = true;

	keyCount(_relTakePrice)
})

$('.decimal').on('click',function() {
	$(this).addClass('disabled');
	if ($('#relTakePrice').val() == '') {
		return false;
	}
	decimal = $(this).text();
	
	var key = parseFloat(_relTakePrice) + decimal;
	_relTakePrice =  parseFloat(_relTakePrice) + decimal;
	isdecimalKey = true;
	
	_inputkey = '';
	keyCount(key);
})

function keyCount(val) {
	var price = _payPrice || $('#payPrice').text();
	console.log(price);
	if(parseFloat(val) > parseFloat(price)){
		layer.msg('输入的价格不能大于应收金额');
		return;
	}
	$('#relTakePrice').val(val);
}

// 重置键盘
function resetKeyboard() {
	$('.decimal').removeClass('disabled');
	$('#relTakePrice').val('');
	_relTakePrice = 0;
	_inputkey = '';
	_specialKey = 0;
	isdecimalKey = false;
	isSpecialKey = false;
}

// 数量计算
function addCount(num) {
	_curnum = parseInt(num) + 1;
	return _curnum
}

function minusCount(el, num) {
	_curnum = parseInt(num) - 1;
	if (_curnum <= 0) {
		_curnum = 0;
		el.addClass('disabled');
	}
	return _curnum
}

// 价格计算

function priceCount(unitPrice, _curnum) {

	_unitPrice = parseInt(unitPrice) * _curnum;
	//console.log(key);
	return '¥' + _unitPrice.toFixed(2);
}

function realPriceCount(type, realPrice, unitPrice) {
	
	//console.log(realPrice,unitPrice)
	if (unitPrice <= 0) {
		return false;
	}

	if (type == "add") {
		_realPrice = (parseInt(realPrice) + unitPrice).toFixed(2);
	} else if (type == "minus") {
		_realPrice = (parseInt(realPrice) - unitPrice).toFixed(2);
		if (_realPrice <= 0) {
			_realPrice = 0;
		}
	}
	if (_realPrice == 0) {
		_payPrice = 0;
	} else {
		_payPrice = (_realPrice - couponPrice - integralPrice).toFixed(2);
	}

	$('#realPrice').text(_realPrice);
	$('.payPrice').text(_payPrice)
}

// 清空重置

function reset() {}

// 挂账

function uplodOrder() {

}

// 结账

function checkOut() {

}