// JavaScript Document

// ******提交图像标注结果 开始
function getInitialImg() { // 获取初始图像
	var msg = "submit=0"; // submit=0 表示不提交数据，仅仅请求图像地址
	msg += "&dbName=" + document.getElementById("dbNameTxt").innerHTML;
	sendData(msg);
}

function checkData() { // 检查数据是否合法，如果不合法则拒绝提交
	if (!currentPersonID
			&& !confirm("Warning: You haven't labeled any person on this image. Do you mean there is nobody on this image?"
					+ "\n\nIf not, press cancel and add people.")) { // 检查当前是否有人，如果没有人，询问是否提交
		return false;
	}

	// 检查当前是否每个人都标注了至少一个Level
	var personSelect = document.getElementById("personSelect");
	for ( var i = 0; i < personSelect.length; i++) {
		personID = personSelect.options[i].value;
		var labeled = (isPersonLvLabeledArr[personID][0]
		 || isPersonLvLabeledArr[personID][1]
		 || isPersonLvLabeledArr[personID][2]
		 || isPersonLvLabeledArr[personID][3]
		 || isPersonLvLabeledArr[personID][4]);
		if (!labeled && !confirm("Warning: You haven't finished labeling Person ID " + personID + ". Do you mean all the landmarks of this person are correctly labeled at the beginning?" + "\n\nIf the person does not exist on this image, press cancel and delete him.")) {
			return false;
		}
	}
	return true;
}

var personArr = new Array();
function collectData() { // 从页面收集数据，整合成一个字符串
	var msg = "submit=1"; // submit=1 表示要提交数据
	msg += "&imgId=" + thisImgId;
	msg += "&dbName=" + document.getElementById("dbNameTxt").innerHTML;

	// 清空要收集的人的列表，收集
	msg += "&personID=";
	personArr.length = 0;
	var personSelect = document.getElementById("personSelect");
	for ( var i = 0; i < personSelect.length; i++) {
		personID = personSelect.options[i].value;
		personArr.push(personID);
		if (i == personSelect.length - 1)
			msg += (personID);
		else
			msg += personID + "_";
	}

	for (i in personArr) { // 收集每一个人的数据
		msg += collectPerson(personArr[i]);
	}
	return msg;
}

function collectPerson(personID) {
	var personMsg = "";
	for ( var lv = 0; lv < lvNum; lv++) {
		if (isLvLabeledArr[lv]) { // 检查当前正标注了哪些Level，收集这所有人在些Level中的数据
			var lvIndexBegin = lvRangeArr[lv];
			var lvIndexEnd = lvRangeArr[lv + 1];
			personMsg += ("&P" + personID + "L" + lv + "=" + (lvIndexEnd - lvIndexBegin));
			for ( var i = lvIndexBegin; i < lvIndexEnd; i++) {
				var j = i;
				if (i == 30+lvIndexBegin)
					j = 36+lvIndexBegin;
				if (i == 31+lvIndexBegin)
					j = 35+lvIndexBegin;
				if (i == 35+lvIndexBegin)
					j = 30+lvIndexBegin;
				if (i == 36+lvIndexBegin)
					j = 31+lvIndexBegin;
				personMsg += ("&P" + personID + "L" + lv + "_"
						+ (j - lvIndexBegin) + "x=" + Math.round(personCoordsArr[personID][i].x));
				personMsg += ("&P" + personID + "L" + lv + "_"
						+ (j - lvIndexBegin) + "y=" + Math.round(personCoordsArr[personID][i].y));
			}
		} else {
			personMsg += "&P" + personID + "L" + lv + "=0";
		}
	}
	return personMsg;
}

function submitLabel() { // 提交数据
	if (!comfirmLabel()) // 提交之前先确认当前人是否标好了，如果没有标好，取消切换（当前人以外的其他人已经confirm过了，因为切换人时也会调用comfirmLabel()）
		return;

	saveCurrentPerson(); // 保存当前人的数据
	if (!checkData()) {
		return;
	}
	var msg = collectData();
	document.getElementById("submitButton").disabled = true;
	document.getElementById("submitButton").value = "Submitting and loading image...";
	document.getElementById("loadingTxt").style.visibility = "visible";
	sendData(msg);
}
// ******提交图像标注结果 结束

// ******处理服务器返回的下一图像信息 开始
function processText(responseText) { // 处理服务器返回数据，供loadImg()调用
	var imageInfo = responseText.split(";", 2);

	if (imageInfo[0] == "error") { // 如果出错了，处理服务器端返回的错误代码
		alert("Error occured when sending data and requesting for new image: "
				+ imageInfo[1]);
		goHome();
		return;
	}

	var imageInfo = responseText.split(";", 2);
	if (imageInfo[0] == "null") { // 如果为null说明已经没有更多图像了
		alert("All the images in this database have been labeled. Thank you!");
		goHome();
		return;
	}

	thisImgId = imageInfo[0];
	thisImgSrc = imageInfo[1];
	loadImg();
}
// ******处理服务器返回的下一图像信息 结束
