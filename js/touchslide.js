/**
 * Created by Administrator on 2016/7/25 0025.
 */
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
//绑定事件
function ts_addTouchslide(object){
    object.addEventListener("touchstart",ts_moveStart);
    object.addEventListener("touchmove",ts_moveing);
    object.addEventListener("touchend",ts_moveEnd);
}
//滑动开始
function ts_moveStart(e){
    e.preventDefault();
    var touch = e.targetTouches[0];
    startX = touch.pageX;
    startY = touch.pageY;
}
//滑动中
function ts_moveing(e){
    e.preventDefault();
    var touch = e.targetTouches[0];
    endX = touch.pageX;
    endY = touch.pageY;
}
//滑动结束
function ts_moveEnd(e){
    e.preventDefault();
    var direction = ts_getMoveDirection()[0];
    switch (direction){
        case 'U':ts_touchToUp();break;
        case 'D':ts_touchToDown();break;
        case 'L':ts_touchToLeft();break;
        case 'R':ts_touchToRight();break;
    }
}
//获取滑动方向
function ts_getMoveDirection(){
    //连个方向的偏移量
    var changeX = endX - startX;
    var changeY = endY - startY;
    if(Math.abs(changeX) > Math.abs(changeY)){
        //以水平为主
        if(changeX > 30)
            return 'R';
        else if(changeX < -30)
            return 'L';
        else
            return 'N';
    }else if(Math.abs(changeX) < Math.abs(changeY)){
        //以垂直为主
        if(changeY > 30)
            return 'D';
        else if(changeY < -30)
            return 'U';
        else
            return 'N';
    }else{
        return 'N';
    }
}
//向上滑了
function ts_touchToUp(){}
//向下滑了
function ts_touchToDown(){}
//向左滑了
function ts_touchToLeft(){}
//向右滑了
function ts_touchToRight(){}