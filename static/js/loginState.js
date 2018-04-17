

function back(){
	history.go(-1);
}


// 上班 状态

function getUpdateStatus(data){

	$.ajax({
		type: "get",
		url: updateStatus,
		data:{status:data},
		xhrFields: {
            withCredentials: true
        },
		crossDomain: true,
		success: function(rs) {
			if(rs.status == 200){
				layer.msg(rs.message,{time:1000});
				setTimeout(function(){
					window.location.href = "index.html";
				},2000)
				
			}
			
		}
	})

}

