// JavaScript Document

// ******录入Label信息 开始
var lvNum = 5;
var lvLabelNumArr = new Array(13, 7, 37, 0, 0); // 各个level中的label数
var lvRangeArr  // 各个Level的起始编号（下标为level，值为该level在labelArr的起始下标）
	= new Array(0,
		lvLabelNumArr[0], 
		lvLabelNumArr[0] + lvLabelNumArr[1], 
		lvLabelNumArr[0] + lvLabelNumArr[1] + lvLabelNumArr[2],
		lvLabelNumArr[0] + lvLabelNumArr[1] + lvLabelNumArr[2] + lvLabelNumArr[3], 
		lvLabelNumArr[0] + lvLabelNumArr[1] + lvLabelNumArr[2] + lvLabelNumArr[3] + lvLabelNumArr[4]);

var lvDvRangeArr = new Array(); // 二维数组，每一个元素是一个一维数组，如下
	lvDvRangeArr[0] = new Array(0, lvLabelNumArr[0]); // Level 0中各个division的相对起始编号，每个Level从0计，最后还有一个“结束哨兵”
	lvDvRangeArr[1] = new Array(0, 3, lvLabelNumArr[1]); // Level 1中各个division的相对起始编号，每个Level从0计，最后还有一个“结束哨兵”
	lvDvRangeArr[2] = new Array(0, 11, 15, 19, 23, 27, 32, lvLabelNumArr[2]); // Level 2中各个division的相对起始编号，每个Level从0计，最后还有一个“结束哨兵”
	lvDvRangeArr[3] = new Array(0, lvLabelNumArr[3]); // Level 3中各个division的相对起始编号，每个Level从0计，最后还有一个“结束哨兵”
	lvDvRangeArr[4] = new Array(0, lvLabelNumArr[4]); // Level 4中各个division的相对起始编号，每个Level从0计，最后还有一个“结束哨兵”

var labelInfoArr = new Array(); // Label的相关信息，包括插值类型（比如是锚点直线端点/二次曲线端点/微调点），插值基准点
function createLabelInfo() { // 通过template.js中的模板创建Label相关信息

	// 要增加landmark，记得修改lvRangeArr和lvDvRangeArr
	// 以下Label相对位置信息必须按照从L0到L4，每个Level内按序号从小到大排列

	// L0
	labelInfoArr.push(new Anchor(0, 0)); // 前胸
	labelInfoArr.push(new Base(0, 0)); // 脸中央
	labelInfoArr.push(new Base(0, 0)); // 左肩
	labelInfoArr.push(new Linear32(0, 0, 3, 5)); // 左肘
	labelInfoArr.push(new Base(0, 0)); // 左手
	labelInfoArr.push(new Base(0, 0)); // 右肩
	labelInfoArr.push(new Linear32(0, 0, 6, 8)); // 右肘
	labelInfoArr.push(new Base(0, 0)); // 右手
	labelInfoArr.push(new Base(0, 0)); // 裤裆
	labelInfoArr.push(new Base(0, 0)); // 左膝
	labelInfoArr.push(new Base(0, 0)); // 左脚
	labelInfoArr.push(new Base(0, 0)); // 右膝
	labelInfoArr.push(new Base(0, 0)); // 右脚

	// L1 head
	labelInfoArr.push(new Anchor(1, 0)); // 脖子
	labelInfoArr.push(new Base(1, 0)); // 左肩
	labelInfoArr.push(new Base(1, 0)); // 右肩

	// L1 face
	labelInfoArr.push(new Base(1, 1)); // 左眼
	labelInfoArr.push(new Base(1, 1)); // 右眼
	labelInfoArr.push(new Anchor(1, 1)); // 鼻子
	labelInfoArr.push(new Base(1, 1));// 嘴巴
	
	// L2脸颊，1~11
	labelInfoArr.push(new Base(2, 0)); // 基点
	labelInfoArr.push(new Quad52(2, 0, 1, 3, 6));
	labelInfoArr.push(new Base(2, 0)); // 基点
	labelInfoArr.push(new Quad72(2, 0, 3, 6, 9));
	labelInfoArr.push(new Quad73(2, 0, 3, 6, 9));
	labelInfoArr.push(new Anchor(2, 0)); // 锚点
	labelInfoArr.push(new Quad75(2, 0, 3, 6, 9));
	labelInfoArr.push(new Quad76(2, 0, 3, 6, 9));
	labelInfoArr.push(new Base(2, 0)); // 基点
	labelInfoArr.push(new Quad54(2, 0, 6, 9, 11));
	labelInfoArr.push(new Base(2, 0)); // 基点

	// L2右眉，12~15
	labelInfoArr.push(new Anchor(2, 1)); // 锚点
	labelInfoArr.push(new Base(2, 1)); // 基点
	labelInfoArr.push(new Base(2, 1)); // 基点
	labelInfoArr.push(new Base(2, 1)); // 基点
	
	// L2左眉，16~19
	labelInfoArr.push(new Anchor(2, 2)); // 锚点
	labelInfoArr.push(new Base(2, 2)); // 基点
	labelInfoArr.push(new Base(2, 2)); // 基点
	labelInfoArr.push(new Base(2, 2)); // 基点

	// L2左眼，20~23
	labelInfoArr.push(new Anchor(2, 3)); // 锚点
	labelInfoArr.push(new Base(2, 3)); // 左二插
	labelInfoArr.push(new Base(2, 3)); // 基点
	labelInfoArr.push(new Base(2, 3)); // 右二插
	
	// L2右眼，24~27
	labelInfoArr.push(new Anchor(2, 4)); // 锚点
	labelInfoArr.push(new Base(2, 4)); // 左二插
	labelInfoArr.push(new Base(2, 4)); // 基点
	labelInfoArr.push(new Base(2, 4)); // 右二插

	// L2鼻子，28~32
	labelInfoArr.push(new Base(2, 5)); // 基点
	labelInfoArr.push(new Base(2, 5)); // 基点
	labelInfoArr.push(new Base(2, 5)); // 基点
	labelInfoArr.push(new Base(2, 5)); // 基点
	labelInfoArr.push(new Anchor(2, 5)); // 锚点
	
	// L2嘴巴，33~37
	labelInfoArr.push(new Base(2, 6)); // 基点
	labelInfoArr.push(new Base(2, 6)); // 基点
	labelInfoArr.push(new Anchor(2, 6)); // 基点
	labelInfoArr.push(new Base(2, 6)); // 基点
	labelInfoArr.push(new Base(2, 6)); // 基点
}

var RPosArr = new Array(); // 各个Label的相对位置信息数组
function createRPos() { // 创建Label相对位置信息，注意：只要锚点和基点位置正确即可，精调点会在initLabel()中进行初始插值修正
	
	var default_x = 10; // 插值点的初始坐标（会被马上覆盖，没有价值）
	var default_y = 10; // 插值点的初始坐标（会被马上覆盖，没有价值）

	// 要增加landmark，记得修改lvRangeArr和lvDvRangeArr
	// 以下Label相对位置信息必须按照从L0到L4，每个Level内按序号从小到大排列

	// L0
	RPosArr.push(new RPos(50, 40)); // 前胸
	RPosArr.push(new RPos(50, 30)); // 脸中央
	RPosArr.push(new RPos(42, 40)); // 左肩
	RPosArr.push(new RPos(default_x, default_y)); // 左肘
	RPosArr.push(new RPos(40, 53)); // 左手
	RPosArr.push(new RPos(58, 40)); // 右肩
	RPosArr.push(new RPos(default_x, default_y)); // 右肘
	RPosArr.push(new RPos(60, 53)); // 右手
	RPosArr.push(new RPos(50, 53)); // 裤裆
	RPosArr.push(new RPos(46, 60)); // 左膝
	RPosArr.push(new RPos(45, 70)); // 左脚
	RPosArr.push(new RPos(54, 60)); // 右膝
	RPosArr.push(new RPos(55, 70)); // 右脚

	// L1 head
	RPosArr.push(new RPos(50, 55)); // 脖子
	RPosArr.push(new RPos(30, 62)); // 左肩
	RPosArr.push(new RPos(70, 62)); // 右肩

	// L1 face
	RPosArr.push(new RPos(45, 35)); // 左眼
	RPosArr.push(new RPos(55, 35)); // 右眼
	RPosArr.push(new RPos(50, 40)); // 鼻子
	RPosArr.push(new RPos(50, 45)); // 嘴巴

	// L2脸颊，1~11
	RPosArr.push(new RPos(11, 25));
	RPosArr.push(new RPos(default_x, default_y));
	RPosArr.push(new RPos(20, 75));
	RPosArr.push(new RPos(default_x, default_y));
	RPosArr.push(new RPos(default_x, default_y));
	RPosArr.push(new RPos(50, 90));
	RPosArr.push(new RPos(default_x, default_y));
	RPosArr.push(new RPos(default_x, default_y));
	RPosArr.push(new RPos(80, 75));
	RPosArr.push(new RPos(default_x, default_y));
	RPosArr.push(new RPos(89, 25));

	// L2右眉，12~15
	RPosArr.push(new RPos(80, 15));
	RPosArr.push(new RPos(75, 12));
	RPosArr.push(new RPos(67, 12));
	RPosArr.push(new RPos(62, 15));
	
	// L2左眉，16~19
	RPosArr.push(new RPos(20, 15));
	RPosArr.push(new RPos(25, 12));
	RPosArr.push(new RPos(33, 12));
	RPosArr.push(new RPos(38, 15));

	// L2左眼，20~23
	RPosArr.push(new RPos(24, 25));
	RPosArr.push(new RPos(30, 22));
	RPosArr.push(new RPos(35, 25));
	RPosArr.push(new RPos(30, 28));
	
	// L2右眼，24~27
	RPosArr.push(new RPos(76, 25));
	RPosArr.push(new RPos(70, 22));
	RPosArr.push(new RPos(65, 25));
	RPosArr.push(new RPos(70, 28));

	// L2鼻子，28~32
	RPosArr.push(new RPos(40, 50));
	RPosArr.push(new RPos(50, 53));
	RPosArr.push(new RPos(60, 50));
	RPosArr.push(new RPos(50, 25));
	RPosArr.push(new RPos(50, 45));
	
	// L2嘴巴，33~37
	RPosArr.push(new RPos(55, 62));
	RPosArr.push(new RPos(62, 65));
	RPosArr.push(new RPos(50, 70));
	RPosArr.push(new RPos(38, 65));
	RPosArr.push(new RPos(45, 62));
}
// ******录入Label信息 开始

// ******下标处理函数 开始
function getRange(lv, dv) { // 从某一个点的Level和Division编号获取该division的点在LabelArr中的下标范围
	return {
		b : lvRangeArr[lv] + lvDvRangeArr[lv][dv],
		e : lvRangeArr[lv] + lvDvRangeArr[lv][dv + 1]
	};
}
// ******下标处理函数 结束