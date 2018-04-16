//  初始化
init();

function init() {
    getOrderList();
}
//  获取 所有订单数据

function getOrderList() {
    $.ajax({
        type: "get",
        url: getHangOrderList,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(rs) {
            if (rs.status == 200) {
                layer.msg(rs.message, { time: 1000 });
            }

        }
    })
}

// 删除挂单

$('.del_btn').on('click', function(e) {
    e.preventDefault();
    var orderId = $(this).attr('data-id');
    return;
    // $.ajax({
    // 	type: "get",
    // 	url: removeHangOrder,
    // 	data:{hangOrderId :orderId}
    // 	xhrFields: {
    //            withCredentials: true
    //        },
    // 	crossDomain: true,
    // 	success: function(rs) {
    // 		if(rs.status == 200){
    // 			layer.msg(rs.message,{time:1000});				
    // 		}		
    // 	}
    // })

})