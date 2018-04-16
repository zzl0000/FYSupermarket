/**
 * 
 */

var num, _curnum;
var price, unitPrice,_unitPrice, realPrice,couponPrice = $('#couponPrice').text(),integralPrice = $('#integralPrice').text();

$('.add').on('click', function(e) {
	e.preventDefault();
	
	num = $(this).siblings('.number').text();
	realPrice = $('#realPrice').text();
	if(num <= 0){
		unitPrice = 5;
		$(this).siblings('.minus').removeClass('disabled');
	}else{
		unitPrice = $(this).parent().siblings().text().substring(1) / num;
		
	}
	
	
	$(this).siblings(".number").text(addCount(num))
	$(this).parent().siblings().text(priceCount(unitPrice, _curnum));
	realPriceCount("add",realPrice,unitPrice);
})

$('.minus').on('click', function(e) {
	e.preventDefault();
	var _slef = $(this);
	num = $(this).siblings('.number').text();
	realPrice = $('#realPrice').text();
	if(num == 0){
		unitPrice = $(this).parent().siblings().text().substring(1)
	}else{
		unitPrice = $(this).parent().siblings().text().substring(1) / num;
	}
	$(this).siblings(".number").text(minusCount(_slef,num))
	$(this).parent().siblings().text(priceCount(unitPrice, _curnum));
	realPriceCount("minus",realPrice,unitPrice);
})

// 输入键盘 
var _relTakePrice = 0;
var _inputkey = 0;
var _specialKey = 0 ;
$('.input-key').on('click', function(e){
	
	e.preventDefault();
	var _curval = $(this).text();
	
	_inputkey = _inputkey += _curval
	_relTakePrice = parseFloat(_inputkey) + parseFloat(_specialKey)
	$('#relTakePrice').val(_relTakePrice);
})

$('.specialKey').on('click' ,function(e){
	e.preventDefault();
	var _curval = $(this).text().substring(1);	
	_specialKey =  parseFloat(_specialKey) + parseFloat(_curval);
	_relTakePrice = parseFloat(_inputkey) + parseFloat(_specialKey);
	$('#relTakePrice').val(_relTakePrice);
})



// 重置键盘
function resetKeyboard(){
	$('#relTakePrice').val('')
	_relTakePrice = 0;
}




// 数量计算
function addCount(num) {
	_curnum = parseInt(num) + 1;
	return _curnum
}

function minusCount(el,num) {
	_curnum = parseInt(num) - 1;
	if(_curnum <= 0) {
		_curnum = 0;	
		el.addClass('disabled');
	}
	return _curnum
}

// 价格计算

function priceCount(unitPrice, _curnum) {

	_unitPrice = parseInt(unitPrice) * _curnum;
	//console.log(key);
	return '¥' +  _unitPrice.toFixed(2);
}

function realPriceCount(type,realPrice,unitPrice){
	var _realPrice ,_payPrice;
	//console.log(realPrice,unitPrice)
	if(unitPrice <= 0){
		return false;
	}
	
	if(type == "add"){
		_realPrice = (parseInt(realPrice) +  unitPrice).toFixed(2);
	}else if(type == "minus"){
		_realPrice = (parseInt(realPrice) -  unitPrice).toFixed(2);
		if(_realPrice <= 0){
			_realPrice = 0;
		}
	}
	if(_realPrice == 0){
		_payPrice = 0;
	}else{
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

function checkOut(){
	
}
