let documentWidth = window.screen.availWidth;
let gridContainerWidth = 0.92 * documentWidth;
let cellSideLength = 0.18 * documentWidth;
let cellSpace = 0.04*documentWidth;
console.log("support loaded");

function getPosTop( i , j ){
    return cellSpace + i*( cellSpace + cellSideLength );
}

function getPosLeft( i , j ){
    return cellSpace + j*( cellSpace + cellSideLength );
}

function getNumberBackgroundColor( number ){
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}
function getNumberBackgroundImage( number ){
    switch( number ){
        case 2:return "./images/2.jpg";break;
        case 4:return "./images/4.jpg";break;
        case 8:return "./images/8.jpg";break;
        case 16:return "./images/16.jpg";break;
        case 32:return "./images/32.jpg";break;
        case 64:return "./images/64.jpg";break;
        case 128:return "./images/128.jpg";break;
        case 256:return "./images/256.jpg";break;
        case 512:return "./images/512.jpg";break;
        case 1024:return "./images/1024.jpg";break;
        case 2048:return "./images/2048.jpg";break;
        case 4096:return "./images/4096.jpg";break;
        case 8192:return "./images/8192.jpg";break;
    }

    return "./images/extra.jpg";
}

function getNumberColor( number ){
    switch( number ){
        case 2:return "#FFFFFF";break;
        case 4:return "#FFFFFF";break;
        case 8:return "#dddddd";break;
        case 16:return "#dddddd";break;
        case 32:return "#FFFFFF";break;
        case 64:return "#FFFFFF";break;
        case 128:return "#FFFFFF";break;
        case 256:return "#FF0000";break;
        case 512:return "#323232";break;
        case 1024:return "#FFFFFF";break;
        case 2048:return "#000000";break;
        case 4096:return "#000000";break;
        case 8192:return "#323232";break;
    }

    return "FFFFFF";
}

function nospace( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] == 0 )
                return false;

    return true;
}

function canMoveLeft( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                    return true;

    return false;
}

function canMoveRight( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2; j >= 0 ; j -- )
            if( board[i][j] != 0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                    return true;

    return false;
}

function canMoveUp( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;

    return false;
}

function canMoveDown( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
}

function noBlockHorizontal( row , col1 , col2 , board ){
    for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
    return true;
}

function noBlockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}

function nomove( board ){
    if( canMoveLeft( board ) ||
        canMoveRight( board ) ||
        canMoveUp( board ) ||
        canMoveDown( board ) )
        return false;

    return true;
}



