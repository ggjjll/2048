/**
 * Created by Administrator on 2016/7/23 0023.
 */

function anim_changeXY(object,leftTo,TopTo,time,refun){
    anim_changeTopTo(object,TopTo,time,refun);
    anim_changeLeftTo(object,leftTo,time);
}

function anim_changeSize(object,scale,centerX,centerY,time,refun){
    anim_changeWidth(object,scale,centerX,time*2,refun);
    anim_changeHeight(object,scale,centerY,time*2);
}

function anim_changeWidth(object,scale,centerX,time,refun){
    var timer;
    var objWidth = object.offsetWidth;
    var objCenterX = object.offsetLeft + objWidth * centerX;
    var toWidth = parseInt(objWidth * scale);
    var changeWidth = (toWidth - objWidth) / time;
    if(changeWidth < 1 && changeWidth > 0){
        changeWidth = 1;
    }
    else if(changeWidth < 0 && changeWidth > -1){
        changeWidth = -1;
    }
    timer = setInterval(function(){
        objWidth = object.offsetWidth;
        var changeLeft = - objWidth * centerX;
        if(scale > 1 ? objWidth >= toWidth : objWidth <= toWidth){
            object.style.width = toWidth + "px";
            changeWidth = 0;
            if(refun != null)
                refun();
            clearInterval(timer);
        }
        else{
            object.style.width = object.offsetWidth + changeWidth + "px";
            object.style.left = objCenterX + changeLeft + "px";
        }
    },10);
}

function anim_changeHeight(object,scale,centerY,time,refun){
    var timer;
    var objHeight = object.offsetHeight;
    var objCenterY = object.offsetTop + objHeight * centerY;
    var toHeight = objHeight * scale;
    var changeHeight = (toHeight - objHeight) / time;
    if(changeHeight < 1 && changeHeight > 0){
        changeHeight = 1;
    }
    else if(changeHeight < 0 && changeHeight > -1){
        changeHeight = -1;
    }
    timer = setInterval(function(){
        objHeight = object.offsetHeight;
        var changeLeft = - objHeight * centerY;
        if(scale > 1 ? objHeight >= toHeight : objHeight <= toHeight){
            object.style.height = toHeight + "px";
            changeHeight = 0;
            if(refun != null)
                refun();
            clearInterval(timer);
        }
        else{
            object.style.height = object.offsetHeight + changeHeight + "px";
            object.style.top = objCenterY + changeLeft + "px";
        }
    },10);
}

function anim_changeLeftTo(object,leftTo,time,refun){
    var timer;
    var objLeft = object.offsetLeft;
    if(objLeft == leftTo)
        return;
    var changeLeft = (leftTo - objLeft) / time;
    if(changeLeft < 1 && changeLeft > 0){
        changeLeft = 1;
    }
    else if(changeLeft < 0 && changeLeft > -1){
        changeLeft = -1;
    }
    timer = setInterval(function(){
        if(objLeft < leftTo ? object.offsetLeft >= leftTo : object.offsetLeft <= leftTo){
            object.style.left = leftTo + "px";
            if(refun != null)
                refun();
            clearInterval(timer);
        }
        else
            object.style.left = object.offsetLeft + changeLeft + "px";
    },10);
}

function anim_changeTopTo(object,topTo,time,refun){
    var timer;
    var objTop = object.offsetTop;
    if(objTop == topTo)
        return;
    var changeTop = (topTo - objTop) / time;
    if(changeTop < 1 && changeTop > 0){
        changeTop = 1;
    }
    else if(changeTop < 0 && changeTop > -1){
        changeTop = -1;
    }
    timer = setInterval(function(){
        if(objTop < topTo ? object.offsetTop >= topTo : object.offsetTop <= topTo){
            object.style.top = topTo + "px";
            if(refun != null)
                refun();
            clearInterval(timer);
        }
        else
            object.style.top = object.offsetTop + changeTop + "px";
    },10);
}

function anim_changeBgColorRGBA(object,RTo,GTo,BTo,ATo,time){
    var changeR = 0;
    var changeG = 0;
    var changeB = 0;
    var changeA = 0;
    var objectR = getBgcR(object);
    var objectG = getBgcG(object);
    var objectB = getBgcB(object);
    var objectA = getBgcA(object);
    
    if(objectR != RTo){
        changeR = (objectR - RTo)/time;
        if(changeR < 1 && changeR > 0){
            changeR = 1;
        }
        else if(changeR < 0 && changeR > -1){
            changeR = -1;
        }
    }
    if(objectG != GTo){
        changeG = (objectG - GTo)/time;
        if(changeG < 1 && changeG > 0){
            changeG = 1;
        }
        else if(changeG < 0 && changeG > -1){
            changeG = -1;
        }
    }
    if(objectB != BTo){
        changeB = (objectB - BTo)/time;
        if(changeB < 1 && changeB > 0){
            changeB = 1;
        }
        else if(changeB < 0 && changeR > -1){
            changeB = -1;
        }
    }
    if(objectA != ATo){
        changeA = parseFloat((objectA - ATo)/time);
    }
    alert(changeA);
    timer = setInterval(function(){
        if(objectR < RTo ? getBgcR(object) >= objectR : getBgcR(object) <= objectR){
            object.style.backgroundColor = "rgba(" + getBgcR(object) + changeR + "," + getBgcG(object) + "," + getBgcB(object) + "," + getBgcA(object) + ")";
        }
        else
            changeR = 0;
        if(objectG < GTo ? getBgcG(object) >= objectG : getBgcG(object) <= objectG){
            object.style.backgroundColor = "rgba(" + getBgcR(object) + "," + getBgcG(object) + changeG + "," + getBgcB(object) + "," + getBgcA(object) + ")";
        }
        else
            changeG = 0;
        if(objectB < BTo ? getBgcB(object) >= objectB : getBgcB(object) <= objectB){
            object.style.backgroundColor = "rgba(" + getBgcR(object) + "," + getBgcG(object) + "," + getBgcB(object) + changeB + "," + getBgcA(object) + ")";
        }
        else
            changeB = 0;
        if(objectA < RTo ? getBgcA(object) >= objectA : getBgcA(object) <= objectA){
            object.style.backgroundColor = "rgba(" + getBgcR(object) + "," + getBgcG(object) + "," + getBgcB(object) + "," + parseFloat(1 - getBgcA(object) + changeA)+ ")";
        }
        else
            changeA = 0;
        if(changeR == 0 && changeG == 0 && changeB == 0 && changeA == 0){
            clearInterval(timer);
        }
    },10);
}

function getBgcR(object){
    var objBgc = object.style.backgroundColor;
    var first = objBgc.indexOf('(');
    var end = objBgc.indexOf(')');
    var color = objBgc.substr(first + 1,end - first - 1);
    var rgba = color.split(',');
    return parseInt(rgba[0]);
}

function getBgcG(object){
    var objBgc = object.style.backgroundColor;
    var first = objBgc.indexOf('(');
    var end = objBgc.indexOf(')');
    var color = objBgc.substr(first + 1,end - first - 1);
    var rgba = color.split(',');
    return parseInt(rgba[1]);
}

function getBgcB(object){
    var objBgc = object.style.backgroundColor;
    var first = objBgc.indexOf('(');
    var end = objBgc.indexOf(')');
    var color = objBgc.substr(first + 1,end - first - 1);
    var rgba = color.split(',');
    return parseInt(rgba[2]);
}

function getBgcA(object){
    var objBgc = object.style.backgroundColor;
    var first = objBgc.indexOf('(');
    var end = objBgc.indexOf(')');
    var color = objBgc.substr(first + 1,end - first - 1);
    var rgba = color.split(',');
    return parseFloat(rgba[3]);
}