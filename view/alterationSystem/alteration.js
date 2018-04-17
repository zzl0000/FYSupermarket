// 下班

function getLogout(){
	
	 $.ajax({
        type: "get",
        url: logout,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(rs) {
            if (rs.status == 200) {
               layer.msg(rs.message,{time:1000});
				setTimeout(function(){
					window.location.href = "login.html";
				},3000)
            }

        }
    })
}


// 获取员工信息
function get(){}


function openPanel(){

   var html = $('#refundPanel');
   layer.open({
      title:'今日统计',
      type: 1,
      shadeClose: true, //开启遮罩关闭
      area: ['1054px', '650px'], //宽高
      content: html
    });

}
