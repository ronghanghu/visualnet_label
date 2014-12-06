// JavaScript Document

// ******显示和隐藏帮助窗口 开始
var fancyBoxSize = {
	w : 800,
	h : 700
};
function help() {
	var pageSize = getScrollPageSize();
	var fancyOverlay = document.getElementById("fancyOverlay");
	fancyOverlay.style.left = "0px";
	fancyOverlay.style.top = "0px";
	fancyOverlay.style.width = pageSize.w + "px";
	fancyOverlay.style.height = pageSize.h + "px";
	fancyOverlay.style.display = "block";
	var fancyBox = document.getElementById("fancyBox");
	fancyBox.style.width = fancyBoxSize.w + "px";
	// Note that Height will not be adjusted here
	fancyBox.style.left = (pageSize.w - fancyBoxSize.w) / 2 + "px";
	fancyBox.style.top = (pageSize.h - fancyBoxSize.h) / 2 + "px";
	fancyBox.style.display = "block";
}

function closeFancy() {
	document.getElementById("fancyOverlay").style.display = "none";
	document.getElementById("fancyBox").style.display = "none";
}

function getScrollPageSize() { // 获取整个页面大小
	var xScroll = 1024, yScroll = 768; // 页面大小获取失败时的默认值
	if (document.innerHeight && document.scrollMaxY) { // perhaps Firefox
		xScroll = document.innerWidth + document.scrollMaxX;
		yScroll = document.innerHeight + document.scrollMaxY;
	} else if (document.body.scrollHeight > document.documentElement.scrollHeight) { // Chrome
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else if (document.body) { // IE and perhaps Firefox
		xScroll = document.documentElement.scrollWidth;
		yScroll = document.documentElement.scrollHeight;
	}
	return {
		w : xScroll,
		h : yScroll
	};
}
// ******显示和隐藏帮助窗口 结束