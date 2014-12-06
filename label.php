<?php
session_start();
if(!isset($_SESSION['username'])) {
	session_destroy();
	header("location: index.php");
	return;
}
if (!isset($_POST['dbName'])) {
	header("location: index.php");
} else {
	$_SESSION['dbName'] = $_POST['dbName'];
}
?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Labeling | Visual NET</title>
<link rel="stylesheet" type="text/css" href="skin.css" />
<link rel="stylesheet" type="text/css" href="fancy.css" />
<script type="text/javascript" src="script/main.js"></script>
<script type="text/javascript" src="script/drag.js"></script>
<script type="text/javascript" src="script/coords.js"></script>
<script type="text/javascript" src="script/button.js"></script>
<script type="text/javascript" src="script/people.js"></script>
<script type="text/javascript" src="script/submit.js"></script>
<script type="text/javascript" src="script/data.js"></script>
<script type="text/javascript" src="script/template.js"></script>
<script type="text/javascript" src="script/help.js"></script>
<script type="text/javascript" src="script/ajax.js"></script>
<script type="text/javascript" src="script/shortcut.js"></script>
<script type="text/javascript" src="script/debug.js"></script>
</head>
<body>
<!--快捷键区域-->
<div id="keyArea" class="keySection"></div>

<!--调试输出区域-->
<div id="debugOutput" style="background-color: #FFF; display: none;">
    Debug output (press F10 to turn on or turn off)
    <input type="button" value="Clear" onclick="clearDebug();" />
    <div align="left" id="debugTxt"
        style="padding-left: 5px; width: 100%; height: 600px; overflow: scroll;"></div>
</div>

<!--主要标注区域-->
<div align="center">
    <table class="pageTable">
        <tr>
            <td width="250px" align="center" valign="top">
                <div class="logoSection" align="right">
                    <p style="text-align: center;">
                        <span style="font-size: 36px; color: #2E2E2E;">Visual NET</span>
                    </p>
                </div>

                <div style="text-align: right;">
                    <p>
                        Current person ID 
                        <select id="personSelect" style="width: 60px;" onchange="personChanged();"></select>&nbsp;
                        <input type="button" class="personButton" value="Delete" onclick="deleteClicked();" />&nbsp;&nbsp;
                    </p>
                    <p>
                        Next person ID 
                        <input id="newPersonId" style="width: 55px;" onchange="value=value?value.replace(/[^\d]/g,''):1;" type="number" min="1" value="1" />&nbsp;
                        <input type="button" class="personButton" value="Add" onclick="addClicked();" />&nbsp;&nbsp;
                    </p>
                </div>
                <input id="lv0" name="up" type="button" value="Level 0 Full Body" style="background-image: url(images/l0.png);" onclick="clickLv(0);" class="lvButton" />
                <div id="lv0dv" class="division"></div>
                <input id="lv1" name="up" type="button" value="Level 1 Face & Head" style="background-image: url(images/l1.png);" onclick="clickLv(1);" class="lvButton" />
                <div id="lv1dv" class="division">
                	<!--为了显示需要，将face按钮放在head按钮上面，但是实际上head是才dv=0-->
                    <input id="lv1dv1" name="up" type="button" value="face" onclick="clickLvDv(1, 1);" class="dvButton" />
                    <input id="lv1dv0" name="up" type="button" value="head" onclick="clickLvDv(1, 0);" class="dvButton" />
                </div>
                <input id="lv2" name="up" type="button" value="Level 2 Facial Landmarks" style="background-image: url(images/l2.png);" onclick="clickLv(2);" class="lvButton" />
                <div id="lv2dv" class="division">
                    <input id="lv2dv0" name="up" type="button" value="face contour" onclick="clickLvDv(2, 0);" class="dvButton" />
                    <input id="lv2dv1" name="up" type="button" value="right brow" onclick="clickLvDv(2, 1);" class="dvButton" />
                    <input id="lv2dv2" name="up" type="button" value="left brow"	onclick="clickLvDv(2, 2);" class="dvButton" />
                    <input id="lv2dv3" name="up" type="button" value="left eye" onclick="clickLvDv(2, 3);" class="dvButton" />
                    <input id="lv2dv4" name="up" type="button" value="right eye" onclick="clickLvDv(2, 4);" class="dvButton" />
                    <input id="lv2dv5" name="up" type="button" value="nose" onclick="clickLvDv(2, 5);" class="dvButton" />
                    <input id="lv2dv6" name="up" type="button" value="mouth" onclick="clickLvDv(2, 6);" class="dvButton" />
                </div>
                <input id="lv3" name="up" type="button" value="Level 3 Facial Components" style="background-image: url(images/l3_uncompleted.png);" onclick="clickLv(3);" class="lvButton" />
                <div id="lv3dv" class="division"></div>
                <input id="lv4" name="up" type="button" value="Level 4 Facial Texture" style="background-image: url(images/l4_uncompleted.png);" onclick="clickLv(4);" class="lvButton" />
                <div id="lv4dv" class="division"></div>

                <div class="subSection">
                    Image Infomation
                    <p align="left">
                        Database:<?php echo "<span id=\"dbNameTxt\">".$_SESSION['dbName']."</span>";?><br />
                        Image ID: <span id="imgIdTxt"></span><br />
                        Image size: <span id="sizeTxt"></span>
                    </p>
                </div>
            </td>
            <td valign="top">
                <div class="middlePart">
                    <div id="loadingTxt" class="loadingTxt">
                        <b>&nbsp;Loading image<br />&nbsp;Please wait...</b>
                    </div>
                    <div id="imageArea" class="imageSection">
                        <img width="700px" height="700px" id="thisImg" class="image" />
                    </div>
                    <div class="buttonSection">
                        <input type="button" value="Zoom in" onclick="zoomin();" class="zoomButton" />
                        <input type="button" value="Zoom out" onclick="zoomout();" class="zoomButton" />
                        <input type="button" value="Default zoom" onclick="resetImg();" class="zoomButton" />
                        <input type="button" value="100%" onclick="nozoom();" class="zoomButton" />
                        Now the image is <span id="zoomTxt">100%</span>.
                    </div>
                </div>
            </td>
            <td width="260px" align="center" valign="top">
                <div align="right" style="padding-right:5px;">
                    <input type="button" value="Help" onclick="help();" class="zoomButton" />
                    <input type="button" value="Log out" onclick="document.location = &quot;logout.php&quot;;" class="zoomButton" />
                </div>
                <div align="center" style="height: 555px;" class="subSection">
                    <span id="sampleTitle">Level 2 Facial Landmarks</span>
                    <p><a id="sampleImgLink" href="images/sample/l2.png" target="_blank"><img id="sampleImg" src="images/sample/l2_small.jpg" title="Click here for detail." /></a></p>
					<p style="color:red;"><b>Click on the above image for detail.</b></p>
                    <div id="sampleTxt" align="left">
                        <p>Level 2 consists of 7 parts: two bows, two eyes, a nose, a mouth and a contour.</p>
                        <p>The proper positions of the landmarks are shown in the picture above. There are 88 landmarks on this level.</p>
                    </div>
                </div>
                <div>
                    Username <input id="name" type="text" disabled="true" value="<?php echo $_SESSION['username'];?>" /><br />
                    <input id="submitButton" type="button" disabled="true" value="Loading first image..." onclick="submitLabel();" class="bigButton" /><br />
                </div>
            </td>
        </tr>
    </table>
</div>

<!--弹出窗口区域-->
<div id="fancyOverlay" class="overlay"></div>
<div id="fancyBox" class="fancy" src="help.php">
    <div class="logoSection">
        <p style="text-align: center;">
            <span style="font-size: 36px; color: #2E2E2E;">Visual NET - Support</span>
        </p>
    </div>
    <div class="subSection">
        <div style="max-height: 500px; overflow: scroll;">
            <p>Visual NET can be used with ease. An image can be annotated in less than one minute following the steps below:</p>
            <ul>
                <li>Step 1: Choose a level from the level buttons on the left. Then, the landmark points (small dots) will appear on the image.</li>
                <p align="center"><img src="images/help/1.png" /></p>
                <p>Note: you may show or hide components of this level by clicking on component buttons (if there are).</p>
                <p align="center"><img src="images/help/2.png" /></p>
                <hr />
                <li>Step 2: Drag the landmark points on the image to the proper position. An example is provided on the right of the screen.</li>
                <p>Note: there are three types of labels: anchor point(big and white), basis point (big, usually red) and fine point (small, usually red). When an anchor point is dragged (with <span style="color: #F00"><b>LEFT</b> </span> button), the whole component will move. However, if a basis point is dragged, neighbour points will move together. But if you drag a fine point, only the point itself will move.</p>
                <p>So, we suggest that you first move the whole component to the proper position by dragging anchor points according to the example. Then fit the contour of the component by dragging basis points. In the end, move fine points to adjust local shape if necessary.</p>
                <p>If you want anchor points to behave like basis points (i.e. only nearby points are affected when dragging), please use <span style="color: #F00"><b>RIGHT</b></span> button on the mouse. This only works with anchor points, and all other type of points will behave in the same way no matter which mouse button you use. </p>
                <p align="center"><img src="images/help/3.png" /></p>
                <p>You may zoom the image using the four zoom buttons on the top.</p>
                <p align="center"><img src="images/help/4.png" /></p>
                <hr />
                <li>Step 3: If you have finished annotating a level, a tick will appear on the corresponding level button.</li>
                <p align="center"><img src="images/help/5.png" /></p>
                <p>Click on the "submit" button on the lower right (or press ENTER key) to send your labels and load next image. (If you haven't finished any level, the browser will warn you. In this case, you should consider if you have missed any components of the level.)</p>
                <li>If you want to quit, click on the "logout" button on the upper right. It's also OK to close your browser directly.</li>
            </ul>
            <hr />
            <p>Keyboard shortcut:</p>
            <ul>
                <li>Scroll the image: ARROW keys.</li>
                <li>Submit: ENTER key.</li>
                <li>Next Person: N key.</li>
                <li>Delete Person: D key.</li>
            </ul>
            <hr />
            <p><b>If you have any further problems, please contact Ronghang HU (huronghang@hotmail.com) for support.</b></p>
            <p>Powered by State Key Lab of Intel. Tech. and Sys., Depart. of EE, Tsinghua Univ. All Rights Reserved.</p>
        </div>
        <p align="center"><input type="button" value="OK" onclick="closeFancy();" style="width: 200px; height: 40px;" /></p>
    </div>
</div>
</body>
</html>
