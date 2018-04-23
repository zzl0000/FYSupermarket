

init ();

function init () {
	var url;
    $('#ChangeSystem').on('click', function(e){
        url = '../view/integralSystem.html';
        e.preventDefault();
        window.location.href = url;
    })
}