function back() {
	history.go(-1);
}

// 上班 状态

function getUpdateStatus(stat) {

	$.ajax({
		type: "get",
		url: updateStatus,
		data: {
			status: stat
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(rs) {
			if (rs.status == 200) {
				layer.msg(rs.message, {
					time: 1000
				});
                sessionStorage.setItem('dutyType',stat);
				if (stat == "1") {
					getUpdateImprestCash();
				} else {
					setTimeout(function() {
						window.location.href = "index.html";
					}, 2000)
				}

			}

		}
	})

}

function getUpdateImprestCash() {
	layer.prompt({
		title: '更新备用现金',
        closeBtn:0,
        shadeClose :true,
        formType: 0
	}, function(pass, index) {
		$.ajax({
				type: "get",
				url: updateImprestCash,
				data: {
					imprestCash: pass
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function(rs) {
					if (rs.status == 200) {
						layer.msg(rs.message);
						setTimeout(function() {
							window.location.href = "index.html";
						}, 2000)

					} else {
						layer.msg(rs.message);
					}

				}
			})
			//layer.close(index);
	});
}