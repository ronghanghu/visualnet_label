<?php
require "marco.php";

function resourcePath($dbName) { // 返回一个数据库的根目录，不包含最后的"/"
	return RESOURCE_ROOT.$dbName;
}

function resultPath($dbName) { // 返回一个存储数据结果的目录，不包含最后的"/"
	return RESULT_ROOT.$dbName;
}

function imgName($dbName, $imgID) { // 返回图像的完整文件名
	$resultPath = resultPath($dbName);
	if (!(file_exists($resultPath."/info.csv"))) { // 检查是否存在相应的数据库信息
		initDatabase($dbName, true);
	}
	$handle = fopen($resultPath."/info.csv", "r");
	while ($record = fgetcsv($handle, 100)) { // 读取文件的ID和文件名之间的对应关系数据
		if ($record[0] == $imgID) {
			fclose($handle);
			return $imgName = $record[1];
		}
	}
	fclose($handle);
	return "null"; // 如果传入函数的$imgID参数比info中的最大行ID还大时会执行到本行
}

function initDatabase($dbName, $createInfo) { // 如果result目录下某个数据库的信息在还不存在，则建立数据库子目录，建立info.csv和next.csv

	// 创建新的result目录
	$resultPath = resultPath($dbName);
	if (!file_exists($resultPath))
		mkdir($resultPath); // 注意，这里要求创建目录之前他的父目录必须已经存在

	if ($createInfo) { // 创建Info信息
		// 读取resource中的资源文件夹中的文件，并且存入文件列表
		$resourcePath = resourcePath($dbName);
		if (!($handle = opendir($resourcePath))) {
			die ("Cannot open resource path");
		}

		$filenames = array();
		$filecount = 0;
		while($imagefile = readdir($handle)) {
			$extension = strtolower(pathinfo($imagefile, PATHINFO_EXTENSION)); // 获取文件扩展名并且转化为小写字母
			if ($extension == "jpg" || $extension == "jpeg") {
				$filenames[] = $imagefile;
				$filecount++;
			}
		}
		closedir($handle);

		sort($filenames); // 对文件名进行排序

		// 将文件ID与文件名写入csv信息文件中
		$infofile = fopen($resultPath."/info.csv", "w");
		for ($fileID = 0; $fileID < $filecount; $fileID++) {
			fwrite($infofile, $fileID.",".$filenames[$fileID]."\n");
		}
		fwrite($infofile, $fileID.",null\n"); // 在最后一行写上null，表示该数据库从这个ID开始已经没有图像了
		fclose($infofile);
	}

	// 写入该标注第几张的信息
	$handle = fopen($resultPath."/next.csv", "w");
	fwrite($handle, 0); // 从第0张开始标注
	fclose($handle);
}

function writeError($msg) {
	$file = fopen(SYSTEM_ROOT."errorlog.csv", "a");
	fwrite($file, "begin\n");
	fwrite($file, "time,".date("Y,m,d,H,i,s")."\n");
	fwrite($file, "message,".$msg."\n");
	fwrite($file, "end\n\n");
	fclose($file);
}
?>