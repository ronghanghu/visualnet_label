// JavaScript Document

// ******各个division是否被标注过，初始位置是否设置过
var isPosSetArr = new Array(false, false, false, false, false); // 记录各个level的初始估计坐标是否已经设置过了。在loadImg()中初始化和重置。通过setLabeled()修改。初值false必须有！
var isLvLabeledArr = new Array(false, false, false, false, false); // 记录各个level是否已经被标记过了。loadImg()中初始化和重置。通过setLabeled()修改。初值false必须有！

var isLvDvLabeledArr = new Array();
isLvDvLabeledArr[1] = new Array(false, false); // 记录level1中的各个division是否已经被标记过了。在loadImg()中初始化和重置。通过setLabeled()修改。初值false必须有！
isLvDvLabeledArr[2] = new Array(false, false, false, false, false, false, false); // 记录level2中的各个division是否已经被标记过了。在loadImg()中初始化和重置。通过setLabeled()修改。初值false必须有！
// ******各个division是否被标注过，初始位置是否设置过

// ******显示页面元素 开始
var dark = "#989898 2px double";
var light = "#FFF 2px solid";
function clickLv(lv) { // 点击某个level时触发
	var toShow = (document.getElementById("lv" + lv).name == "up");
	setLvChecked(lv, toShow);
}

function clickLvDv(lv, dv) { // 点击某个division按钮时触发
	var toShow = (document.getElementById("lv" + lv + "dv" + dv).name == "up");
	setLvDvChecked(lv, dv, toShow);
}

function setLvChecked(lv, checked) { // 将某个level按钮设置为按下时调用
	if (checked && !currentPersonID) { // 检查当前的人是否存在
		alert("You must add a person before you can start labeling.");
		return;
	}
	if (checked && lv > 2) {
		alert("Level " + lv + " is currently unavailable. It will be completed soon.");
		return;
	}

	var button = document.getElementById("lv" + lv);
	if (button) {
		button.name = (checked ? "down" : "up");
		button.style.borderLeft = (checked ? dark : light);
		button.style.borderTop = (checked ? dark : light);
		button.style.borderRight = (checked ? light : dark);
		button.style.borderBottom = (checked ? light : dark);
		document.getElementById("lv" + lv + "dv").style.display = (checked ? "block"
				: "none");
	}
	setLvShown(lv, checked);
}

function setLvDvChecked(lv, dv, checked) { // 将某个division按钮设置为按下时调用
	if (checked && !currentPersonID) { // 检查当前的人是否存在
		alert("You must add a person before you can start labeling.");
		return;
	}

	var button = document.getElementById("lv" + lv + "dv" + dv);
	if (button) {
		button.name = (checked ? "down" : "up");
		button.style.borderLeft = (checked ? dark : light);
		button.style.borderTop = (checked ? dark : light);
		button.style.borderRight = (checked ? light : dark);
		button.style.borderBottom = (checked ? light : dark);
	}
	setLvDvShown(lv, dv, checked);
}

function setLvShown(lv, toShow) { // 显示或者隐藏某个level，也就是level按钮被按下时发生的情况，被setLvChecked()调用
	if (toShow) { // 如果要显示这一层（无论是L0，L1，还是L2，L3），都为这一层设置初始位置，并且隐藏其它层的Label
		if (!isPosSetArr[lv])
			setEstiPos(lv);
		for ( var i = 0; i < lvNum; i++) {
			if (i != lv) {
				setLvChecked(i, false);
			}
		}
	}
	switch (lv) {
	case 0: // 如果是L0，直接显示该层
		var b = lvRangeArr[lv];
		var e = lvRangeArr[lv + 1];
		for ( var i = b; i < e; i++) {
			if (toShow) {
				pos = coords2pos(labelCoordsArr[i]);
				setPos(i, pos.x, pos.y);
				labelArr[i].style.visibility = "visible";
			} else {
				labelArr[i].style.visibility = "hidden";
			}
		}
		return;
	case 1: // 如果是L1，什么也不显示，让用户自己选择是打开head还是face
		for ( var dv = 0; dv < 2; dv++) {
			setLvDvChecked(lv, dv, false);
		}
		return;
	case 2: // 如果是L2，分别或者隐藏显示其各个division
		for ( var dv = 0; dv < 7; dv++) {
			setLvDvChecked(lv, dv, toShow);
		}
		return;
	default:
		if (toShow)
			alert("Level " + lv
					+ " is currently unavailable. It will be completed soon.");
		return;
	}
}

function setLvDvShown(lv, dv, toShow) { // 显示或隐藏某个level的division，被setLvDvChecked()调用
	var range = getRange(lv, dv);
	var pos;
	for ( var i = range.b; i < range.e; i++) {
		if (toShow) {
			pos = coords2pos(labelCoordsArr[i]);
			setPos(i, pos.x, pos.y);
			labelArr[i].style.visibility = "visible";
		} else {
			labelArr[i].style.visibility = "hidden";
		}
	}
}
// ******显示页面元素 结束
