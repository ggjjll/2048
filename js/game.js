/**
 * Created by Administrator on 2016/7/31 0031.
 */
/*游戏数据部分*/
var blockNums = [2,4,8,16,32,64,128,256,512,1024,2048];
var blockColors = ["#fef4f2","#fed9a2","#fc8c5e","#fc682c","#fe5538","#ff3938",
                    "#00c1e7","#2dbdd2","#55b8c6","#1a9ab0","#000acc"];
var checkerX = new Array();
var checkerY = new Array();
var checkerNum = new Array();
var blockArr = new Array();

var isMoved = false;
var isMoving = false;
var userScroe;
var maxScroe;

window.onload = function(){
    initChecker();
    ts_addTouchslide(document.body);
    addEvent();
    newGame();
};
//绑定事件
function addEvent(){
    var reGameBtn = document.getElementById("reGameBtn");
    var buttons = document.getElementsByClassName("button");
    for(var i = 0; i < buttons.length; i ++){
        buttons[i].addEventListener("touchstart",function(){
            window.event? window.event.cancelBubble = true : e.stopPropagation();
            this.style.backgroundColor = "#00abcd";
        });
        buttons[i].addEventListener("touchend",function(){
            window.event? window.event.cancelBubble = true : e.stopPropagation();
            this.style.backgroundColor = "#52b9ca";
        })
    }
    reGameBtn.addEventListener("touchend",function(e){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        newGame();
    });
    var overGameBtn = document.getElementById("overGameBtn");
    overGameBtn.addEventListener("touchend",function(e){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        isMoved = true;
        addBlock();
    });
    var dialogBox = document.getElementById("dialogBox");
    dialogBox.addEventListener("touchend",function(e){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        var dialogs = document.getElementsByClassName("dialog");
        for(var i = 0; i < dialogs.length; i ++){
            anim_changeTopTo(dialogs[i],-300,8,null);
        }
        setTimeout(function(){
            dialogBox.style.visibility = "hidden";
            newGame();
        },80);
    });
}
//初始化checkerX  checkerY
function initChecker(){
    var checkers = document.getElementsByClassName("checker");
    for(var i = 0; i < 4; i ++){
        checkerX[i] = new Array();
        checkerY[i] = new Array();
        for(var j = 0; j < 4; j++){
            var index = i * 4 + j;
            checkerX[i][j] = checkers[index].offsetLeft;
            checkerY[i][j] = checkers[index].offsetTop;
            checkers[index].id = "che"+i+""+j;
        }
    }
}
//初始化棋盘内的值checkerNum
function initCheckerNum(){
    for(var i = 0; i < 4; i ++){
        checkerNum[i] = new Array();
        for(var j = 0; j < 4; j++){
            checkerNum[i][j] = -1;
        }
    }
}
//初始化对象数组
function initBlockArr(){
    for(var i = 0; i < 4; i ++){
        blockArr[i] = new Array();
        for(var j = 0; j < 4; j++){
            blockArr[i][j] = null;
        }
    }
}
//初始化游戏
function newGame(){
    initCheckerNum();
    initBlockArr();
    claerBlock("true");
    isMoved = true;
    addBlock();
    addBlock();
//    showCheckerNum();
    userScroe = 0;
    maxScroe = 0;
    if(localStorage.maxScroe_2048){
        maxScroe = localStorage.maxScroe_2048;
    }
    changeScore(0);
}
//随机坐标
function getRand(){
    return Math.floor(Math.random()*4);
}
//添加小方块
function addBlock(){
    var blocks = document.getElementsByClassName("block");
    if(blocks.length >= 16)
        return;
    if(!isMoved)
        return;
    var x = -1;
    var y = -1;
    do{
        x = getRand();
        y = getRand();
    }while(checkerNum[x][y] != -1);
    checkerNum[x][y] = 0;
    var newBlock = document.createElement('span');
    newBlock.className = "block";
    newBlock.isShow = true;
    newBlock.setAttribute("isShow",true);
    newBlock.style.left = checkerX[x][y] + "px";
    newBlock.style.top = checkerY[x][y] + "px";
    newBlock.setAttribute("blockLeft",checkerX[x][y]);
    newBlock.setAttribute("blockTop",checkerY[x][y]);
    newBlock.setAttribute("blockNum",0);
    newBlock.innerHTML = blockNums[0];
    newBlock.style.backgroundColor = blockColors[0];
    document.getElementById("checkerboard").appendChild(newBlock);
    blockArr[x][y] = newBlock;
//    showCheckerNum();
}
//滑动过程中
function moving(){
    if(isMoved){
        isMoving = true;
        gotoMove();
        setTimeout(function(){
            isMoving = false;
            claerBlock("false");
            changeBlock();
            addBlock();
            if(isOver())
                gameOver();
            if(isWin())
                gameWin();
        },80);
    }
}
//向上滑了
function ts_touchToUp(){
    if(isMoving)
        return;
    moveBlockToUp();
    moving();
}
//向下滑了
function ts_touchToDown(){
    if(isMoving)
        return;
    moveBlockToDown();
    moving();
}
//向左滑了
function ts_touchToLeft(){
    if(isMoving)
        return;
    moveBlockToLeft();
    moving();
}
//向右滑了
function ts_touchToRight(){
    if(isMoving)
        return;
    moveBlockToRight();
    moving();
}
//滑动动画
function gotoMove(){
    var blocks = document.getElementsByClassName("block");
    for(var i = 0; i < blocks.length; i++){
        var thisBlock = blocks[i];
        anim_changeXY(thisBlock,thisBlock.getAttribute("blockleft"),thisBlock.getAttribute("blocktop"),8,null);
    }
}
//游戏结束动画
function gameOver(){
    var dialogBox = document.getElementById("dialogBox");
    dialogBox.style.visibility = "visible";
    var dialogOver = document.getElementById("dialogOver");
    var height = document.body.offsetHeight;
    anim_changeTopTo(dialogOver,height * 0.3,30,null);
}
//游戏成功动画
function gameWin(){
    var dialogBox = document.getElementById("dialogBox");
    dialogBox.style.visibility = "visible";
    var dialogWin = document.getElementById("dialogWin");
    var height = document.body.offsetHeight;
    anim_changeTopTo(dialogWin,height * 0.3,30,null);
}
//清除block块儿
function claerBlock(condition){
    var blocks = document.getElementsByClassName("block");
    var length = blocks.length;
    for(var i = 0; i < length; i++){
        var thisBlock = blocks[i];
        if(thisBlock != undefined){
            var isshow = thisBlock.getAttribute("isshow");
            if(isshow == condition){
                thisBlock.remove();
                i --;
            }
        }
    }
}
//修改方块样式
function changeBlock(){
    var blocks = document.getElementsByClassName("block");
    for(var i = 0; i < blocks.length; i++) {
        var thisBlock = blocks[i];
        var blocknum = thisBlock.getAttribute("blocknum");
        thisBlock.innerHTML = blockNums[blocknum];
        thisBlock.style.backgroundColor = blockColors[blocknum];
        if(blocknum > 2)
            thisBlock.style.color = "#f8fefe";
    }
}
//向上滑动方块
function moveBlockToUp(){
    isMoved = false;
    for (var i = 0; i < 4; i++) {
        var lastIndex = 0;
        var lastNum = -2;
        for (var j = 0; j < 4; j++) {
            if (checkerNum[j][i] == -1)
                continue;
            else {
                if(checkerNum[j][i] != lastNum){
                    var t = checkerNum[j][i];
                    checkerNum[j][i] = -1;
                    checkerNum[lastIndex][i] = t;
                    if(t != checkerNum[j][i]){
                        isMoved = true;
                        blockArr[j][i].setAttribute("blocktop",checkerY[lastIndex][i]);
                        blockArr[j][i].setAttribute("blockleft",checkerX[lastIndex][i]);
                        blockArr[lastIndex][i] = blockArr[j][i];
                        blockArr[j][i] = null;
                    }
                    lastNum = checkerNum[lastIndex][i];
                    lastIndex ++;
                }
                else{
                    checkerNum[lastIndex - 1][i] = checkerNum[j][i] + 1;
                    checkerNum[j][i] = -1;
                    lastNum = -2;
                    isMoved = true;
                    blockArr[lastIndex - 1][i].setAttribute("isshow",false);
                    blockArr[j][i].setAttribute("blocktop",checkerY[lastIndex - 1][i]);
                    blockArr[j][i].setAttribute("blockleft",checkerX[lastIndex - 1][i]);
                    blockArr[j][i].setAttribute("blocknum",checkerNum[lastIndex - 1][i]);
                    blockArr[lastIndex - 1][i] = blockArr[j][i];
                    blockArr[j][i] = null;
                    changeScore(blockNums[checkerNum[j][i] + 1]);
                }
            }
        }
    }
//    showCheckerNum();
}
//向下滑动方块
function moveBlockToDown() {
    isMoved = false;
    for (var i = 0; i < 4; i++) {
        var lastIndex = 3;
        var lastNum = -2;
        for (var j = 3; j >= 0; j--) {
            if (checkerNum[j][i] == -1)
                continue;
            else {
                if(checkerNum[j][i] != lastNum){
                    var t = checkerNum[j][i];
                    checkerNum[j][i] = -1;
                    checkerNum[lastIndex][i] = t;
                    if(t != checkerNum[j][i]){
                        isMoved = true;
                        blockArr[j][i].setAttribute("blocktop",checkerY[lastIndex][i]);
                        blockArr[j][i].setAttribute("blockleft",checkerX[lastIndex][i]);
                        blockArr[lastIndex][i] = blockArr[j][i];
                        blockArr[j][i] = null;
                    }
                    lastNum = checkerNum[lastIndex][i];
                    lastIndex --;
                }
                else{
                    checkerNum[lastIndex + 1][i] = checkerNum[j][i] + 1;
                    checkerNum[j][i] = -1;
                    lastNum = -2;
                    isMoved = true;
                    blockArr[lastIndex + 1][i].setAttribute("isshow",false);
                    blockArr[j][i].setAttribute("blocktop",checkerY[lastIndex + 1][i]);
                    blockArr[j][i].setAttribute("blockleft",checkerX[lastIndex + 1][i]);
                    blockArr[j][i].setAttribute("blocknum",checkerNum[lastIndex + 1][i]);
                    blockArr[lastIndex + 1][i] = blockArr[j][i];
                    blockArr[j][i] = null;
                    changeScore(blockNums[checkerNum[j][i] + 1]);
                }
            }
        }
    }
//    showCheckerNum();
}
//向左滑动方块
function moveBlockToLeft() {
    isMoved = false;
    for (var i = 0; i < 4; i++) {
        var lastIndex = 0;
        var lastNum = -2;
        for (var j = 0; j < 4; j++) {
            if (checkerNum[i][j] == -1)
                continue;
            else {
                if(checkerNum[i][j] != lastNum){
                    var t = checkerNum[i][j];
                    checkerNum[i][j] = -1;
                    checkerNum[i][lastIndex] = t;
                    if(t != checkerNum[i][j]){
                        isMoved = true;
                        blockArr[i][j].setAttribute("blocktop",checkerY[i][lastIndex]);
                        blockArr[i][j].setAttribute("blockleft",checkerX[i][lastIndex]);
                        blockArr[i][lastIndex] = blockArr[i][j];
                        blockArr[i][j] = null;
                    }
                    lastNum = checkerNum[i][lastIndex];
                    lastIndex ++;
                }
                else{
                    checkerNum[i][lastIndex - 1] = checkerNum[i][j] + 1;
                    checkerNum[i][j] = -1;
                    lastNum = -2;
                    isMoved = true;
                    blockArr[i][lastIndex - 1].setAttribute("isshow",false);
                    blockArr[i][j].setAttribute("blocktop",checkerY[i][lastIndex - 1]);
                    blockArr[i][j].setAttribute("blockleft",checkerX[i][lastIndex - 1]);
                    blockArr[i][j].setAttribute("blocknum",checkerNum[i][lastIndex - 1]);
                    blockArr[i][lastIndex - 1] = blockArr[i][j];
                    blockArr[i][j] = null;
                    changeScore(blockNums[checkerNum[j][i] + 1]);
                }
            }
        }
    }
//    showCheckerNum();
}
//向右滑动方块
function moveBlockToRight() {
    isMoved = false;
    for (var i = 0; i < 4; i++) {
        var lastIndex = 3;
        var lastNum = -2;
        for (var j = 3; j >= 0; j--) {
            if (checkerNum[i][j] == -1)
                continue;
            else {
                if(checkerNum[i][j] != lastNum){
                    var t = checkerNum[i][j];
                    checkerNum[i][j] = -1;
                    checkerNum[i][lastIndex] = t;
                    if(t != checkerNum[i][j]){
                        isMoved = true;
                        blockArr[i][j].setAttribute("blocktop",checkerY[i][lastIndex]);
                        blockArr[i][j].setAttribute("blockleft",checkerX[i][lastIndex]);
                        blockArr[i][lastIndex] = blockArr[i][j];
                        blockArr[i][j] = null;
                    }
                    lastNum = checkerNum[i][lastIndex];
                    lastIndex --;
                }
                else{
                    checkerNum[i][lastIndex + 1] = checkerNum[i][j] + 1;
                    checkerNum[i][j] = -1;
                    lastNum = -2;
                    isMoved = true;
                    blockArr[i][lastIndex + 1].setAttribute("isshow",false);
                    blockArr[i][j].setAttribute("blocktop",checkerY[i][lastIndex + 1]);
                    blockArr[i][j].setAttribute("blockleft",checkerX[i][lastIndex + 1]);
                    blockArr[i][j].setAttribute("blocknum",checkerNum[i][lastIndex + 1]);
                    blockArr[i][lastIndex + 1] = blockArr[i][j];
                    blockArr[i][j] = null;
                    changeScore(blockNums[checkerNum[j][i] + 1]);
                }
            }
        }
    }
//    showCheckerNum();
}
//修改当前成绩
function changeScore(addScroe){
    userScroe += addScroe;
    document.getElementById("userNowScore").innerHTML = userScroe;
    if(userScroe > maxScroe)
        maxScroe = userScroe;
    document.getElementById("userMaxScore").innerHTML = maxScroe;
    localStorage.maxScroe_2048 = maxScroe;
}
//验证是否游戏结束
function isOver(){
    var blocks = document.getElementsByClassName("block");
    if(blocks.length < 16)
        return false;
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            //上
            if(i - 1 >= 0)
                if(checkerNum[i - 1][j] == checkerNum[i][j])
                    return false;
            //下
            if(i + 1 < 4)
                if(checkerNum[i + 1][j] == checkerNum[i][j])
                    return false;
            //左
            if(j - 1 >= 0)
                if(checkerNum[i][j - 1] == checkerNum[i][j])
                    return false;
            //上
            if(j + 1 < 4)
                if(checkerNum[i][j + 1] == checkerNum[i][j])
                    return false;
        }
    }
    return true;
}
//判断游戏是否成功
function isWin(){
    for(var i = 0; i < 4; i ++) {
        for (var j = 0; j < 4; j++) {
            if(checkerNum[i][j] == 10)
                return true;
        }
    }
    return false;
}
//展示数据
function showCheckerNum(){
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 4; j++){
            var str = checkerNum[i][j];
            if(checkerNum[i][j] == -1)
                str = "";
            else
                str = checkerNum[i][j];
            document.getElementById("che"+i+""+j).innerHTML = str;
        }
    }
}
