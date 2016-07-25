/**
 * Created by xiaosong on 2016/7/22.
 */
var board = new Array();
var score = 0;


var documentScreenWidth = window.screen.availWidth;
var gridWidth = 0.92*documentScreenWidth*2.5;
var cellWidth = 0.18*documentScreenWidth*2.5;
var gapWidth = 0.04*documentScreenWidth*2.5;


function prepareForMobel(){
    $("#grid-container").css("width",(gridWidth - 2*gapWidth)+"px");
    $("#grid-container").css("height",(gridWidth - 2*gapWidth)+"px");
    $("#grid-container").css("padding",(gapWidth)+"px");
    $("#grid-container").css("border-radius",(0.02*gridWidth)+"px");
    $("#grid-container").css("margin-top",(2*gapWidth)+"px");
    $("#grid-container").css("margin-bottom",(2*gapWidth)+"px");
    $(".grid-cell").css("width",cellWidth+"px");
    $(".grid-cell").css("height",cellWidth+"px");
    $(".grid-cell").css("border-radius",(0.02*cellWidth)+"px");
}


$(document).ready(function(){
    if(documentScreenWidth>500) {
        gridWidth = 500;
        cellWidth = 100;
        gapWidth = 20;
    }
        prepareForMobel();

    newGame();
});


function newGame(){



    //初始化
    init();
    //在随机两个格子中生成数字

    generateOneNumber();
    generateOneNumber();

}

function init(){
    score=0;
    for(var i =0;i<4;i++){
        board[i]=new Array();
        for(var j = 0;j<4;j++){
            board[i][j]=0;
            var gridCell = $("#grid-cell-"+i+"-"+j);

            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }

    updateBoardView();
}

function updateBoardView(){

    $(".number-cell").remove();

    for(var i =0;i<4;i++){
        for(var j = 0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $("#number-cell-"+i+"-"+j);
            $("#score").text(score);
            if(board[i][j]==0){
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");

                theNumberCell.css("top",getPosTop(i,j)+cellWidth/2);
                theNumberCell.css("left",getPosLeft(i,j)+cellWidth/2);
            }else{
                theNumberCell.css("width",cellWidth+"px");
                theNumberCell.css("height",cellWidth+"px");

                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));

                theNumberCell.css("background-color",getBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                if(board[i][j]>512){
                    theNumberCell.css("font-size",0.4*cellWidth+"px");
                }
                theNumberCell.text(board[i][j]);
                theNumberCell.css("font-size",0.6*cellWidth+"px");
                theNumberCell.css("line-height",cellWidth+"px");

            }
        }
    }
}


function  generateOneNumber(){
    if(noSpace(board)){
        return false;
    }

    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));

    while(true){
        if(board[randx][randy]==0){
            break;
        }
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }

    var number =Math.random()<0.5?2:4;

    board[randx][randy]=number;
    showNumberAnimation(randx,randy,number);
}

var startx = 0;
var starty=0;
//支持触控
document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
    event.preventDefault();
    var endx = event.changedTouches[0].pageX;
    var endy = event.changedTouches[0].pageY;
    var deltax = endx - startx;
    var deltay = endy-starty;
    if(Math.abs(deltax) < 0.3*documentScreenWidth && Math.abs(deltay) < 0.3*documentScreenWidth){
        return;
    }
    if(Math.abs(deltax) >Math.abs(deltay)){
        if(deltax < 0){
            if(moveLeft()){
                generateOneNumber();
                isGameOver();
            }
        }else{
            if(moveRight()){
                generateOneNumber();
                isGameOver();
            }
        }
    }else{
        if(deltay < 0){
            if(moveUp()){
                generateOneNumber();
                isGameOver();
            }
        }else{
            if(moveDown()){
                generateOneNumber();
                isGameOver();
            }
        }
    }
});

document.addEventListener('touchmove',function(event){
    event.preventDefault();
});


$(document).keydown(function(event){
    switch (event.keyCode){
        case 37:
            event.preventDefault();
            if(moveLeft()){
                generateOneNumber();
                isGameOver();
            }
            break;
        case 38:
            event.preventDefault();
            if(moveUp()){
                generateOneNumber();
                isGameOver();
            }
            break;
        case 39:
            event.preventDefault();
            if(moveRight()){
                generateOneNumber();
                isGameOver();
            }
            break;
        case 40:
            event.preventDefault();
            if(moveDown()){
                generateOneNumber();
                isGameOver();
            }
            break;
    }
});

function isGameOver(){
    var over =canMoveRight(board)||canMoveUp(board)||canMoveLeft(board)||canMoveDown(board);
    if(!over){
        setTimeout(function(){
            alert("结束")
        },600);
    }
}
function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i =0;i<4;i++){
        for(var j = 1;j<4;j++){
            if( board[i][j] != 0 ){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noBlockLeft(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;

                        continue;

                    }else if(board[i][k]==board[i][j]&&noBlockLeft(i,k,j,board)){
                        board[i][k]+=board[i][j];
                        score+=board[i][k];
                        board[i][j]=0;
                        showMoveAnimation(i,j,i,k);
                        continue;

                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}


function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockRight(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;

                    } else if (board[i][k] == board[i][j] && noBlockRight(i, k, j, board)) {
                        board[i][k] += board[i][j];
                        score+=board[i][k];
                        board[i][j] = 0;
                        showMoveAnimation(i, j, i, k);

                        continue;

                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}


function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var i =1;i<4;i++){
        for(var j = 0;j<4;j++){
            if( board[i][j] != 0 ){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noBlockUp(k,j,i,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;

                        continue;

                    }else if(board[k][j]==board[i][j]&&noBlockUp(k,j,i,board)){
                        board[k][j]+=board[i][j];

                        score+=board[k][j];
                        board[i][j]=0;
                        showMoveAnimation(i,j,k,j);
                        continue;

                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}


function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var i = 2; i>= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockDown(i, k, j, board)) {
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;

                    } else if (board[k][j] == board[i][j] && noBlockDown(i, k, j, board)) {
                        board[k][j] += board[i][j];
                        score+=board[k][j];
                        board[i][j] = 0;
                        showMoveAnimation(i,j,k,j);

                        continue;

                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}


