init();
autoSetSize(cvs);
drawEvent();
document.getElementById('eraser').onclick = function () {
    eraser.classList.add('active');
    pen.classList.remove('active');
    isClear = !isClear;
    isPainting = false;
}
document.getElementById('pen').onclick = function () {
    pen.classList.add('active');
    eraser.classList.remove('active');
    isPainting = !isPainting;
    isClear = false;
}
document.getElementById('clear').onclick = function () {
    rectWidth = cvs.width;
    rectHeight = cvs.height;
    clear(0,0);
}
document.getElementById('download').onclick=function(){
    var url = cvs.toDataURL('image/png');
    var a =document.createElement('a');
    document.body.appendChild(a);
    a.href=url;
    a.download='我的涂鸦';
    a.click();
}
document.getElementById('black').onclick=function(){
    black.classList.add('colorSelected');
    red.classList.remove('colorSelected');
    yellow.classList.remove('colorSelected');
    blue.classList.remove('colorSelected');
    green.classList.remove('colorSelected');
    strokeStyle = 'black';
}
document.getElementById('red').onclick = function () {
    black.classList.remove('colorSelected');
    red.classList.add('colorSelected');
    yellow.classList.remove('colorSelected');
    blue.classList.remove('colorSelected');
    green.classList.remove('colorSelected');
    strokeStyle = 'red';
}
document.getElementById('yellow').onclick = function () {
    black.classList.remove('colorSelected');
    red.classList.remove('colorSelected');
    yellow.classList.add('colorSelected');
    blue.classList.remove('colorSelected');
    green.classList.remove('colorSelected');
    strokeStyle = 'rgb(247, 247, 25)';
}
document.getElementById('blue').onclick = function () {
    black.classList.remove('colorSelected');
    red.classList.remove('colorSelected');
    yellow.classList.remove('colorSelected');
    blue.classList.add('colorSelected');
    green.classList.remove('colorSelected');
    strokeStyle = 'blue';
}
document.getElementById('green').onclick = function () {
    black.classList.remove('colorSelected');
    red.classList.remove('colorSelected');
    yellow.classList.remove('colorSelected');
    blue.classList.remove('colorSelected');
    green.classList.add('colorSelected');
    strokeStyle = 'green';
}
//变量初始化
function init() {
    cvs = document.getElementById('canvas');
    ctx = cvs.getContext('2d');
    lineWidth = 3;
    strokeStyle = 'black';
    rectWidth = 50;
    rectHeight = 50;
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
                clear(lastPoint.x, lastPoint.y, rectWidth, rectHeight);
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
    ctx.clearRect(x - 25, y - 25, rectWidth, rectHeight);
}
//画线
function drawLine(firPoint, secPoint) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(firPoint.x, firPoint.y);
    ctx.lineTo(secPoint.x, secPoint.y);
    ctx.stroke();
}
//获取屏幕宽高，然后赋予给canvas;渲染白色背景的画布
function adaption(canvas) {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    ctx.beginPath();
    ctx.fillStyle='#ffffff';
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();
}
//屏幕宽高更改后，画布自动适应全屏
function autoSetSize(canvas) {
    adaption(canvas);
    window.onresize = function () {
        adaption(canvas);
    }
}