window.onload = function(e) {
    var code = "";
    var lastTime, nextTime;
    var lastCode, nextCode;

    document.onkeypress = function(e) {
        nextCode = e.which;
        nextTime = new Date().getTime();

        if (lastCode == null && lastTime == null) {
            // 此处应该怎么判断
        }
        if (lastCode != null && lastTime != null && nextTime - lastTime <= 30) {
            code += String.fromCharCode(nextCode);
        } else if (lastCode != null && lastTime != null && nextTime - lastTime > 100) {
            code = "";
        }

        lastCode = nextCode;
        lastTime = nextTime;
    }

    this.onkeypress = function(e) {
        if (e.which == 13) {
            console.log(code);
            code = "";
        }
    }
}