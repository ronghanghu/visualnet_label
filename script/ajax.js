// JavaScript Document

// ******与服务器通信 开始
function stateChanged() { // 当xmlHttp的readyState变化时，此函数会被调用
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
		processText(xmlHttp.responseText); // 处理服务器返回的图像地址。必须先loadimage，然后才能够将submit按钮设为可用（在imageOnload中设置）
	}
}

var xmlHttp;
function sendData(msg) { // 将收集到的数据通过HTTP Post发送给服务器端，返回false以保证表单不会提交
	xmlHttp = GetXmlHttpObject();
	if (xmlHttp == null) {
		alert("Browser does not support HTTP Request");
		return false;
	}
	xmlHttp.onreadystatechange = stateChanged;
	xmlHttp.open("POST", "submit.php", true);
	xmlHttp.setRequestHeader("Content-type",
			"application/x-www-form-urlencoded");
	xmlHttp.send(msg + "&random=" + Math.random());
	return false;
}

function GetXmlHttpObject() { // 获取XmlHttpObject
	var xmlHttp = null;
	try { // Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();
	} catch (e) { // Internet Explorer
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}
// ******与服务器通信 结束

// ******对URL的处理函数 开始
function getArgs() { // 获取网页URL中get参数，返回包含get信息的对象
	var args = {};
	var query = location.search.substring(1);
	// Get query string
	var pairs = query.split("&");
	// Break at ampersand
	for ( var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		// Look for "name=value"
		if (pos == -1)
			continue;
		// If not found, skip
		var argname = pairs[i].substring(0, pos);// Extract the name
		var value = pairs[i].substring(pos + 1);// Extract the value
		value = decodeURIComponent(value);// Decode it, if needed
		args[argname] = value;
		// Store as a property
	}
	return args;// Return the object 
}
// ******对URL的处理函数 结束