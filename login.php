<?php
require "marco.php";
session_start();
$username = $_POST['username'];
$passcode = $_POST['passcode'];
if (checkUser($username, $passcode) > 0) {
	$_SESSION['username']	= $username;
	if (isset($_SESSION['loginFail']))
		unset($_SESSION['loginFail']);
} else {
	$_SESSION['loginFail']	= true;
}
header("location: index.php");

function checkUser($username, $passcode) { // 从文件中检查用户名密码是否匹配，返回此用户的权限数值。如果不存在这个用户，或者用户密码不正确，则返回-1
	$handle = fopen(USER_ROOT."password.csv", "r");
	while ($record = fgetcsv($handle, 1000)) {
		if ($record[0] == $username && $record[1] == $passcode)
			return $record[2];
	}
	return 0;
}
?>