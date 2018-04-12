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
	window.location.href = "index.html";
//	var name = $("#names").val();
//	var pwd = $("#pwds").val();
//	if(name == "" || pwd == "") {
//		layer.msg("请填写信息");
//		return;
//	}
	
	
//	$.ajax({
//		type: "post",
//		url: turl + "/tsystemuser/systemuserLogin",
//		data: {
//			"name": name,
//			"password": pwd
//		},
//		success: function(rs) {
//			if(rs.status=="200"){
//				var sybc="";
//				if(rs.data.isAgent){
//					$.ajaxSetup({ 
//					    async : false 
//					});
//					$.post(querySeller,{
//						"pro":rs.data.agent[0].pro,
//						"city":rs.data.agent[0].city,
//						"area":rs.data.agent[0].area,
//						"isDelete":0,
//						"startPage":1,
//						"pageSize":1000
//					},function(rs){
//						console.log(rs);
//						for(var i=0;i<rs.total;i++){
//							sybc+=','+rs.data[i].id;
//						}
//					})
//					console.log(sybc.substr(1));
//					localStorage.setItem("numlsid",sybc.substr(1));
//				}else{
//					localStorage.setItem("numlsid","");
//				}
//				//加载层
//				var index = layer.load(0, {
//					shade: [0.3, '#000'],
//					time: 5000
//				});
//				localStorage.setItem("ZTsellerId","");
//				localStorage.setItem("roldId",rs.data.roles[0].name)
//				localStorage.setItem("adminId",rs.data.id);
//				localStorage.setItem("roleId",rs.data.roleId);
//				window.location.href = "index.html";
//			}else{
//				layer.msg(rs.msg,{time:1000});
//			}
//			console.log(rs.msg);
//			//layer.msg(rs.msg);
//		}
//	})
}
/*获取验证码*/
var countdown = 60;
function timeon() {
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if(!myreg.test($("#number").val()) || $("#number").val().length < 11) {
		layer.msg('请输入有效的手机号码！');
		return false;
	} else {
		$("#cation").attr("onclick", "");
		settime();
	}
}

function settime() {
	if(countdown == 0) {
		$("#cation").attr("onclick", "timeon()")
		$("#cation").text("重新获取");
		countdown = 60;
	} else {
		$("#cation").attr("onclick", "");
		$("#cation").text(countdown + "s后重新获取");
		countdown--;
		setTimeout(function() {
			settime();
		}, 1000);
	}
}
/*確定找回密碼*/
function backlog(){
	/*手機號*/
	var phone=$("").val();
	/**/
}


