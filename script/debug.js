// JavaScript Document

function debug(str) {
	document.getElementById("debugTxt").innerHTML += str + "<br />";
}

function clearDebug() {
	document.getElementById("debugTxt").innerHTML = "";
}

function pause(str) {
	alert(str);
}

function showHideDebug() {
	var debugOutput = document.getElementById("debugOutput");
	if (debugOutput.style.display == "block") {
		debugOutput.style.display = "none";
	} else {
		debugOutput.style.display = "block";
	}
}