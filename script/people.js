// JavaScript Document

// ******实现添加人，删除人，不同人之间的切换 开始
var isPersonAvaliable = true; // 规定这张图像是否要标人
var personCount = 0; // 记录当前总共出现过多少个人
function addClicked() { // 用户按下Add按钮时触发
	personIDToAdd = parseInt(document.getElementById("newPersonId").value);
	if (personIDToAdd && personIDToAdd > 0)
		addPerson(personIDToAdd);
	else
		alert("Cannot add, because new person ID is invalid (not a positive integer).");
}

function deleteClicked() { // 用户按下Delete按钮时触发

	// 如果当前没有选中任何人（通常是把所有人都删了的情况），不让删除
	if (document.getElementById("personSelect").selectedIndex == -1) {
		alert("Cannot delete, because there is no people left.");
		return;
	}

	delPerson(document.getElementById("personSelect").value);
}

function personChanged() { // 用户前端的personSelect被按下时触发
	if (!comfirmLabel()) {// 切换人之前先确认当前人是否标好了，如果没有标好，取消切换（回到原来选择的人）
		var personSelect = document.getElementById("personSelect");
		for ( var i = 0; i < personSelect.length; i++) {
			if (personSelect.options[i].value == currentPersonID) {
				personSelect.selectedIndex = i;
				break;
			}
		}
		return;
	}
	switchPerson();
}

function addPerson(personIDToAdd) { // 添加某一个人
	if (!comfirmLabel()) // 切换人之前先确认当前人是否标好了，如果没有标好，取消切换（不能移动到addClicked()中，因为快捷键也要调用这个函数）
		return;

	if (isPersonExist(personIDToAdd)) { // 检查要添加的人是否已经存在
		alert("Person ID " + personIDToAdd + " already exists.");
		return;
	}

	// 向select中添加这一项（要求有序）
	var personSelect = document.getElementById("personSelect");
	var newIndex = -1;
	for ( var i = 0; i < personSelect.length; ++i) {
		if (personSelect.options[i].value > personIDToAdd) {
			newIndex = i;
			personSelect.insertBefore(new Option(personIDToAdd, personIDToAdd),
					personSelect.options[i]);
			added = true;
			break;
		}
	}
	if (newIndex == -1) {
		newIndex = personSelect.length;
		personSelect.appendChild(new Option(personIDToAdd, personIDToAdd));
	}
	personSelect.selectedIndex = newIndex;
	switchPerson(); // 切换到新加入的人

	if (personCount < personIDToAdd) { // 检查要删除的是否是最后一个人
		personCount = personIDToAdd;
		document.getElementById("newPersonId").value = personCount + 1;
	}
}

function delPerson(personIDToDel) { // 删除某一个人
	if (!isPersonExist(personIDToDel)) { // 检查要删除的人目前是否存在
		alert("Cannot delete, because person ID " + personIDToDel
				+ " does not exists.");
		return;
	}

	// 从select中删除这一项
	var personSelect = document.getElementById("personSelect");
	for ( var i = 0; i < personSelect.length; i++) {
		if (personSelect.options[i].value == personIDToDel) {
			personSelect.removeChild(personSelect.options[i]);
			break;
		}
	}

	personSelect.selectedIndex = personSelect.length - 1; // 选中最后一个人（编号最大的）
	switchPerson(); // 切换到删除之后选中的人

	if (personCount == personIDToDel) { // 检查要删除的是否是最后一个人
		personCount--;
		document.getElementById("newPersonId").value = personCount + 1;
	}
}

function isPersonExist(personID) { // 返回某personID在图像上是否存在
	var personSelect = document.getElementById("personSelect");
	for ( var i = 0; i < personSelect.length; i++) {
		if (personSelect.options[i].value == personID)
			return true;
	}
	return false;
}

var personCoordsArr = new Array(); // 记录各个人的坐标（关联数组）
var isPersonLvLabeledArr = new Array(); // 记录某个人的某个Level是否被标记过（关联数组）
var isPersonLvDvLabeledArr = new Array(); // 记录某个人的某个Level是否被标记过（关联数组）
var currentPersonID = 0; // 当前的人的ID，ID为0表示不对应任何人
// 对于多人情况，每次不去重置坐标，而是保留之前的坐标，因此不需要isPersonPosSetArr

function switchPerson() { // 切换到当前personSelect选择的人。如果这个人已经存在，则直接加载他的数据，否则新建这个人的数据

	// 如果当前没有选中任何人（通常是把所有人都删了的情况），将各个层都隐藏起来
	if (document.getElementById("personSelect").selectedIndex == -1) {
		for ( var lv = 0; lv < lvNum; lv++) {
			setLvChecked(lv, false);
		}
		currentPersonID = 0;
		for (lv in isLvLabeledArr) { // 重置是否标记过的数据
			isLvLabeledArr[lv] = false;
			document.getElementById("lv" + lv).value = lvNameArray[lv];
			for (dv in isLvDvLabeledArr[lv]) {
				isLvDvLabeledArr[lv][dv] = false;
				document.getElementById("lv" + lv + "dv" + dv).value = lvDvNameArr[lv][dv];
			}
		}
		return;
	}

	personID = document.getElementById("personSelect").value;
	saveCurrentPerson(); // 保存当前人的数据

	// 加载下一个人的数据
	currentPersonID = personID;
	if (personCoordsArr[personID]) { // 如果要加载的人的数据存在，则加载他的数据
		for (i in labelCoordsArr) { // 读取坐标
			labelCoordsArr[i] = personCoordsArr[currentPersonID][i];
			labelPosArr[i] = coords2pos(labelCoordsArr[i]);
			setPos(i, labelPosArr[i].x, labelPosArr[i].y);
		}
		for (lv in isLvLabeledArr) { // 读取是否标记过的数据
			isLvLabeledArr[lv] = isPersonLvLabeledArr[currentPersonID][lv];
			document.getElementById("lv" + lv).value = (isLvLabeledArr[lv] ? "\u221A "
					: "")
					+ lvNameArray[lv];
			for (dv in isLvDvLabeledArr[lv]) {
				isLvDvLabeledArr[lv][dv] = isPersonLvDvLabeledArr[currentPersonID][lv][dv];
				document.getElementById("lv" + lv + "dv" + dv).value = (isLvDvLabeledArr[lv][dv] ? "\u221A "
						: "")
						+ lvDvNameArr[lv][dv];
			}
		}
	} else { // 如果要加载的人不存在，则创建他的数据
		for ( var lv = 0; lv < lvNum; lv++) { // 生成坐标
			setEstiPos(lv);
		}
		for (lv in isLvLabeledArr) { // 重置是否标记过的数据
			isLvLabeledArr[lv] = false;
			document.getElementById("lv" + lv).value = lvNameArray[lv];
			for (dv in isLvDvLabeledArr[lv]) {
				isLvDvLabeledArr[lv][dv] = false;
				document.getElementById("lv" + lv + "dv" + dv).value = lvDvNameArr[lv][dv];
			}
		}
	}
}

function saveCurrentPerson() { // 保存当前人的数据
	if (currentPersonID) { // 如果当前的人存在，则保存，否则不保存
		personCoordsArr[currentPersonID] = new Array();
		isPersonLvLabeledArr[currentPersonID] = new Array(lvNum);
		isPersonLvDvLabeledArr[currentPersonID] = new Array(lvNum);
		for (i in labelCoordsArr) { // 保存坐标
			personCoordsArr[currentPersonID][i] = labelCoordsArr[i];
		}
		for (lv in isLvLabeledArr) { // 保存是否标记过的数据
			isPersonLvLabeledArr[currentPersonID][lv] = isLvLabeledArr[lv];
			isPersonLvDvLabeledArr[currentPersonID][lv] = new Array();
			for (dv in isLvDvLabeledArr[lv]) {
				isPersonLvDvLabeledArr[currentPersonID][lv][dv] = isLvDvLabeledArr[lv][dv];
			}
		}
	}
}

function resetPersonInfo() { // 在加载下一幅图像时，重置部分person信息
	// 重置所有person所有label是否被标记过（labeled）的信息
	for (personID in isPersonLvLabeledArr) {
		debug("reset personID=" + personID);
		for (lv in isPersonLvLabeledArr[personID]) {
			debug("reset lv=" + lv);
			isPersonLvLabeledArr[personID][lv] = false;
			for (dv in isPersonLvDvLabeledArr[personID][lv]) {
				debug("reset dv=" + dv);
				isPersonLvDvLabeledArr[personID][lv][dv] = false;
			}
		}
	}
}

var isFirstPersonAdded = false;
function addFirstPerson() { // 添加第一个人，在系统开始时调用
	if (!isFirstPersonAdded) {
		addPerson(1);
		isFirstPersonAdded = true;
	}
}

function comfirmLabel() { // 在切换人和最终提交时，检查当前人是否都标注了至少一个Level。如果都标了，则返回true，表示可以继续
	// 如果没有，则询问用户当前人的Label的初始位置是否已经合适了。如果选择是，则记录当前人的信息，返回true
	// 如果选择否，则让用户继续标注这个人，不让用户切换人或者提交Landmark，返回false

	if (currentPersonID) {
		for (lv in isLvLabeledArr) { // 检查当前人是否已经标完了
			if (isLvLabeledArr[lv])
				return true;
		}

		if (confirm("Warning: You haven't finished labeling current person (ID " // 询问用户初始的Landmark是否已经合适
				+ currentPersonID
				+ "), Do you mean all the landmarks of this person are correctly labeled at the beginning?"
				+ "\n\nIf you want to continue labeling current person, press cancel."
				+ "\n\nIf the person does not exist on this image, press cancel and delete him.")) {
			for (i in labelArr) {
				if (labelArr[i].style.visibility == "visible") {
					setLabeled(labelInfoArr[i].lv, labelInfoArr[i].dv);
				}
			}
			return true;
		} else {
			return false;
		}
	}
	return true; // 对应于currentPersonID == 1的情况，如果当前没有人，直接继续
}
// ******实现添加人，删除人，不同人之间的切换 结束
