
//  初始化
var payWay,beginTime,endTime,_curr;

init();

function init() {

    laydate.render({
        elem: '#startDate',
        theme: 'molv',
        value: new Date(),
        max: 0,
        done: function(value){
            beginTime = value;
            getOrderList(_curr,payWay,beginTime,endTime);
        }

    });
    laydate.render({
        elem: '#endDate',
        theme: 'molv',
        value: new Date(),
        max: 0,
        done: function(value){
            endTime = value;
            getOrderList(_curr,payWay,beginTime,endTime);
        }
    });

    payWay = $('#cateone').val();
    beginTime =$('#startDate').val();
    endTime =$('#endDate').val();
    _curr = 1;

    getOrderList(_curr,payWay,beginTime,endTime);
}

$('#cateone').change(function(){
    payWay = $(this).val();
    getOrderList(_curr,payWay,beginTime,endTime);
})




// 查看详情

$('body').off('click').on('click', '#orderListDemo .check_btn', function(e) {
    e.preventDefault();
    var html = $('#refundPanel');
    var orderId = $(this).attr('data-id');
    layer.open({
        title: '订单详情',
        type: 1,
        closeBtn:2,
        shadeClose: true, //开启遮罩关闭
        area: ['1054px', '650px'], //宽高
        content: html,
        success: function() {
            getOrderDetail(orderId);
        }
    });
})

function getOrderDetail(orderId) {

    $.ajax({
        type: "get",
        url: findOrderDetail,
        data: {
            orderId: orderId
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(rs) {
            if(rs.status == 200) {
                var data = rs.data;
                var payWayText =['无','现金','扫码','余额'];
                var html = template('orderDetailList', {
                    list: rs.data.orderOptionList
                });
                $("#orderDetailListDemo").html(html);
                $('#realPrice').text(rs.data.order.receipt);
                $('#payPrice').text(rs.data.order.totalMoney);
                queryMenberIFFnfo(rs.data.order.token,function(val){
                    console.log(val);
                    $('#nick').text(val.nick)
                    $('#phone').text(val.phone)
                    $('#orderCode').text(data.order.orderNo)
                    $('#payWay').text(payWayText[data.order.payWay])
                    $('#payTime').text(data.order.payTime)

                })
            }
        }
    })
}





//  获取 所有订单数据
function getOrderList(_curr,payWay,beginTime,endTime) {
    //layer.load(2);

    var data = {
        "pageNum": _curr,
        "pageSize": 10,
        "payWay": payWay,
        "beginTime": beginTime,
        "endTime": endTime
    }
    $.ajax({
        type: "get",
        url: findPage,
        xhrFields: {
            withCredentials: true
        },
        data:data,
        crossDomain: true,
        success: function(rs) {
            if(rs.status == 200) {
                var html
                if(rs.data.total == 0) {
                    // html = ''
                    $("#orderListDemo").hide();
                    $("#noeList").show();
                    $('#page').hide();
                    //layer.closeAll('loading');
                }else {
                    $("#orderListDemo").show();
                    $('#page').show();
                    $("#noeList").hide();
                    template.defaults.imports.getPayWay = function(key){
                        var payWayText =['无','现金','扫码','余额'];
                        return payWayText[key]
                    };
                    html = template('orderList', {
                        list: rs.data.rows
                    });
                }
                setTimeout(function() {
                    // layer.closeAll('loading');
                    $("#orderListDemo").html(html);
                    gainpage(Math.ceil(rs.data.total/10),_curr,0);
                }, 0)
            }
        }
    })
}




function gainpage(pages,curr, alltotal) {
    console.log(alltotal)
    if (alltotal < 0) {
        return false;
    } else {
        laypage({
            cont: 'page',
            skip: true, //是否开启跳页
            skin: '#1E9FFF',
            pages: pages,
            curr: curr || 1,
            jump: function(obj, first) {
                var curr = obj.curr;
                if(!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                    getOrderList(curr,payWay,beginTime,endTime);
                }
            }
        })
    }
}
