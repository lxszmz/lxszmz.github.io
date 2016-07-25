/**
 * Created by xiaosong on 2016/7/22.
 */
function getPosTop(i,j){
    return gapWidth+i*(cellWidth+gapWidth);
}
function getPosLeft(i,j){
    return gapWidth+j*(cellWidth+gapWidth);
}


function getBackgroundColor(number){
   switch(number){
       case 2 :return "#eee4da";break;
       case 4 :return "#ede0c8";break;
       case 8 :return "#f2b179";break;
       case 16 :return "#f59563";break;
       case 32 :return "#f67c5f";break;
       case 64 :return "#f65e3b";break;
       case 128 :return "#edcf72";break;
       case 256 :return "#edcc61";break;
       case 512 :return "#9c0";break;
       case 1024 :return "#33b5e5";break;
       case 2048 :return "#09c";break;
       case 4096 :return "#a6c";break;
       case 8192 :return "#93c";break;
   }

    return "black";
}


function getNumberColor(number){
    if(number<=4){
        return "#776e65";
    }
    return "white";
}


function noSpace(board){
    for(var i =0;i<4;i++){
        for(var j = 0;j<4;j++){

            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}


function canMoveLeft(board){
    for(var i =0;i<4;i++){
        for(var j = 1;j<4;j++){

            if(board[i][j]!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){
    for(var i =0;i<4;i++){
        for(var j = 0;j<3;j++){
            if(board[i][j]!=0){
                if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var i =1;i<4;i++){
        for(var j = 0;j<4;j++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var i =0;i<3;i++){
        for(var j = 0;j<4;j++){
            if(board[i][j]!=0){
                if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}




function noBlockLeft(i,k,j,board){
    for(var t =k+1;t<j;t++){
        if(board[i][t]!=0){
            return false;
        }
    }
    return true;
}


function noBlockRight(i,k,j,board){
    for(var t =k-1;t>j;t--){
        if(board[i][t]!=0){
            return false;
        }
    }
    return true;
}


function noBlockUp(k,j,i,board){
    for(var t =k+1;t<i;t++){
        if(board[t][j]!=0){
            return false;
        }
    }
    return true;
}


function noBlockDown(i, k, j, board){
    for(var t =k-1;t>i;t--){
        if(board[t][j]!=0){
            return false;
        }
    }
    return true;
}

