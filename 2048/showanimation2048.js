/**
 * Created by xiaosong on 2016/7/22.
 */
function showNumberAnimation(i,j,number){
    var theNumberCell = $("#number-cell-"+i+"-"+j);

    theNumberCell.css("background-color",getBackgroundColor(number));
    theNumberCell.css("color",getNumberColor(number));
    theNumberCell.text(number);
    theNumberCell.css("font-size",0.6*cellWidth+"px");
    theNumberCell.css("line-height",cellWidth+"px");
    theNumberCell.animate({
        "width":cellWidth+"px",
        "height":cellWidth+"px",
        "top":getPosTop(i,j),
        "left":getPosLeft(i,j)
    },500);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var theNumberCell = $("#number-cell-"+fromx+"-"+fromy);
    theNumberCell.animate({
        "top":getPosTop(tox,toy),
        "left":getPosLeft(tox,toy)
    },200);
}