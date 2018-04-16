$(document).keyup(function (e) {
    if (e.keyCode == 13) {
        signlog();
    }  
}); 

layer.config({
    offset : ['50%','70%']
})


/*登录*/
function signlog() {
	getStoreId();	
}

function getStoreId (){
	var username  = $("#names").val();
	var pwd = $("#pwds").val();
	if(username  == "" || pwd == "") {
		layer.msg("请填写信息");
		return;
	}
	$.ajax({
		type: "get",
		url: turl + "/cashier/login/storeLogin?storeId=1",
		xhrFields: {
            withCredentials: true
        },
		crossDomain: false,
		success: function(rs) {
			if(rs.status == 200){
				localStorage.setItem("storeId","1");			
				getLogin(username,pwd);
			}
			
		}
	})
}

function getLogin(username,pwd){
		
	
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
				setTimeout(function(){
					window.location.href = "longinState.html";
				},3000);
				
			}else{
				layer.msg(rs.message,{time:1000});
			}
			console.log(rs.message);
			//layer.msg(rs.msg);
		}
	})
}





