<?php
session_start();
if (!isset($_SESSION['username'])) { // 先检查用户是否已经登录，并且已经设置了dbName
	session_destroy();
	forbidden();
	return;
}
if (!isset($_SESSION['dbName']) || !isset($_GET['dbName']) || !isset($_GET['imgName'])
	 || $_GET['dbName'] != $_SESSION['dbName']) { // 检查用户提交的数据库名与服务器记录的当前用户正在标定的数据库名是否一致
	session_destroy();
	forbidden();
	return;
}

require "filesystem.php";
$imgPath = resourcePath($_GET['dbName'])."/".$_GET['imgName'];
if (file_exists($imgPath)) {
	give_image($imgPath);
} else {
	echo $imgPath;
	not_found();
}

function give_image($imgPath) { // 生成临时图像发送给用户
	$tmpImg = imagecreatefromjpeg($imgPath);
	header("Content-type: image/jpeg");
	imagejpeg($tmpImg);
	imagedestroy($tmpImg);
	writeError("imageRequested: ".$_GET['imgName']);
}

function forbidden() {
	header("Content-type: image/jpeg");
	header("location: images/forbidden.jpg");
}

function not_found() {
	header("Content-type: image/jpeg");
	header("location: images/not_found.jpg");
}
?>