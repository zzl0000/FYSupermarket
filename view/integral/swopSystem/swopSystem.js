

var _curnum;

$(function(){
	$('#storeOrderId').keydown(function(event){
		//alert(event.keyCode);
		if(event.keyCode == '13'){
			searchReturnOrder();

			
			
		}
	});
	
	$('#search').on('click', function(e){
		e.preventDefault();
		searchReturnOrder();
	});
})


function searchReturnOrder(){
	var orderId = $('#storeOrderId').val();
	if(orderId == ''){
		layer.msg('请填写订单号');
		return false;
	}else{
		layer.prompt({
			title: '获取退换货授权',
			closeBtn: 2,
			shade: 0.8,
			formType: 0
		}, function (pass, index) {
			$.ajax({
				type: "get",
				url: authorize,
				data: {
					username: pass
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function (rs) {
					if (rs.status == 200) {
						layer.msg('授权成功', {'time': 1000}, function () {
							getReturnOrderList(orderId);
						})
					} else {
						layer.msg(rs.message, {'time': 1000});
					}
					
				}
				
			})
		});
		
	}
}

function getReturnOrderList(orderId) {
	$.ajax({
		type: "get",
		url: findIntegralOrder,
		data: {
			integralOrderId: orderId
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (rs) {
			if (rs.status == 200) {
				$('#group-select').hide();
				$('#swopPanel').show();
				$('#storeOrderId').val('');
				//var payWayText =['无','现金','扫码','余额'];
				//console.log(rs);
				var html = template('returnOrderDetailList', {
					list: rs.data.integralOrderOptionList
				});
				
				$("#returnOrderDetailListDemo").html(html);
				$('.nick').text(rs.data.nick);
				queryMenberIFFnfo(rs.data.token, function (val) {
					//console.log(val);
					$('#nick').text(val.nick);
					$('#phone').text(val.phone);
					$('#orderCode').text(rs.data.integralOrderNo);
					//$('#payWay').text(payWayText[rs.data.payWay]);
					$('#payTime').text(rs.data.payTime);
					$('#employeeName').text(rs.data.employeeName);
					
				})
				$('body .add').off('click').on('click', function (e) {
					e.preventDefault();
					var _slef = $(this);
					var num = $(this).siblings('.number').text();
					var key = $(this).attr("data-num");
					_slef.siblings('.minus').removeClass('disabled');
					//console.log(key)
					if(num >= key){
						layer.msg('退货数量不能超过订单数量',{'time':1000});
						_slef.addClass('disabled');
						return false;
					}else{
						$(this).siblings(".number").text(addCount(_slef, num));
						$('#returnPrice').text(returnPriceCount('add',_slef,addCount(_slef, num)));
					}
				})
				$('body .minus').off('click').on('click', function (e) {
					e.preventDefault();
					var _slef = $(this);
					_slef.siblings('.add').removeClass('disabled');
					var num = $(this).siblings('.number').text();
					if(num <= 1 ){
						_slef.addClass('disabled');
						return false;
					};
					$(this).siblings(".number").text(minusCount(_slef, num))
					$('#returnPrice').text(returnPriceCount('minus',_slef,minusCount(_slef, num)));
				});
				
				var _returnPrice = [];
				
				$('body input[type=checkbox]').off('click').on('click', function(){
					
					var price = parseFloat($(this).parent().siblings().find('.number').text() * $(this).attr('data-money')).toFixed(2);
					var id = $(this).val();
					//console.log($(this).attr('data-money'));
					if($(this).is(':checked')){
						_returnPrice[id] = price ;
					}else{
						_returnPrice[id] = 0;
					}
					$('#returnPrice').text(sum(_returnPrice));
				});
			} else {
				layer.msg(rs.message, {'time': 1000});
				$('#group-select').show();
				$('#swopPanel').hide();
			}
		}
	})
}


// 数量计算
function addCount(el, num) {
	el.removeClass('disabled');
	_curnum = parseInt(num) + 1;
	return _curnum;
}

function minusCount(el, _num) {
	_curnum = parseInt(_num) - 1;
	if (_curnum < 1) {
		// console.log(el);
		el.addClass('disabled');
		_curnum = 1;
	}
	return _curnum;
}


function sum(arr) {
	return eval(arr.join("+")).toFixed(2);
};

function returnPriceCount(type,el,_num){
	console.log(_num)
	var isChecked = $(el).parent().siblings().find('input');
	if(isChecked.is(':checked')){
		var _returnPrice =  $('#returnPrice').text();
		if(type == "add"){
			_returnPrice = parseFloat(_returnPrice) + parseFloat($(el).parent().siblings('.unitPrice').text().substring(1))
		}else{
			_returnPrice = parseFloat(_returnPrice) - parseFloat($(el).parent().siblings('.unitPrice').text().substring(1))
		}
	}else{
		_returnPrice = 0;
	}
	
	return _returnPrice.toFixed(2);
}

var goodsList = [];

$('body').off('click').on('click', '.refund_btn', function (e) {
	e.preventDefault();
	var orderId = $(this).attr('data-orderId');
	var data = JSON.parse($(this).attr('data-orderData'));
	var num = $(this).parent().siblings().find('.number').text();
	var key = $(this).parent().siblings().find('input').is(':checked');
	if (!key) {
		layer.msg('请选择退货商品', {'time': 1000});
	} else {
		var goodsInfo = {
			"fromSkuId": '0',
			"goodsNo": '0',
			"balance": 0,
			"goodsId": 0,
			"goodsName": 0,
			"fubi": 0,
			"cash": 0,
			"integral": 0,
			"num": 0,
			'sellType': 0,
		};
		goodsInfo.balance = data.balance;
		goodsInfo.cash = data.cash;
		goodsInfo.fromSkuId = data.fromSkuId;
		goodsInfo.fubi = data.fubi;
		goodsInfo.goodsId = data.goodsId;
		goodsInfo.num = num;
		goodsInfo.goodsName = data.goodsName;
		goodsInfo.goodsNo = data.goodsNo;
		goodsInfo.integral = data.integral;
		goodsInfo.sellType = data.sellType;
		
		goodsList.push(goodsInfo);
		
		batchReturnAjax(orderId, goodsList)
	}
	
})


function getBatchReturn() {
	var orderId;
	var data = [];
	var numArray = [];
	$('input[type=checkbox]').each(function () {
		if ($(this).is(':checked')) {
			data.push(JSON.parse($(this).parent().siblings().find('.refund_btn').attr('data-orderData')));
			numArray.push($(this).parent().siblings().find('.number').text());
		} else {
			layer.msg('请选择退货商品', {'time': 1000});
		}
	});
	for (var i = 0; i < data.length; i++) {
		var goodsInfo = {
			"fromSkuId": '0',
			"goodsNo": '0',
			"balance": 0,
			"goodsId": 0,
			"goodsName": 0,
			"fubi": 0,
			"cash": 0,
			"integral": 0,
			"num": 0,
			'sellType': 0,
		};
		orderId = data[i].integralOrderId;
		goodsInfo.balance = data[i].balance;
		goodsInfo.cash = data[i].cash;
		goodsInfo.fromSkuId = data[i].fromSkuId;
		goodsInfo.fubi = data[i].fubi;
		goodsInfo.goodsId = data[i].goodsId;
		goodsInfo.num = numArray[i];
		goodsInfo.goodsName = data[i].goodsName;
		goodsInfo.goodsNo = data[i].goodsNo;
		goodsInfo.integral = data[i].integral;
		goodsInfo.sellType = data[i].sellType;
		goodsList.push(goodsInfo);
	}
	
	console.log(orderId);
	
	batchReturnAjax(orderId, goodsList)
}


function batchReturnAjax(orderId, goodsList) {
	console.log(orderId,goodsList)
	if (goodsList.length <= 0) {
		layer.msg('请选择退货商品', {'time': 1000});
		return false;
	} else {
		layer.confirm('是否退货',
			{
				closeBtn: 2,
				shadeClose: true, //开启遮罩关闭
				btn: ['是', '否']
			}, function () {
				var data = {
					"integralOrderId": orderId,
					"integralReturnBillOptionList": goodsList
				}
				
				$.ajax({
					type: "post",
					url: integralReturn,
					data: JSON.stringify(data),
					contentType: "application/json",
					dataType: 'json',
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success: function (rs) {
						if (rs.status == 200) {
							layer.msg('退货成功',{'time':1000},function(){
								$('#group-select').show();
								$('#swopPanel').hide();
							});
						} else {
							layer.msg(rs.message, {'time': 1000});
						}
					}
				})
			}, function () {
				layer.closeAll();
			});
	}
	
}
