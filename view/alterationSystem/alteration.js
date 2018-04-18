// 下班

function getLogout() {
	layer.msg('下班成功', {
		time: 2000
	});
	setTimeout(function() {
		window.location.href = "login.html";
	}, 3000);
}

// 获取员工信息
function get() {}

$('.check_btn').on('click', function(e) {
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
		closeBtn: 0,
		shadeClose: false, //开启遮罩关闭
		area: ['1054px', '650px'], //宽高
		content: html,
		success: function(index, layero) {
			$.ajax({
				type: "get",
				url: logout,
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
						var html2 =  template('memberList', {
							value: rs.data
						});
						$("#gatheringList").html(html1);
						$("#memberlinfoList").html(html2);
						
					}
				}
			})
		}
	});

}