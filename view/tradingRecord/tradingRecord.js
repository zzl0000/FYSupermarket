//  初始化
init()

function init() {
    getOrderList()
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

$('.check_btn').on('click', function(e) {
   var html = $('#refundPanel');
   layer.open({
      title:'订单详情',
      type: 1,
      shadeClose: true, //开启遮罩关闭
      area: ['1054px', '650px'], //宽高
      content: html
    });
})

