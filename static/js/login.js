$(document).keyup(function (e) {
    if (e.keyCode == 13) {
        signlog();
    }  
}); 

layer.config({
    offset : ['50%','70%']
})

if(localStorage.getItem("storeId") != ''){
	$('.lo_store').hide();
	$('.lo_employee').show();
	$('.lo_title').find('font').text('员工登录')
	$('.lo_title').find('span').show();
}


//门店注销 

$('.back_btn').on('click', function(e){
	e.preventDefault()
	
	$.ajax({
		type: "get",
		url: turl + "/cashier/login/storeLogout",
		xhrFields: {
            withCredentials: true
        },
		crossDomain: false,
		success: function(rs) {
			if(rs.status == 200){
					layer.msg('注销成功',{time:1000})
					$("#phone").val('')
					$("#storePwd").val('')
					$('.lo_store').show();
					$('.lo_employee').hide();
					$('.lo_title').find('span').hide();
					$('.lo_title').find('font').text('门店登录');
					localStorage.setItem("storeId",'');	
			}			
		}
	});
})

// 门店登录 
function signlogStore(){
	
	var phone= $("#phone").val();
	var storePwd=  $("#storePwd").val();

	if(phone  == "" || storePwd == "") {
		layer.msg("请填写信息");
		return;
	}
	
	$.ajax({
		type: "get",
		url: turl + "/cashier/login/storeLogin",
		data: {
			"phone": phone ,
			"code": storePwd,
			"loginType":2,
		},
		xhrFields: {
            withCredentials: true
        },
		crossDomain: false,
		success: function(rs) {
			if(rs.status == 200 || rs.status == 300){
					layer.msg('门店登录成功',{time:1000})
					localStorage.setItem("storeId",rs.data.id);	
					$('.lo_title').find('font').text('员工登录')
					$('.lo_store').hide();
					$('.lo_employee').show();
					$('.lo_title').find('span').show();
			}else{
				layer.msg(rs.message,{time:1000});
			}
			
		}
	});
}

// 修复员工 
$('.repair_btn').on('click', function(e){
	e.preventDefault()
	var username  = $("#names").val();
	var pwd = $("#pwds").val();
	if(username  == "" || pwd == "") {
		layer.msg("请填写信息");
		return;
	}
	
	$.ajax({
		type: "get",
		url: turl + "/cashier/login/repair",
		data: {
			"username": username ,
			"password": pwd
		},
		xhrFields: {
            withCredentials: true
        },
		crossDomain: true,
		success: function(rs) {
			if(rs.status=="200"){
				layer.msg(rs.message,{time:1000});			
			}else{				
				layer.msg(rs.message,{time:1000});
			}
			console.log(rs.message);
		}
	})
	
})

//员工登录

function signlog(){
	
	var username  = $("#names").val();
	var pwd = $("#pwds").val();
	if(username  == "" || pwd == "") {
		layer.msg("请填写信息");
		return;
	}	
	
	$.ajax({
		type: "get",
		url: turl + "/cashier/login/login",
		data: {
			"username": username ,
			"password": pwd
		},
		xhrFields: {
            withCredentials: true
        },
		crossDomain: true,
		success: function(rs) {
			if(rs.status=="200"){
				layer.msg('登录成功');
				localStorage.setItem("name",rs.data.name);
				

				setTimeout(function(){
					window.location.href = "longinState.html";
				},2000);
				
			}else{
				
				layer.msg(rs.message,{time:1000});
			}
			console.log(rs.message);
			//layer.msg(rs.msg);
		}
	})
}





