// JavaScript Document

// ******位置获取和设置函数 开始
var labelOffset = { // label区域左上相对于label圆点的圆心的偏差
	x : 10,
	y : 10
};
function pos2coords(pos) { // 将Pos（Label左上角相对于缩放后的图像的位置）转化为Coords（Label的圆点中心相对于原始100%图像的坐标）
	return {
		x : (pos.x + labelOffset.x) * 100 / zoom,
		y : (pos.y + labelOffset.y) * 100 / zoom
	};
}

function coords2pos(coords) { // 将Coords（Label的圆点中心相对于原始100%图像的坐标）转化为Pos（Label左上角相对于缩放后的图像的位置）
	return {
		x : coords.x * zoom / 100 - labelOffset.x,
		y : coords.y * zoom / 100 - labelOffset.y
	};
}

function mouseCoords(ev) { // 获取鼠标的坐标
	if (ev.pageX || ev.pageY) {
		return {
			x : ev.pageX,
			y : ev.pageY
		};
	}
	return {
		x : ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y : ev.clientY + document.body.scrollTop - document.body.clientTop
	};
}

function setPos(index, x, y) { // 设置Label的Pos（不更新coords）
	labelPosArr[index].x = x;
	labelPosArr[index].y = y;
	labelArr[index].style.left = x + "px";
	labelArr[index].style.top = y + "px";
}
// ******位置获取和设置函数 结束

// ******插值函数 开始
function qInterp(x1, y1, x2, y2, x3, y3, x) { // 二次插值
	if (x1 == x2 || x1 == x3 || x2 == x3) { // 处理二次插值时横坐标相等的情况
		return (y1 + y2 + y3) / 3;
	}
	return y1 * ((x - x2) * (x - x3)) / ((x1 - x2) * (x1 - x3)) + y2
			* ((x - x1) * (x - x3)) / ((x2 - x1) * (x2 - x3)) + y3
			* ((x - x1) * (x - x2)) / ((x3 - x1) * (x3 - x2));
}

function aqInterp(x1, y1, x2, y2, x3, y3, y) { // 反二次插值
	if (y1 == y2 || y1 == y3 || y2 == y3) { // 处理反二次插值时纵坐标相等的情况
		return (x1 + x2 + x3) / 3;
	}
	return x1 * ((y - y2) * (y - y3)) / ((y1 - y2) * (y1 - y3)) + x2
			* ((y - y1) * (y - y3)) / ((y2 - y1) * (y2 - y3)) + x3
			* ((y - y1) * (y - y2)) / ((y3 - y1) * (y3 - y2));
}
// ******插值函数 结束

// ******图像缩放函数 开始
var zoom = 100;
function zoomin() {
	if (zoom > 1000) {
		alert("Cannot zoom in anymore!");
		return;
	}
	zoom = Math.floor(zoom * 1.2);
	zoomImg();
}

function zoomout() {
	if (document.getElementById("thisImg").width <= 400) {
		alert("Cannot zoom out anymore!");
		return;
	}
	zoom = Math.round(zoom * 0.8);
	zoomImg();
}

var imageAreaWidth = 700; // imageSection的宽度，修改这个量的时候必须同时修改CSS中的imageSection类的width
var imageAreaHeight = 700; // imageSection的高度，修改这个量的时候必须同时修改CSS中的imageSection类的height
function resetImg() {
	zoom = Math.floor((imageAreaWidth + imageAreaHeight)
			/ (imageSize.w + imageSize.h) * 100);
	zoomImg();
}

function nozoom() {
	zoom = 100;
	zoomImg();
}

var previousZoom = zoom; // 调整之前图像的缩放，用于中心缩放时自动调整滚动条
function zoomImg() {
	// 记录缩放前图像显示在屏幕的中心位置
	imageArea = document.getElementById("imageArea");
	var centerX = imageArea.scrollLeft + imageAreaWidth / 2;
	var centerY = imageArea.scrollTop + imageAreaHeight / 2;

	// 调整缩放后的图像大小
	thisImg = document.getElementById("thisImg");
	thisImg.width = zoom / 100 * imageSize.w;
	thisImg.height = zoom / 100 * imageSize.h;

	// 计算缩放后图像的中心位置，并且调整滚动条
	centerX = zoom / previousZoom * centerX;
	centerY = zoom / previousZoom * centerY;
	imageArea.scrollLeft = centerX - imageAreaWidth / 2;
	imageArea.scrollTop = centerY - imageAreaHeight / 2;
	previousZoom = zoom; // 缩放完毕后将previousZoom设置成当前zoom以准备下一次缩放

	// 移动各个Label，根据它们的coords计算它们新的pos
	document.getElementById("zoomTxt").innerHTML = zoom + "%";
	for (i in labelArr) { // 重新计算并调整各个Label的坐标
		labelPosArr[i] = coords2pos(labelCoordsArr[i]);
		labelArr[i].style.left = labelPosArr[i].x + "px";
		labelArr[i].style.top = labelPosArr[i].y + "px";
	}
}
// ******图像缩放函数 结束