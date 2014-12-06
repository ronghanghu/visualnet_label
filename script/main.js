// JavaScript Document

// ******初始化整个页面 开始
window.onload = function() { // 整个JavaScript程序入口，类似C++的main函数
	document.getElementById("newPersonId").value = 1;
	createLabelInfo();
	createRPos();
	initLabel();
	getInitialImg();
};
// ******初始化整个页面 结束

// ******初始化整个页面中的Label 开始
var labelArr = new Array(); // Label Object数组
var labelPosArr = new Array(); // Label的左上角相对于缩放后的图像的位置的数组
var labelCoordsArr = new Array(); // Label的圆点中心相对于原始100%图像的坐标的数组（也就是最终的landmark结果）
function initLabel() { // 初始化Label信息，向页面添加Label
	var labelNum = labelInfoArr.length;
	for ( var i = 0; i < labelNum; i++) {
		createLabelHTML(i, labelInfoArr[i].type, getColor(i));
	}
	for ( var i = 0; i < labelNum; i++) {
		labelArr[i] = document.getElementById("label" + i);
		makeDraggable(i);

		// 为每个点设置一个初值位置（图像左上角），以便调整图像缩放时不出错
		labelPosArr[i] = {
			x : -labelOffset.x,
			y : -labelOffset.y
		};
		labelCoordsArr[i] = {
			x : 0,
			y : 0
		};
	}
}

function getColor(index) { // 获取某个index对应的颜色
	if ((index >= 82 && index < 87) || index == 19)
		return "#6F0";
	if (index == 15 || index == 17)
		return "#000099";
	return colorArr[labelInfoArr[index].type];
}

var colorArr = new Array("white", "red", "red", "red", "red", "red", "red",	"red", "red", "red"); // 不同type值的label的颜色
var radiusArr = new Array(4.5, 4.5, 3, 3, 3, 3, 3, 3, 3, 3); // 不同type值的label的大小
function createLabelHTML(index, type, color) { // 向HTML文档中插入新生成的Label代码
	var str1 = "<div><svg id=\"label";
	var str2 = "\" class=\"label\" width=\"20px\" height=\"20px\">";
	var str3 = "<circle cx=\"" + labelOffset.x + "\" cy=\"" + labelOffset.y
			+ "\" r=\"" + radiusArr[type] + "\"  fill=\"" + color
			+ "\" class=\"landmark\" /></svg></div>";
	document.getElementById("imageArea").innerHTML += (str1 + index + str2 + str3);
}

function setEstiPos(level) { // 设置各个点的初始位置
	var length = Math.min(imageSize.w, imageSize.h);
	var b = lvRangeArr[level];
	var e = lvRangeArr[level + 1];
	for ( var i = b; i < e; i++) {
		labelCoordsArr[i] = { // 设置Label的初始坐标
			x : RPosArr[i].x / 100 * length,
			y : RPosArr[i].y / 100 * length
		};
		labelPosArr[i] = coords2pos(labelCoordsArr[i]);
		setPos(i, labelPosArr[i].x, labelPosArr[i].y);
	}
	for ( var i = b; i < e; i++) { // 更新插值点的初始位置（也就是根据基点位置对微调点位置进行初始插值）
		updatePos(i); // 注意，updatePos仅仅设置pos，并不更新coords
		labelCoordsArr[i] = pos2coords(labelPosArr[i]); // 更新coords
	}
	isPosSetArr[level] = true;
}
// ******初始化整个页面中的Label 结束

// ******初始化一幅图像的信息 开始
var dbName = null; // 数据库名
var imageSize; // 图像的大小
var thisImg;
var thisImgObj = new Image(); // 记录图像的对象
var thisImgId = null; // 图像的id号
var thisImgSrc = null; // 图像的地址
function loadImg() { // 加载下一张图像
	thisImg = document.getElementById("thisImg");
	thisImg.onload = imageOnload;
	thisImg.src = thisImgSrc;
	thisImgObj.src = thisImg.src; // 注意，由于图像是动态地址，不能直接把thisImgSrc给thisImgObj
	thisImg.onmousedown = detectClickLabel; // 在图像上按下鼠标时，检测距离按下位置最近的Label
	thisImg.onmouseup = function() {
		nearestLabelIndex = -1;
	}; // 这个函数是为了实现如果仅仅在图像上点击而不拖拽（即按下鼠标期间鼠标不移动，则不移动Label
	resetEverything();
}

var firstzoom = true;
function imageOnload() { // 图像加载完成时调用这个函数来记录下图像的信息，并且调整图像缩放
	imageSize = {
		w : thisImgObj.width,
		h : thisImgObj.height
	};
	addFirstPerson(); // 添加初始人ID

	document.getElementById("imgIdTxt").innerHTML = thisImgId;
	document.getElementById("sizeTxt").innerHTML = imageSize.w + "*"
			+ imageSize.h;

	if (firstzoom) { // 如果是第一次，则调整zoom
		firstzoom = false;
		resetImg();
	} else { // 如果不是第一次标注，则按照原先的zoom设置新图像
		zoomImg();
	}

	document.getElementById("submitButton").disabled = false;
	document.getElementById("submitButton").value = "Submit";
	document.getElementById("loadingTxt").style.visibility = "hidden";
	
	// 为了顺应视频标注中帧与帧之间连续性的需要，不重置label
//	// 重置label的初始位置是否设置过的信息
//	for(var lv = 0; lv < lvNum; lv++) {
//		setEstiPos(lv);
//	}
}

function resetEverything() { // 重置label的所有信息，在加载下一幅图像时调用
	// 重置所有label是否被标记过（labeled）的信息
	for (lv in isLvLabeledArr) {
		isLvLabeledArr[lv] = false;
		document.getElementById("lv" + lv).value = lvNameArray[lv];
		for (dv in isLvDvLabeledArr[lv]) {
			isLvDvLabeledArr[lv][dv] = false;
			document.getElementById("lv" + lv + "dv" + dv).value = lvDvNameArr[lv][dv];
		}
	}
	resetPersonInfo();
}
// ******初始化一幅图像的信息 结束

function goHome() { // 返回首页
	document.location = "index.php";
}

function logout() { // 登出
	if (comfirm("Do you want to stop labeling and logout?"))
		document.location = "logout.php";
}