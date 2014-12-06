<?php
session_start();
if (isset($_SESSION['dbName'])) // 到首页时，重置Session中的dbName
	unset($_SESSION['dbName']);
?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="skin.css" />
<title>Home | Visual NET</title>
<script>
function register() {
	alert("Registration is currently unavailable. Please contact Ronghang HU (huronghang@hotmail.com) if you do need to register.");
}
</script>
</head>
<body>
<div align="center">
    <table style="position: relative; left: 0px; top: 0px;"
        class="pageTable">
        <tr>
            <td>
                <div class="logoSection" align="right">
                    <p class="bigText"><span style="font-size: 40px;">Visual NET - Home</span></p>
                </div>
                <table>
                    <tr>
                        <td>
                            <div class="introSection" style="width:380px; min-width:380px; min-height: 400px;">
                                <p class="bigText">What is Visual NET?</p>
                                <p align="left" style="font-size: 24px">
                                    <span class="midText">Visual NET is a multi-functional online image and video labeling system for computer vision and pattern recognition research purpose. It is developed by a research team led by Dr. Di WEN (assistant Prof.) and Ronghang HU (undergraduate student) from the State Key Lab of Intelligent Technology and Systems, Department of Electronic 											Engineering, Tsinghua University. <a href="about.php"><b>more...&gt;&gt;</b></a></span>
                                </p>
                            </div>
                        </td>
                        <td style="width: 420px;" class="midText">
                            <div align="center">
<?php
if (isset($_SESSION['username'])) { // 先检查用户是否已经登录，如果已经登录了，显示数据库列表
?>
                                <p class="bigText">
                                    Welcome back,
<?php
{echo $_SESSION['username']."!";
}
?>
                                    <input type="button" value="Log out" onclick="document.location = &quot;logout.php&quot;;" class="registerButton" />
                                </p>
                                <form name="loginForm" method="post" action="label.php">
                                    <table width="300" border="0" align="center" cellpadding="2"
                                        cellspacing="2">
                                        <tr>
                                            <td>Database</td>
                                            <td><select name="dbName" class="bigSelect">
<?php
// 列出数据库列表
require "marco.php";
if ($handle = opendir(RESOURCE_ROOT)) {
	$dbNameArr = array();
	while($dbName = readdir($handle)) {
		if ($dbName != "." && $dbName != ".." && is_dir(RESOURCE_ROOT.$dbName)) {
			$dbNameArr[] = $dbName;
		}
	}
	closedir($handle);
	
	sort($dbNameArr);
	foreach ($dbNameArr as $dbName) {
		echo "<option value=\"{$dbName}\">{$dbName}</option>";
	}
}
?>
                                            </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Option</td>
                                            <td>
                                            <select name="option" class="bigSelect">
                                                <option value="test1">Labeling</option>
                                            </select>
                                            </td>
                                        </tr>
                                    </table>
                                    <p>
                                        <br />
                                        <input type="submit" class="bigButton" value="Go to labeling!">
                                    </p>
                                </form>
<?php
} else { // 如果没有登录，显示登录框
?>
                                <p class="bigText">
                                    Already have an account? <input type="button" value="Register" onclick="register();" class="registerButton" />
                                </p>
                                <form name="loginForm" method="post" action="login.php">
                                    <table width="300" border="0" align="center" cellpadding="2"
                                        cellspacing="2">
                                        <tr>
                                            <td>Username</td>
                                            <td><input type="text" class="bigTextInput" name="username">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Password</td>
                                            <td><input type="password" class="bigTextInput" name="passcode"></td>
                                        </tr>
                                    </table>
                                    <p>
                                        <span style="color: #F00;">&nbsp;
<?php
if (isset($_SESSION['loginFail'])) {
?>
                                            Invalid username or password
<?php
}
?>
                                        </span><br />
                                        <input type="submit" class="bigButton" value="Start it now!">
                                    </p>
                                </form>
<?php
}
?>
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="logoSection" align="right">
                    <p class="buttomText">State Key Lab of Intel. Tech. and Sys., Depart. of EE, Tsinghua Univ.</p>
                </div>
            </td>
        </tr>
    </table>
</div>
</body>
</html>
