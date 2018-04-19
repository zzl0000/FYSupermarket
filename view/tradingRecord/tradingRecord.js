//  初始化
init()

function init() {
		laydate.render({
		  elem: '#startDate',
		  theme: 'molv'
		});
		laydate.render({
		  elem: '#endDate',
		  theme: 'molv'
		});

    getOrderList()
}


// 查看详情

$('body').on('click','.check_btn', function(e) {
   var html = $('#refundPanel');
   var orderId = $(this).attr('data-id');
   layer.open({
      title:'订单详情',
      type: 1,
      shadeClose: true, //开启遮罩关闭
      area: ['1054px', '650px'], //宽高
      content: html,
      success:function(){
      		getOrderDetail(orderId);
      }
    });
})

function getOrderDetail(orderId){

	$.ajax({
        type: "get",
        url: findOrderDetail,
        data:{orderId:orderId},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(rs) {
            if (rs.status == 200) {
            	var html = template('orderDetailList', {
			        list: rs.data.orderOptionList
			    });
			     $("#orderDetailListDemo").html(html);
			    $('#realPrice').text(rs.data.order.receipt);
            	$('#payPrice').text(rs.data.order.totalMoney);
			}
        }
    })
}

function getStaffInfo(){
	
}
function getMemberInfo(){
	
}

//  获取 所有订单数据
function getOrderList() {
	layer.load(2);
    $.ajax({
        type: "get",
        url: findOrderAll,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(rs) {
            if (rs.status == 200) {
            	 var html = template('orderList', {
			        list: rs.data
			    });
            	setTimeout(function(){
            		 layer.closeAll('loading');
            		 $("#orderListDemo").html(html);
            	},500)
               	    
            }
        }
    })
}

