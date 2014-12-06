// JavaScript Document

// ******创建对象用的模板 开始
function Quad52(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 1 / 2;
	this.w2 = 1 / 2;
	this.w3 = 0;
}

function Quad54(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 0;
	this.w2 = 1 / 2;
	this.w3 = 1 / 2;
}

function Quad72(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 2 / 3;
	this.w2 = 1 / 3;
	this.w3 = 0;
}

function Quad73(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 1 / 3;
	this.w2 = 2 / 3;
	this.w3 = 0;
}

function Quad75(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 0;
	this.w2 = 2 / 3;
	this.w3 = 1 / 3;
}

function Quad76(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 0;
	this.w2 = 1 / 3;
	this.w3 = 2 / 3;
}

function Quad92(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 3 / 4;
	this.w2 = 1 / 4;
	this.w3 = 0;
}

function Quad93(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 1 / 2;
	this.w2 = 1 / 2;
	this.w3 = 0;
}

function Quad94(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 1 / 4;
	this.w2 = 3 / 4;
	this.w3 = 0;
}

function Quad96(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 0;
	this.w2 = 3 / 4;
	this.w3 = 1 / 4;
}

function Quad97(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 0;
	this.w2 = 1 / 2;
	this.w3 = 1 / 2;
}

function Quad98(level, division, base1, base2, base3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = 0;
	this.w2 = 1 / 4;
	this.w3 = 3 / 4;
}

function Linear32(level, division, base1, base2) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 2; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = -1;
	this.w1 = 1 / 2;
	this.w2 = 1 / 2;
	this.w3 = 0;
}

function Linear42(level, division, base1, base2) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 2; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = -1;
	this.w1 = 2 / 3;
	this.w2 = 1 / 3;
	this.w3 = 0;
}

function Linear43(level, division, base1, base2) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 2; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = -1;
	this.w1 = 1 / 3;
	this.w2 = 2 / 3;
	this.w3 = 0;
}
function Linear52(level, division, base1, base2) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 2; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = -1;
	this.w1 = 3 / 4;
	this.w2 = 1 / 4;
	this.w3 = 0;
}

function Linear53(level, division, base1, base2) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 2; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = -1;
	this.w1 = 1 / 2;
	this.w2 = 1 / 2;
	this.w3 = 0;
}

function Linear54(level, division, base1, base2) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 2; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = -1;
	this.w1 = 1 / 4;
	this.w2 = 3 / 4;
	this.w3 = 0;
}

function AQuad(level, division, base1, base2, base3, weight1, weight2, weight3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 4; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = weight1 / (weight1 + weight2 + weight3);
	this.w2 = weight2 / (weight1 + weight2 + weight3);
	this.w3 = weight3 / (weight1 + weight2 + weight3);
}

function Quad(level, division, base1, base2, base3, weight1, weight2, weight3) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 3; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = lvRangeArr[level] + base3 - 1;
	this.w1 = weight1 / (weight1 + weight2 + weight3);
	this.w2 = weight2 / (weight1 + weight2 + weight3);
	this.w3 = weight3 / (weight1 + weight2 + weight3);
}

function Linear(level, division, base1, base2, weight1, weight2) { // 创建Label Info的模板
	this.lv = level;
	this.dv = division;
	this.type = 2; // 0: 锚点 1：基点 2：线性插值点 3：二次插值点 4：反二插值点
	this.b1 = lvRangeArr[level] + base1 - 1; // base为该Level下某个微调点的基点编号，从1开始，也就是88个点的模型里面从1开始的那个编号。
	this.b2 = lvRangeArr[level] + base2 - 1;
	this.b3 = -1;
	this.w1 = weight1 / (weight1 + weight2);
	this.w2 = weight2 / (weight1 + weight2);
	this.w3 = 0;
}

function Base(level, division) {
	this.lv = level;
	this.dv = division;
	this.type = 1;
	this.b1 = -1;
	this.b2 = -1;
	this.b3 = -1;
	this.w1 = 0;
	this.w2 = 0;
	this.w3 = 0;
}

function Anchor(level, division) {
	this.lv = level;
	this.dv = division;
	this.type = 0;
	this.b1 = -1;
	this.b2 = -1;
	this.b3 = -1;
	this.w1 = 0;
	this.w2 = 0;
	this.w3 = 0;
}

function RPos(x, y) { // 创建Label RPos的模板，为百分比
	this.x = x;
	this.y = y;
}
// ******创建对象用的模板 结束