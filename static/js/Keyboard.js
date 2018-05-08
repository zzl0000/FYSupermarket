// 输入键盘


var _inputkey = '';

$('body .input-key ').off('click').on('click', function(e) {
	e.preventDefault();
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

