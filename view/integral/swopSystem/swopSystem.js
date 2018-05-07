


$('#search').on('click', function(e){
	e.preventDefault();
	var orderId = $('#storeOrderId').val();
	if(orderId == ''){
		layer.msg('请填写订单号')
		return false;
	}else{
		getReturnOrderList(orderId);
	}
})

function getReturnOrderList(orderId){
	$.ajax({
		type: "get",
		url: findIntegralOrder,
		data: {
			integralOrderId  : orderId
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
				var html = template('orderDetailList', {
					list: rs.data.integralOrderOptionList
				});
				
				$("#orderDetailListDemo").html(html);
				$('.nick').text(rs.data.nick);
				$('#realPrice').text(rs.data.cash);
				$('#couponPrice').text(rs.data.fubi);
				$('#integralPrice').text(rs.data.integral);
				
				queryMenberIFFnfo(rs.data.token,function(val){
					//console.log(val);
					$('#nick').text(val.nick);
					$('#phone').text(val.phone);
					$('#orderCode').text(rs.data.integralOrderNo);
					//$('#payWay').text(payWayText[rs.data.payWay]);
					$('#payTime').text(rs.data.payTime);
					$('#employeeName').text(rs.data.employeeName);
					
				})
			} else {
				layer.msg(rs.message)
			}
		}
	})
}


var goodsList = [];
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
$('body').off('click').on('click','.refund_btn', function(e){
	e.preventDefault()
	var orderId = $(this).attr('data-orderId');
	var data =JSON.parse($(this).attr('data-orderData'));
	
	var key = $(this).parent().siblings().find('input').is(':checked');
	if(!key){
		layer.msg('请选择退货商品',{'time':1000});
	}else{
		
		goodsInfo.balance = data.balance;
		goodsInfo.cash = data.cash;
		goodsInfo.fromSkuId = data.fromSkuId;
		goodsInfo.fubi = data.fubi;
		goodsInfo.goodsId = data.goodsId;
		goodsInfo.num = 1;
		goodsInfo.goodsName = data.goodsName;
		goodsInfo.goodsNo = data.goodsNo;
		goodsInfo.integral = data.integral;
		goodsInfo.sellType = data.sellType;
		
		
		goodsList.push(goodsInfo);
		
		batchReturnAjax(orderId,goodsList)
	}
	
})


function getBatchReturn(){
	var orderId;
	var data = [];
	$('input[type=checkbox]').each(function(){
		if($(this).is(':checked')){
			data.push(JSON.parse($(this).parent().siblings().find('.refund_btn').attr('data-orderData')));
			orderId =  data.orderId;
		}else{
			layer.msg('请选择退货商品',{'time':1000});
		}
	});
	for(var i=0 ; i<data.length; i++){
		goodsInfo.balance = data.balance;
		goodsInfo.cash = data.cash;
		goodsInfo.fromSkuId = data.fromSkuId;
		goodsInfo.fubi = data.fubi;
		goodsInfo.goodsId = data.goodsId;
		goodsInfo.num = 1;
		goodsInfo.goodsName = data.goodsName;
		goodsInfo.goodsNo = data.goodsNo;
		goodsInfo.integral = data.integral;
		goodsInfo.sellType = data.sellType;
		goodsList[i] = goodsInfo
	}
	
	console.log(goodsList);
	
	batchReturnAjax(orderId,goodsList)
}


function batchReturnAjax(orderId,goodsList){
	//console.log(goodsList)
	if(goodsList.length <= 0){
		layer.msg('请选择退货商品',{'time':1000});
		return false;
	}else{
		var data = {
			"integralOrderId":orderId,
			"integralReturnBillOptionList": goodsList
		}
		return;
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
					layer.msg('退货成功',{'time':1000});
					getReturnOrderList(orderId)
				} else {
					layer.msg(rs.message,{'time':1000});
				}
			}
		})
	}
	
}
