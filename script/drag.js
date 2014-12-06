// JavaScript Document

// ******检测距离当前点击位置最近的是哪个元件 开始
var border = 2; // imageArea本身有宽度为2的border
var nearestLabelIndex = -1; // 记录是否找到了最近点，进行拖拽，具体移动在mouseMove中执行。如果仅仅在图像上点击而不拖拽（即按下鼠标期间鼠标不移动，则不移动Label
var equalLabelPosX;
var equalLabelPosY;
function detectClickLabel(ev) {
	clickPos = mouseCoords(ev);
	imageArea = document.getElementById("imageArea");
	var imagePos = getPosition(imageArea);
	equalLabelPosX = clickPos.x - imagePos.x - border + imageArea.scrollLeft
			- labelOffset.x;
	equalLabelPosY = clickPos.y - imagePos.y - border + imageArea.scrollTop
			- labelOffset.y;

	nearestLabelIndex = -1;
	var nearestDistance = 100000000000000000; // 很大的数，比正常的距离肯定要大
	var currentDistance;
	for (i in labelArr) {
		if (labelArr[i].style.visibility == "visible") {
			currentDistance = (labelPosArr[i].x - equalLabelPosX)
					* (labelPosArr[i].x - equalLabelPosX)
					+ (labelPosArr[i].y - equalLabelPosY)
					* (labelPosArr[i].y - equalLabelPosY);
			if (currentDistance < nearestDistance) {
				nearestDistance = currentDistance;
				nearestLabelIndex = i;
			}
		}
	}
	leftButton = false; // 对于点击不在label上的情况，一律按照右键点击处理
}

function getPosition(e) { // 获取元件相对于屏幕的坐标
	var left = 0;
	var top = 0;
	while (e.offsetParent) {
		left += e.offsetLeft;
		top += e.offsetTop;
		e = e.offsetParent;
	}
	left += e.offsetLeft;
	top += e.offsetTop;
	return {
		x : left,
		y : top
	};
}
// ******检测距离当前点击位置最近的是哪个元件 结束

// ******初始化拖动 开始
function updatePos(index) { // 更新插值点的Pos，不更新coords（coords在拖动结束会统一更新）
	var labelInfo = labelInfoArr[index];
	switch (labelInfo.type) {
	case 2: { // 线性插值点
		var b1 = labelPosArr[labelInfo.b1];
		var b2 = labelPosArr[labelInfo.b2];
		var x = b1.x * labelInfo.w1 + b2.x * labelInfo.w2;
		var y = b1.y * labelInfo.w1 + b2.y * labelInfo.w2;
		setPos(index, x, y);
	}
		break;
	case 3: { // 二次插值点
		var b1 = labelPosArr[labelInfo.b1];
		var b2 = labelPosArr[labelInfo.b2];
		var b3 = labelPosArr[labelInfo.b3];
		var x = b1.x * labelInfo.w1 + b2.x * labelInfo.w2 + b3.x * labelInfo.w3;
		var y = qInterp(b1.x, b1.y, b2.x, b2.y, b3.x, b3.y, x);
		setPos(index, x, y);
	}
		break;
	case 4: { // 反二次插值点
		var b1 = labelPosArr[labelInfo.b1];
		var b2 = labelPosArr[labelInfo.b2];
		var b3 = labelPosArr[labelInfo.b3];
		var y = b1.y * labelInfo.w1 + b2.y * labelInfo.w2 + b3.y * labelInfo.w3;
		var x = qInterp(b1.x, b1.y, b2.x, b2.y, b3.x, b3.y, y);
		setPos(index, x, y);
	}
		break;
	default:
		break;
	}
}

var updateArr = new Array(); // 要更新的点的范围
var translate = new Boolean(); // 是否需要平移整个division当中的点（如果被拖动的是锚点，则需要）
function setUpdateArray(index) { // 记录下拖动编号为index的基点时需要更新的范围

	// 尽管在mouseUp中已经清理过，但是为了保险，再次重置updateArr和translate
	translate = false;
	updateArr.length = 0;

	switch (labelInfoArr[index].type) {
	case 0:
		if (leftButton) { // 锚点，如果按下的是左键，则移动整个division当中的点
			var range = getRange(labelInfoArr[index].lv, labelInfoArr[index].dv);
			for ( var i = range.b; i < range.e; i++) {
				updateArr.push(i);
				lastPos[i] = {
					x : labelPosArr[i].x,
					y : labelPosArr[i].y
				};
			}
			translate = true;
			break;
		}
	case 1: {// 基点
		var range = getRange(labelInfoArr[index].lv, labelInfoArr[index].dv);
		for ( var i = range.b; i < range.e; i++) {
			var labelInfo = labelInfoArr[i];
			if (labelInfo.type > 1
					&& (labelInfo.b1 == index || labelInfo.b2 == index || labelInfo.b3 == index)) { // type大于1的点属于精调点
				updateArr.push(i);
			}
		}
	}
		break;
	default: // 微调点		
		break;
	}
}

var dragObject; // 记录当前被拖着的Object
var dragIndex; // 记录当前被拖着的landmark的编号
var lastPos = new Array(); // 记录要更新的点的初始位置信息
var dragStartPos; // 记录被拖动的点的初始位置信息
function recordObject(index) { // 记录被拖着的Object以及其相应的landmark编号
	dragIndex = index;
	dragStartPos = {
		x : labelPosArr[index].x,
		y : labelPosArr[index].y
	};
	setUpdateArray(dragIndex);
	dragObject = labelArr[index];
	nearestLabelIndex = -1; // 清空最近点（这个点已经找到并且开始拖动）
}

var clickPos; // 鼠标点击按下时的初始位置
var leftButton = new Boolean(); // 记录按下的是否是左键
function makeDraggable(index) { // 使得某个Object可以拖拽
	var label = labelArr[index];

	label.onmousedown = function(ev) {
		for (i in labelArr) {
			if (this == labelArr[i])
				break;
		}
		ev.preventDefault();
		leftButton 		= !(ev.button==2||ev.button==3); // 记录按下的是否是左键
		clickPos		= mouseCoords(ev);
		recordObject(i);
	};
//	label.onmousedown = detectClickLabel;
	label.onmouseup = mouseUp; // 阻值浏览器对鼠标事件的默认
}
// ******初始化拖动 结束

// ******控制拖拽过程 开始
function mouseMove(ev) {
	ev.preventDefault(); // 阻值浏览器对鼠标事件的默认

	if (nearestLabelIndex != -1) {
		setPos(nearestLabelIndex, equalLabelPosX, equalLabelPosY);
		recordObject(nearestLabelIndex);
	}

	if (dragObject) {
		ev = ev || window.event;
		var mousePos = mouseCoords(ev);
		var left = mousePos.x - clickPos.x + dragStartPos.x;
		var top = mousePos.y - clickPos.y + dragStartPos.y;

		// 限制LabelPos在图像区域内
		left = Math.max(left, -labelOffset.x);
		left = Math.min(left, thisImg.width - labelOffset.x);
		top = Math.max(top, -labelOffset.y);
		top = Math.min(top, thisImg.height - labelOffset.y);

		if (translate) { // 如果被拖动的是锚点
			left -= dragStartPos.x;
			top -= dragStartPos.y; // 将left和top转化成偏移量
			for (i in updateArr) {
				var index = updateArr[i];
				setPos(index, lastPos[index].x + left, lastPos[index].y + top);
			}
		} else { // 如果被拖动的不是锚点
			setPos(dragIndex, left, top);
			for (i in updateArr) {
				updatePos(updateArr[i]);
			}
		}
	}
	return false;
}
// ******控制拖拽过程 结束

// ******记录数据、终止拖拽 开始
function mouseUp(ev) { // 鼠标离开时，清空dragObject
	if (dragObject) {
		setLabeled(labelInfoArr[dragIndex].lv, labelInfoArr[dragIndex].dv);
		ev.preventDefault(); // 阻值浏览器对鼠标事件的默认
		for (i in labelPosArr)
			labelCoordsArr[i] = pos2coords(labelPosArr[i]);
		updateArr.length = 0; // 清空updateArr，在JavaScript中将updateArr的长度设置为0即可
	}
	dragObject = null;
	dragIndex = null;
	translate = false;
	nearestLabelIndex = -1;
}

// 各个按钮的名称
var lvNameArray = new Array("Level 0 Full Body", "Level 1 Face & Head",
		"Level 2 Facial Landmarks", "Level 3 Facial Components",
		"Level 4 Facial Texture");
var lvDvNameArr = new Array();
lvDvNameArr[1] = new Array("head", "face");
lvDvNameArr[2] = new Array("face contour", "right brow", "left brow", "left eye", "right eye",
		"nose", "mouth");
function setLabeled(lv, dv) { // 设置某一个level和division是否被标记过
	if (lv > 0 && !isLvDvLabeledArr[lv][dv]) { // 设置Division标签
		isLvDvLabeledArr[lv][dv] = true;
		document.getElementById("lv" + lv + "dv" + dv).value = "\u221A "
				+ lvDvNameArr[lv][dv];
	}

	if (!isLvLabeledArr[lv]) { // 设置Level标签
		switch (lv) {
		case 0: // 如果是Level 0，则直接将该Level设置为标记过
		case 1: // 如果是Level 1，则直接将该Level设置为标记过，因为Level 1只要标一个division就可以了
			isLvLabeledArr[lv] = true;
			document.getElementById("lv" + lv).value = "\u221A "
					+ lvNameArray[lv];
			break;
		case 2: // 如果是Level2，则检查该Level的各个Division是否都标注过，只有都标注过才将Level 2设为标记过
			var allLabeled = true;
			for (i in isLvDvLabeledArr[2]) {
				allLabeled = (allLabeled && isLvDvLabeledArr[2][i]);
			}
			if (allLabeled) {
				isLvLabeledArr[lv] = true;
				document.getElementById("lv" + lv).value = " \u221A"
						+ lvNameArray[lv];
			}
			break;
		default:
			pause("setLabeled() error: lv = " + lv + " dv = " + dv);
			break;
		}
	}
}
// ******记录数据、终止拖拽 结束

// ******阻值浏览器对鼠标事件的默认处理以避免干扰（所有事件应当由JavaScript代码控制） 开始
document.onmousemove = mouseMove;
document.onmouseup = mouseUp;
document.ondragend = function(ev) {
	ev.preventDefault();
};
document.ondragenter = function(ev) {
	ev.preventDefault();
};
document.ondragleave = function(ev) {
	ev.preventDefault();
};
document.ondragover = function(ev) {
	ev.preventDefault();
};
document.ondragstart = function(ev) {
	ev.preventDefault();
};
document.ondrop = function(ev) {
	ev.preventDefault();
};
document.onscroll = function(ev) {
	ev.preventDefault();
};
document.oncontextmenu = function(ev) {
	ev.preventDefault();
};
// ******阻值浏览器对鼠标事件的默认处理以避免干扰（所有事件应当由JavaScript代码控制） 结束