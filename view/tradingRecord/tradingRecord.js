
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

	getOrderList(1)
}

// 查看详情

$('body').on('click', '#orderListDemo .check_btn', function(e) {
	e.preventDefault();
	var html = $('#refundPanel');
	var orderId = $(this).attr('data-id');
	layer.open({
		title: '订单详情',
		type: 1,
		shadeClose: true, //开启遮罩关闭
		area: ['1054px', '650px'], //宽高
		content: html,
		success: function() {
			getOrderDetail(orderId);
		}
	});
})

function getOrderDetail(orderId) {

	$.ajax({
		type: "get",
		url: findOrderDetail,
		data: {
			orderId: orderId
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(rs) {
			if(rs.status == 200) {
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

//  获取 所有订单数据
function getOrderList(_curr) {
	layer.load(2);
	var data = {
		"pageNum": _curr,
		"pageSize": 10,
		"payWay": 0,
		"beginTime": '2017-07-09',
		"endTime": '2018-07-10'
	}
	$.ajax({
		type: "get",
		url: findPage,
		xhrFields: {
			withCredentials: true
		},
		data:data,
		crossDomain: true,
		success: function(rs) {
			if(rs.status == 200) {
				var html = template('orderList', {
					list: rs.data.rows
				});
				setTimeout(function() {
					layer.closeAll('loading');
					$("#orderListDemo").html(html);
					gainpage(Math.ceil(rs.data.total/10),_curr,0);
				}, 500)

			}
		}
	})
}


function gainpage(pages,curr, alltotal) {
	console.log(alltotal)
    if (alltotal < 0) {
        return false;
    } else {
        laypage({
            cont: 'page',
            skip: true, //是否开启跳页
            skin: '#1E9FFF',
            pages: pages,
            curr: curr || 1,
            jump: function(obj, first) {
                var curr = obj.curr;
                if(!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
				 	getOrderList(curr);
				}              	
            }
        })
    }
}
