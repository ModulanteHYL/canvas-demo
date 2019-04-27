init();
autoSetSize(cvs);
drawEvent();
document.getElementById('clear').onclick = function () {
    isClear = !isClear;
    isPainting = false;
}
document.getElementById('pan').onclick = function () {
    isPainting = !isPainting;
    isClear = false;
}
//变量初始化
function init() {
    cvs = document.getElementById('canvas');
    ctx = cvs.getContext('2d');
    isPainting = true;
    isClear = false;
    using = false;
    lastPoint = { x: undefined, y: undefined };
    newPoint = { x: undefined, y: undefined };
}
//事件
function drawEvent() {
    var x = undefined;
    var y = undefined;
    if ('ontouchstart' in document.documentElement) {
        canvas.ontouchstart = function (e) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
            lastPoint = { 'x': x, 'y': y };
            using = true;
        }
        canvas.ontouchmove = function (e) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
            newPoint = { 'x': x, 'y': y };
            if (isPainting && using) {
                drawLine(lastPoint, newPoint);
            } else if (isClear && using) {
                clear(lastPoint.x, lastPoint.y);
            }
            lastPoint = newPoint;
        }
        canvas.ontouchend = function () {
            using = false;
        }
    } else {
        canvas.onmousedown = function (e) {
            x = e.clientX;
            y = e.clientY;
            lastPoint = { 'x': x, 'y': y };
            using = true;
        }
        canvas.onmousemove = function (e) {
            x = e.clientX;
            y = e.clientY;
            newPoint = { 'x': x, 'y': y };
            if (isPainting && using) {
                drawLine(lastPoint, newPoint);
            } else if (isClear && using) {
                clear(lastPoint.x, lastPoint.y);
            }
            lastPoint = newPoint;
        }
        canvas.onmouseup = function () {
            using = false;
        }
    }
}
//清除
function clear(x, y) {
    ctx.clearRect(x - 25, y - 25, 50, 50);
}
//画线
function drawLine(firPoint, secPoint) {
    ctx.beginPath();
    ctx.moveTo(firPoint.x, firPoint.y);
    ctx.lineTo(secPoint.x, secPoint.y);
    ctx.stroke();
}
//获取屏幕宽高，然后赋予给canvas
function adaption(canvas) {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}
//屏幕宽高更改后，画布自动适应全屏
function autoSetSize(canvas) {
    adaption(canvas);
    window.onresize = function () {
        adaption(canvas);
    }
}