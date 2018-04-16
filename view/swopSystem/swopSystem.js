




$('.refund_btn').on('click', function(){
    var html = $('#refundPanel');

    layer.open({
      title:'订单详情',
      type: 1,
      shadeClose: true, //开启遮罩关闭
      area: ['1054px', '650px'], //宽高
      content: html
    });
})
