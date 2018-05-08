var _curnum;
var isClick = false;


$(function(){
	$(document).keydown(function(event){
		//alert(event.keyCode);
		if(event.keyCode == '13'){
			searchReturnOrder()
			
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
		layer.msg('请填写订单号')
		return false;
	}else{
		getReturnOrderList(orderId);
	}
}

function getReturnOrderList(orderId){
	$.ajax({
		type: "get",
		url: findReturnOrder,
		data: {
			orderId : orderId
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
				var payWayText =['无','现金','扫码','余额'];
				//console.log(rs);
				var html = template('returnOrderDetailList', {
					list: rs.data.orderOptionList
				});
				
				$("#returnOrderDetailListDemo").html(html);
				$('.nick').text(rs.data.nick);
				$('#realPrice').text(rs.data.receipt);
				$('#payPrice').text(rs.data.totalMoney);
				queryMenberIFFnfo(rs.data.token,function(val){
					//console.log(val);
					$('#nick').text(val.nick);
					$('#phone').text(val.phone);
					$('#orderCode').text(rs.data.orderNo);
					$('#payWay').text(payWayText[rs.data.payWay]);
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
						$(this).siblings(".number").text(addCount(_slef, num))
					}
				})
				$('body .minus').off('click').on('click', function (e) {
					e.preventDefault();
					var _slef = $(this);
					_slef.siblings('.add').removeClass('disabled');
					var num = $(this).siblings('.number').text();
					$(this).siblings(".number").text(minusCount(_slef, num))
				});
			} else {
				layer.msg(rs.message,{'time':1000});
				$('#group-select').show();
				$('#swopPanel').hide();
			}
		}
	})
}




// 数量计算
function addCount(el, num) {
	_curnum = parseInt(num) + 1;
	return _curnum;
}

function minusCount(el, _num) {
	_curnum = parseInt(_num) - 1;
	if (_curnum <= 1) {
		// console.log(el);
		el.addClass('disabled');
	}
	//console.log(num);
	return _curnum;
}


var goodsList = [];

$('body').off('click').on('click','.refund_btn', function(e){
	e.preventDefault()
	var orderId = $(this).attr('data-orderId');
	var data =JSON.parse($(this).attr('data-orderData'));
	var num = $(this).parent().siblings().find('.number').text();
	var key = $(this).parent().siblings().find('input').is(':checked');
	if(!key){
		layer.msg('请选择退货商品',{'time':1000});
	}else{
		var goodsInfo = {
			"fromSkuId":'0',
			"gno": '0',
			"goodsId": 0,
			"goodsName": 0,
			"money":0,
			"num": 0,
			"selected": 0,
			'specValueId':0,
		};
		goodsInfo.fromSkuId = data.fromSkuId;
		goodsInfo.gno = data.gno;
		goodsInfo.goodsId = data.goodsId;
		goodsInfo.goodsName = data.goodsName;
		goodsInfo.money = data.money;
		goodsInfo.num = num;
		goodsInfo.selected = data.selected;
		goodsInfo.specValueId = data.specValueId;
		
		goodsList.push(goodsInfo);
		
		batchReturnAjax(orderId,goodsList)
	}
	
})


function getBatchReturn(){
	var orderId;
	var data = [];
	var numArray = [];
	$('input[type=checkbox]').each(function(){
		if($(this).is(':checked')){
				data.push(JSON.parse($(this).parent().siblings().find('.refund_btn').attr('data-orderData')));
				numArray.push($(this).parent().siblings().find('.number').text());
		}else{
			layer.msg('请选择退货商品',{'time':1000});
		}
	});
	for(var i=0 ; i<data.length; i++){
		var goodsInfo = {
			"fromSkuId":'0',
			"gno": '0',
			"goodsId": 0,
			"goodsName": 0,
			"money":0,
			"num": 0,
			"selected": 0,
			'specValueId':0,
		};
		orderId =  data[i].orderId;
		goodsInfo.fromSkuId = data[i].fromSkuId;
		goodsInfo.gno =  data[i].gno;
		goodsInfo.goodsId =  data[i].goodsId;
		goodsInfo.goodsName =  data[i].goodsName;
		goodsInfo.money =  data[i].money;
		goodsInfo.num = numArray[i];
		goodsInfo.selected =  data[i].selected;
		goodsInfo.specValueId =  data[i].specValueId;
		goodsList.push(goodsInfo)
	}
	
	batchReturnAjax(orderId,goodsList)
}


function batchReturnAjax(orderId,goodsList){
	//console.log(goodsList)
	if(goodsList.length <= 0){
		layer.msg('请选择退货商品',{'time':1000});
		return false;
	}else{
		var data = {
			"orderId":orderId,
			"returnBillOptionList": goodsList
		}
		
		$.ajax({
			type: "post",
			url: batchReturn,
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function (rs) {
				if (rs.status == 200) {
					layer.msg('退货成功',{'time':1000});
					getReturnOrderList(orderId)
				} else {
					layer.msg(rs.message,{'time':1000});
				}
			}
		})
	}
	
}
