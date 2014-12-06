// JavaScript Document

// ******处理键盘响应 开始
var lastKeyCode = 0; // 记录上次按键的值（也就是按下的命令键的值）
var number = 0;
var scrollAdjust = 20; // 每次按下方向键时调整的scroll量
document.onkeydown = function(ev) {
	thisKeyCode = ev.keyCode;

	if (thisKeyCode == 8) // 如果按下的是BackSpace键
		ev.preventDefault(); // 阻值对按键的默认处理

	switch (lastKeyCode) {
	case 0: // 之前什么键也没有按
		switch (thisKeyCode) {
		case 78: // N键
			showKeyArea("Next person ID: ");
			lastKeyCode = 78;
			return;
		case 68: // D键
			showKeyArea("Delete person ID: ");
			lastKeyCode = 68;
			return;
		case 121: // F10键
			ev.preventDefault();
			showHideDebug();
			return;
		case 13: // 回车键
			ev.preventDefault();
			submitLabel();
			return;
		case 37: // 左箭头
			ev.preventDefault();
			document.getElementById("imageArea").scrollLeft -= scrollAdjust;
			break;
		case 39: // 右箭头
			ev.preventDefault();
			document.getElementById("imageArea").scrollLeft += scrollAdjust;
			break;
		case 38: // 上箭头
			ev.preventDefault();
			document.getElementById("imageArea").scrollTop -= scrollAdjust;
			break;
		case 40: // 下箭头
			ev.preventDefault();
			document.getElementById("imageArea").scrollTop += scrollAdjust;
			break;
		}
		return;
	case 78: // 之前按下过N键
		if (thisKeyCode >= 48 && thisKeyCode <= 57) { // 按下数字键
			if (number < 1000)
				number = 10 * number + thisKeyCode - 48;
			document.getElementById("keyArea").innerHTML = "Next person ID: "
					+ number;
			ev.preventDefault();
			return;
		}
		if (thisKeyCode >= 96 && thisKeyCode <= 105) { // 按下小键盘数字键
			if (number < 1000)
				number = 10 * number + thisKeyCode - 96;
			document.getElementById("keyArea").innerHTML = "Next person ID: "
					+ number;
			ev.preventDefault();
			return;
		}
		if (thisKeyCode == 13) { // 按下回车键
			if (number > 0)
				addPerson(number);
			hideKeyArea();
			ev.preventDefault();
			return;
		}
		hideKeyArea();
		return;
	case 68: // 之前按下过D键
		if (thisKeyCode >= 48 && thisKeyCode <= 57) { // 按下数字键
			if (number < 1000)
				number = 10 * number + thisKeyCode - 48;
			document.getElementById("keyArea").innerHTML = "Delete person ID: "
					+ number;
			ev.preventDefault();
			return;
		}
		if (thisKeyCode >= 96 && thisKeyCode <= 105) { // 按下小键盘数字键
			if (number < 1000)
				number = 10 * number + thisKeyCode - 96;
			document.getElementById("keyArea").innerHTML = "Delete person ID: "
					+ number;
			ev.preventDefault();
			return;
		}

		if (thisKeyCode == 13) { // 按下回车键
			if (number > 0)
				delPerson(number);
			hideKeyArea();
			ev.preventDefault();
			return;
		}
		hideKeyArea();
		return;
	default:
		hideKeyArea();
		return;
	}
};

function showKeyArea(str) { // 显示键盘区
	var keyArea = document.getElementById("keyArea");
	keyArea.style.left = "0px";
	keyArea.style.bottom = "0px";
	keyArea.innerHTML += str;
	keyArea.style.visibility = "visible";
}

function hideKeyArea() { // 隐藏键盘区
	var keyArea = document.getElementById("keyArea");
	keyArea.style.visibility = "hidden";
	keyArea.innerHTML = "";
	lastKeyCode = 0;
	number = 0;
}
// ******处理键盘响应 结束