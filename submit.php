<?php
require "filesystem.php";
session_start();
if (!isset($_POST['submit'])) { // 如果根本没有post submit（通常是直接打开网址的），把他返回登录页
	session_destroy();
	header("location: index.php");
	return;
}
if (!isset($_SESSION['username'])) { // 先检查用户是否已经登录，并且已经设置了dbName
	session_destroy();
	echo 'error;username or dbName is null;';
	return;
}
if (!isset($_SESSION['dbName']) || !isset($_POST['dbName'])
	 || $_POST['dbName'] != $_SESSION['dbName']) { // 检查用户提交的数据库名与服务器记录的当前用户正在标定的数据库名是否一致
	session_destroy();
	echo 'error;dbName mismatch;';
	return;
}

if ($_POST['submit']) { // 如果要提交数据，则记录数据
	try {
		collectAndSaveData();
	} catch(Exception $e) { // 如果数据非法，则写入错误日志
		writeError($e->getMessage());
		echo 'error;'.$e->getMessage().';';
		return;
	}
}

$dbName			= $_SESSION['dbName'];
$nextImgID 		= imgIDToLabel($dbName);
$nextImgName	= imgName($dbName, $nextImgID);
if ($nextImgName != "null") {
	echo $nextImgID.";getimage.php?dbName=".$dbName."&imgName=".$nextImgName.";";
} else {
	echo("null;null;");
}

function collectAndSaveData() { // 收集客户端发来的数据，并且保存到文本文件中，并且把标注记录写入用户信息
	$levelNum 	= 5;

	// 读取客户端发送的数据
	$username 	= $_SESSION["username"];
	$dbName		= $_SESSION["dbName"];
	$postImgID	= $_POST["imgId"];
	$personArr 	= explode("_", $_POST["personID"]); // 将personID字符串分割成数组，每个记录一个人的ID
	foreach ($personArr as $personID) { // 收集每个person的数据
		for ($lv = 0; $lv < $levelNum; $lv++) {
			$lvLabelNumArr[$personID][$lv] = $_POST["P".$personID."L".$lv];
			for ($id = 0; $id < $lvLabelNumArr[$personID][$lv]; $id++) {
				$XcoordsArr[$personID][] = $_POST["P".$personID."L".$lv."_".$id."x"];
				$YcoordsArr[$personID][] = $_POST["P".$personID."L".$lv."_".$id."y"];
			}
		}
	}

	// 存储数据到 图像文件名.csv 文件中
	$imgName = imgName($dbName, $postImgID);
	$resultPath = resultPath($dbName);
	$file = fopen($resultPath."/".$imgName.".txt", "w");
//	fwrite($file, "begin\n");
//	fwrite($file, "time,".date("Y,m,d,H,i,s")."\n");
//	fwrite($file, "database,".$dbName."\n");
//	fwrite($file, "username,".$username."\n");
//	fwrite($file, "imageName,".$imgName."\n");
//	fwrite($file, "personID");
//	foreach($personArr as $personID) {
//		fwrite($file, ",".$personID);
//	}
//	fwrite($file, "\n");
	foreach($personArr as $personID) {
		for ($globalId = 0, $lv = 0; $lv < $levelNum; $lv++) {
			$lvLabelNum = $lvLabelNumArr[$personID][$lv];
			for ($id = 0; $id < $lvLabelNum; $id++) {
				fwrite($file, $XcoordsArr[$personID][$globalId]." "
						.$YcoordsArr[$personID][$globalId]."\r\n");
				$globalId++;
			}
		}
	}
//	fwrite($file, "end\n\n");
	fclose($file);

	// 写入该标记哪一张的信息到 next.csv 中
	$handle = fopen($resultPath."/next.csv", "w");
	fwrite($handle, $postImgID + 1);
	fclose($handle);
	
	// 写入用户标注信息到 用户名.csv 中
	$handle = fopen(USER_ROOT.$username."_label.csv", "a");
	fwrite($handle, date("Y,m,d,H,i,s").",".$dbName.",".$imgName."\n");
	fclose($handle);
}

function imgIDToLabel($dbName) { // 当用户首次打开这个数据库时，提供整个数据库标注到了第几张的信息

	//如果全都标注完了，则可能返回超过最大值的imageID。此时用这个imgID调用imgName得到的文件名为null
	$resultPath = resultPath($dbName);
	if (file_exists($resultPath."/next.csv")) {
		$handle = fopen($resultPath."/next.csv", "r");
		$record = fgetcsv($handle, 10);
		fclose($handle);
		return $record[0];
	} else { // 如果缺失next文件，则重建一个，从第0张开始标注
		initDatabase($dbName, false);
		return 0;
	}
}
?>