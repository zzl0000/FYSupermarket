// 输入键盘 
var _inputkey = '';

$('body').on('click', '.input-key', function(e) {
	var _curval = $(this).text();
	keyCount(_curval)
})


function keyCount(val) {
	_inputkey += val;
	$('#storeOrderId').val(_inputkey);
}

// 重置键盘
function resetKeyboard() {
	$('#storeOrderId').val('');
	_inputkey = '';
}

