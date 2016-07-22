/**
 * Created by xiaosong on 2016/7/22.
 */
var board = new Array();
var score = 0;

$(document).ready(function(){
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
    for(var i =0;i<4;i++){
        for(var j = 0;j<4;j++){

            var gridCell = $("#grid-cell-"+i+"-"+j);

            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }



    for(var i =0;i<4;i++){
        board[i]=new Array();
        for(var j = 0;j<4;j++){

            board[i][j]=0;
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

            if(board[i][j]==0){
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");

                theNumberCell.css("top",getPosTop(i,j)+50);
                theNumberCell.css("left",getPosLeft(i,j)+50);
            }else{
                theNumberCell.css("width","100px");
                theNumberCell.css("height","100px");

                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));

                theNumberCell.css("background-color",getBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));

                theNumberCell.text(board[i][j]);

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

$(document).keydown(function(event){
    switch (event.keyCode){
        case 37:
            if(moveLeft()){
                generateOneNumber();
                isGameOver();
            }
            break;
        case 38:
            if(moveUp()){
                generateOneNumber();
                isGameOver();
            }
            break;
        case 39:
            if(moveRight()){
                generateOneNumber();
                isGameOver();
            }
            break;
        case 40:
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


