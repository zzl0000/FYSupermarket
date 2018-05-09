



//console.log(sessionStorage.getItem("storeId"))

if (sessionStorage.getItem("storeId") != null) {
    $('.lo_store').hide();
    $('.lo_employee').show();
    $('.lo_title').find('font').text('员工登录')
    $('.lo_title').find('span').show();
}



//门店注销 

$('.back_btn').on('click', function (e) {
	
    e.preventDefault()

    $.ajax({
        type: "get",
        url: turl + "/cashier/login/storeLogout",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: false,
        success: function (rs) {
            if (rs.status == 200) {
                layer.msg('注销成功', {time: 1000})
	            $('#signlogStore').removeAttr('disabled');
                $("#phone").val('')
                $("#storePwd").val('')
                $('.lo_store').show();
                $('.lo_employee').hide();
                $('.lo_title').find('span').hide();
                $('.lo_title').find('font').text('门店登录');
                sessionStorage.removeItem('storeId');
                window.onunload = function () {
                    sessionStorage.clear();
                }
            }
        }
    });
})

// 门店登录 
function signlogStore() {
	
    var phone = $("#phone").val();
    var storePwd = $("#storePwd").val();

    if (phone == "" || storePwd == "") {
        layer.msg("请填写信息");
        return;
    }

    $.ajax({
        type: "get",
        url: turl + "/cashier/login/storeLogin",
        data: {
            "phone": phone,
            "code": storePwd,
            "loginType": 1,
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: false,
        success: function (rs) {
        	
            if (rs.status == 200) {
	            sessionStorage.setItem("offLine", rs.data);
	            $('#signlogStore').attr({'disabled':"disabled"});
	            layer.confirm('门店登录成功，是否同步数据',
		            {
			            btn: ['同步', '否']
		            }, function () {
			            inStepData(phone);
		            },function () {
			            layer.closeAll();
			            sessionStorage.setItem("storeId", phone);
			            $('.lo_title').find('font').text('员工登录')
			            $('.lo_store').hide();
			            $('.lo_employee').show();
			            $('.lo_title').find('span').show();
		            })
	
            }else if(rs.status == 201){
	            sessionStorage.setItem("offLine", null);
	            layer.msg(rs.message, {time: 1000});
	            $('.lo_title').find('font').text('员工登录')
	            $('.lo_store').hide();
	            $('.lo_employee').show();
	            $('.lo_title').find('span').show();
            }
            else{
                layer.msg(rs.message, {time: 1000});
            }

        }
    });
}

function inStepData(phone){
	layer.config({
		offset: ['50%', '50%']
	})
	var index = layer.load(2)
	$.ajax({
		type: "get",
		url: turl + "/cashier/synchronize/data",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (rs) {
			if (rs.status == "200") {
				layer.close(index);
				sessionStorage.setItem("storeId", phone);
				layer.msg(rs.message, {time: 1000},function(){
					$('.lo_title').find('font').text('员工登录')
					$('.lo_store').hide();
					$('.lo_employee').show();
					$('.lo_title').find('span').show();
				});
				
			} else {
				layer.msg(rs.message, {time: 1000});
				$('#signlogStore').removeAttr('disabled');
				layer.close(index);
			}
		}
	})
}

// 修复员工 
$('.repair_btn').on('click', function (e) {
    e.preventDefault()
    var username = $("#names").val();
    if (username == "" ){
        layer.msg("请填写信息");
        return;
    }

    $.ajax({
        type: "get",
        url: turl + "/cashier/login/logout",
        data: {
            "username": username
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (rs) {
            if (rs.status == "200") {
                layer.msg(rs.message, {time: 1000});
            } else {
                layer.msg(rs.message, {time: 1000});
            }
            console.log(rs.data);
        }
    })

})

//员工登录

function signlog() {
	
    var username = $("#names").val();
    var pwd = $("#pwds").val();
    if (username == "" || pwd == "") {
        layer.msg("请填写信息");
        return;
    }
	layer.config({
		offset: ['50%', '60%']
	})
    $.ajax({
        type: "get",
        url: turl + "/cashier/login/login",
        data: {
            "username": username,
            "password": pwd
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (rs) {
            if (rs.status == "200") {
                layer.msg('登录成功');
                sessionStorage.setItem("name", rs.data.name);

                setTimeout(function () {
                    window.location.href = "longinState.html";
                }, 2000);

            } else if(rs.status == 302){
                layer.msg(rs.message, {time: 1000});
            }else {
                layer.msg(rs.message, {time: 1000});
            }
            //console.log(rs.message);
            //layer.msg(rs.msg);
        }
    })
}





