init()

function init() {
	getOrderList(1)
}

//  获取 所有订单数据
function getOrderList(_curr) {
	layer.load(2);
	var data = {
		"pageNum": _curr,
		"pageSize": 10,
		"payWay": 0,
		"beginTime": format(new Date()),
		"endTime": format(new Date())
	}
	$.ajax({
		type: "get",
		url: findPage,
		xhrFields: {
			withCredentials: true
		},
		data: data,
		crossDomain: true,
		success: function(rs) {
			if(rs.status == 200) {
				var html = template('orderList', {
					list: rs.data.rows
				});
				setTimeout(function() {
					layer.closeAll('loading');
					$("#orderListDemo").html(html);
					gainpage(Math.ceil(rs.data.total / 10), _curr, 0);
				}, 500)

			}
		}
	})
}

function gainpage(pages, curr, alltotal) {
	console.log(alltotal)
	if(alltotal < 0) {
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

// 下班

function getLogout() {
	$.ajax({
		type: "get",
		url: logout,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(rs) {
			if(rs.status == 201 || rs.status == 200) {
				layer.msg('下班成功', {
					time: 1000
				});
				setTimeout(function() {
					window.location.href = "login.html";
				}, 2000);
			}
		}
	})

}

// 获取员工信息
function get() {}

$('body').on('click', '#alterationListDemo .check_btn', function(e) {
	var html = $('#refundPanel');
	layer.open({
		title: '订单详情',
		type: 1,
		shadeClose: true, //开启遮罩关闭
		area: ['1054px', '650px'], //宽高
		content: html
	});
})

function openPanel() {

	var html = $('#logoutPanel');
	layer.open({
		title: '今日统计',
		type: 1,
		closeBtn: 1,
		shadeClose: true, //开启遮罩关闭
		area: ['1054px', '650px'], //宽高
		content: html,
		success: function(index, layero) {
			$.ajax({
				type: "get",
				url: getCheckOut,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function(rs) {
					if(rs.status == 201 || rs.status == 200) {
						console.log(rs);
						var html1 = template('templateList', {
							value: rs.data
						});
						var html2 = template('memberList', {
							value: rs.data
						});
						$("#gatheringList").html(html1);
						$("#memberlinfoList").html(html2);
						$('#imprestCashLogout').text(rs.data.imprestCashLogout);
					}
				}
			})
		}
	});

}