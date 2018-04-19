//  初始化
init();

function init() {
	laydate.render({
		elem: '#startDate',
		theme: 'molv'
	});
	laydate.render({
		elem: '#endDate',
		theme: 'molv'
	});
	getOrderList();
}
//  获取 所有订单数据

function getOrderList() {
	layer.load(2);
	$.ajax({
		type: "get",
		url: getHangOrderList,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(rs) {
			//console.log(rs.data);
			var html = '';
			if(rs.status == 200) {
				if(rs.data.length == 0) {
					html = ''
					$("#noeList").show();
					layer.closeAll('loading');
				} else {
					$("#noeList").hide()
					html = template('HangOrderList', {
						list: rs.data
					});
				}
				setTimeout(function() {
					layer.closeAll('loading');
					$("#HangOrderListDemo").html(html);
					$('#cashierName').text(localStorage.getItem("name"))
				}, 500)
			}

		}
	})
}

// 删除挂单

$('body').on('click', '.del_btn', function(e) {
	e.preventDefault();
	var hangOrderId = $(this).attr('data-id');
	$.ajax({
		type: "get",
		url: removeHangOrder,
		data: {
			hangOrderId: hangOrderId
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(rs) {
			if(rs.status == 200) {
				layer.msg(rs.message, {
					time: 1000
				}, function() {
					init();
				});

			}
		}
	})
})