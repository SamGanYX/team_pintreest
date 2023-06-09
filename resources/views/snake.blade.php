<x-app-layout>

<html>
  <head>
  	<title>Snake Game</title>
    <link href="https://fonts.googleapis.com/css?family=Antic+Slab" rel="stylesheet">

  </head>
  <body>
	<button onclick="clicked()" class="button1" style="margin-left: 30%; margin-right: 30%; width:40%; margin-top:30px; margin-bottom:100px; padding: 25px; border-radius: 10px;">Play Again</button>
	 
    <canvas id="snakeboard" class="snakeboard" width="450" height="450"></canvas>

    <style>
	.button {
	margin-left: 100px;
	margin-top: 20px;
	  border: black;
	  color: white;
	  padding: 20px 30px;
	  text-align: center;
	  text-decoration: none;
	  display: inline-block;
	  font-size: 16px;
	  margin: 4px 2px;
	  cursor: pointer;
	}

	.button1 {background-color: #00FF00;} /* Green */

      #snakeboard {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
	<!--    <img id = "img" src= "tright.gif" />    -->
	
	
  </body>

  <script>
  
	
	function clicked() {
	 snake = [      
          {x: 100, y: 200, ahead: 'right', behind: null},
          {x: 50, y: 200, ahead: 'right', behind: 'right'},
          {x: 0, y: 200, ahead: 'right', behind: 'right'},]

        fruit_x = 300;
        fruit_y = 200;

        changing_direction = false;
        dx = 0;
        dy = 0;
		
		main();
	
	}
	
  
  
    const board_border = 'black';
    var board_background = "lightgreen";
    const snake_col = 'brown';
    const snake_border = 'darkblue';
    const apple_col = 'blue'
    const apple_border = 'black'
    
    let snake = [      
      {x: 100, y: 200, ahead: 'right', behind: null},
      {x: 50, y: 200, ahead: 'right', behind: 'right'},
      {x: 0, y: 200, ahead: 'right', behind: 'right'},]

    let fruit_x = 300;
    let fruit_y = 200;

    let changing_direction = false;
    let dx = 0;
    let dy = 0;
	let game_closed = false;
    
    
    var snakeboard = document.getElementById("snakeboard");
    var snakeboard_ctx = snakeboard.getContext("2d");
    
    
	main();
    
    document.addEventListener("keydown", change_direction);    

    function main() {
		if (has_game_ended() || game_closed) return;
		changing_direction = false;
		setTimeout(function onTick() {
			clear_board();	
			if(snake[0].x == fruit_x && snake[0].y == fruit_y){
				fruit_spawn();
				const head = {x: snake[0].x + dx, y: snake[0].y + dy, ahead: snake[0].ahead, behind: null};
				snake.unshift(head);
				snake[1].behind = snake[2].ahead;
				}
				
			else if(dx != 0 || dy != 0)move_snake();
			else{ //draws the head
				var img = document.createElement("img");
				img.src = "/images/snake/tright.gif";
				snakeboard_ctx.drawImage(img, snake[0].x -28,snake[0].y -30, 100,100);
				
				//loads on the rest of the parts
				var img = document.createElement("img");
				img.src = "/images/snake/topleft.png";
				snakeboard_ctx.drawImage(img, 1,1, 1,1);
				var img = document.createElement("img");
				img.src = "/images/snake/topright.png";
				snakeboard_ctx.drawImage(img, 1,1, 1,1);
				var img = document.createElement("img");
				img.src = "/images/snake/bottomleft.png";
				snakeboard_ctx.drawImage(img, 0,0, 1,1);
				var img = document.createElement("img");
				img.src = "/images/snake/bottomright.png";
				snakeboard_ctx.drawImage(img, 0,0, 1,1);
				var img = document.createElement("img");
				img.src = "/images/snake/tleft.gif";
				snakeboard_ctx.drawImage(img, 0,0, 1,1);
				var img = document.createElement("img");
				img.src = "/images/snake/tdown.gif";
				snakeboard_ctx.drawImage(img, 0,0, 1,1);
				var img = document.createElement("img");
				img.src = "/images/snake/tup.gif";
				snakeboard_ctx.drawImage(img, 0,0, 1,1);
				var img = document.createElement("img");
				img.src = "/images/snake/woodup.png";
				snakeboard_ctx.drawImage(img, 0,0, 1,1);
				
			}
			
			draw_fruit();
			drawSnake();
				
				
			main();
		}, 200)
		}
	
	
	function grow() {
		
		return;
		}
	
	function fruit_spawn() {

		fruit_x = Math.floor((Math.random() * (9)))*50;
		fruit_y = Math.floor((Math.random() * (9)))*50;
		

		for (let i = 0; i < snake.length; i++) {
        		if (snake[i].x === fruit_x && snake[i].y === fruit_y){
				fruit_spawn();
				return;}
			}
		draw_fruit();
		return;
		}
		
		
	function draw_fruit() {
		
		var img = document.createElement("img");
		img.src = "/images/snake/sudowoodo.png";
		snakeboard_ctx.drawImage(img, fruit_x-15, fruit_y-13, 85,75);
			
		return;
		}
		

		
 
    function clear_board() {
		
		for (let i = 0; i < 450; i +=50){
			for (let j = 0; j < 450; j +=50){
				snakeboard_ctx.fillStyle = board_background;
				snakeboard_ctx.fillRect(i, j, 50, 50);
		  
				if ((i+j)%100 == 0){
					board_background = 'green';
					}
				else {
					board_background = 'lightgreen';
					}
				}
			}
		snakeboard_ctx.fillSyle = 'green';
		snakeboard_ctx.fillRect(0,0,50,50);
		snakeboard_ctx.strokestyle = 'black';
		snakeboard_ctx.strokeRect(0,0,snakeboard.width, snakeboard.height);
		}
    
    
    
    
    
    function drawSnake() {
	
		var img = document.createElement("img");
		
		if (dx === -50){
			img.src = "/images/snake/tleft.gif";
			snakeboard_ctx.drawImage(img, snake[0].x -28,snake[0].y -30, 100,100);
			}
		else if (dy === -50){
			img.src = "/images/snake/tup.gif";
			snakeboard_ctx.drawImage(img, snake[0].x -27,snake[0].y -27, 100,100);
			}
		else if (dy === 50){
			img.src = "/images/snake/tdown.gif";
			snakeboard_ctx.drawImage(img, snake[0].x -27,snake[0].y -33, 100,100);
			}
		else if (dx == 50){
		img.src = "/images/snake/tright.gif";
		snakeboard_ctx.drawImage(img, snake[0].x -28,snake[0].y -30, 100,100);
		}
		
		for (let i = 1; i < snake.length; i++){
			drawSnakePart(i);
			}
		}
	
	function drawSnakePart(snakepart){
		let ahead = snake[snakepart].ahead;
		let behind = snake[snakepart].behind;
		if (ahead === behind){
			if (ahead === 'right' || ahead == 'left'){
				var img = document.createElement("img");
				img.src = "/images/snake/woodmid.png";
				snakeboard_ctx.drawImage(img, snake[snakepart].x-72, snake[snakepart].y-60, 285,150);
			
			}
			else {
				var img = document.createElement("img");
				img.src = "/images/snake/woodup.png";
				snakeboard_ctx.drawImage(img, snake[snakepart].x-37, snake[snakepart].y-72, 150,285);
			
			}
		}
		//bottom left
		else if (ahead === 'right' && behind === 'down' || (ahead === 'up' && behind === 'left')){
			var img = document.createElement("img");
			img.src = "/images/snake/bottomleft.png";
			snakeboard_ctx.drawImage(img, snake[snakepart].x-138, snake[snakepart].y-96, 310,310);
			
		}
		// top left	
		else if (ahead === 'right' && behind === 'up' || (ahead === 'down' && behind === 'left')){
			var img = document.createElement("img");
			img.src = "/images/snake/topleft.png";
			snakeboard_ctx.drawImage(img, snake[snakepart].x-73, snake[snakepart].y-105, 310,310);
		}
		//bottom right	
		else if (ahead === 'left' && behind === 'down' || (ahead === 'up' && behind === 'right')){
			var img = document.createElement("img");
			img.src = "/images/snake/bottomright.png";
			snakeboard_ctx.drawImage(img, snake[snakepart].x-180, snake[snakepart].y-157, 310,310);
		}
		//top right	
		else if (ahead === 'left' && behind === 'up' ||(ahead === 'down' && behind === 'right')){
			var img = document.createElement("img");
			img.src = "/images/snake/topright.png";
			snakeboard_ctx.drawImage(img, snake[snakepart].x-180, snake[snakepart].y-105, 310,310);
		}
		
		
		
		
		
		
	}
	
	
function has_game_ended() {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
      }
      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > snakeboard.width - 10;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > snakeboard.height - 10;
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
    }


    function move_snake() {
      const head = {x: snake[0].x + dx, y: snake[0].y + dy, ahead: snake[0].ahead, behind: null};
      snake.unshift(head);
      snake.pop();
	  snake[1].ahead = snake[0].ahead;
	  snake[1].behind = snake[2].ahead;
    }
function change_direction(event) {  
	const ENTER = 13;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
	
 
 
 
 
	if(changing_direction) return;
	changing_direction = true; 

    const keyPressed = event.keyCode;
    const goingUp = dy === -50;
    const goingDown = dy === 50;
    const goingRight = dx === 50;  
    const goingLeft = dx === -50;
 
	//starts the game on first movement
	/*
	 if(dx ===0 && dy === 0){
		if(keyPressed === 37){
			dx = -50;
			snake[0].ahead = 'left';
			
			return;
			}
		else if(keyPressed === 39){
			dx = 50;
			snake[0].ahead = 'right';
			
			return;
			}
		else if(keyPressed === 38){
			dy = -50;
			snake[0].ahead = 'up';
			
			return;
			}
		else if(keyPressed === 40){
			dy = 50;
			snake[0].ahead = 'down';
			
			return;
			}
			*/
 
 
 
	if (keyPressed === LEFT_KEY && !goingRight){    
        dx = -50;
        dy = 0; 
		snake[0].ahead = 'left';
		}
 
    if (keyPressed === UP_KEY && !goingDown){    
        dx = 0;
        dy = -50;
		snake[0].ahead = 'up';
		}
 
    if (keyPressed === RIGHT_KEY && !goingLeft){    
		dx = 50;
        dy = 0;
		snake[0].ahead = 'right';
		}
 
    if (keyPressed === DOWN_KEY && !goingUp) {    
        dx = 0;
        dy = 50;
		  
		snake[0].ahead = 'down';
		}
	if (keyPressed === ENTER){
          snake = [      
          {x: 100, y: 200, ahead: 'right', behind: null},
          {x: 50, y: 200, ahead: 'right', behind: 'right'},
          {x: 0, y: 200, ahead: 'right', behind: 'right'},]

        fruit_x = 300;
        fruit_y = 200;

        changing_direction = false;
        dx = 0;
        dy = 0;
		game_closed = true;
		
		game_closed = false;
		main();
	
	}
	}
    
  </script>
</html>
</x-app-layout>
