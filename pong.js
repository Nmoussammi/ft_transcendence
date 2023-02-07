const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

function draw_rect(x, y, w, h, color) {
    context.fillStyle = "color";
    context.fillRect(x, y, w, h); //left top width height 
}

function draw_circle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false); // X & Y of center, radius, start angle, end angle, clockwise direction
    context.closePath();
    context.fill();
}

function draw_text(text, x, y, color) {
    context.fillStyle = color;
    context.font = "75px fantasy"; //font size and font family
    context.fillText(text, x, y); // x, y position of text
}
let rectX = 0;

// function render() {
//     draw_rect(0, 0, 600, 400, "black");
//     draw_rect(rectX, 100, 100, 100, "red");
//     rectX = rectX + 100;
// }
setInterval(render, 1000); //we call render function every 1000ms


/*******************  Pong Components *******************/

/*                    Create User & COM Paddles         */
const user = {
    x: 0,
    y: canvas.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}
const com = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}
draw_rect(user.x, user.y, user.width, user.height, user.color);
draw_rect(com.x, com.y, com.width, com.height, com.color);
const net = {
    x: canvas.width / 2 - 2 / 2,
    y: 0,
    width: 2,
    height: 10, // 10 pixels every part of the net not the wall net
    color: "WHITE",

}

function draw_net() {
    for (let i = 0; i <= canvas.height; i += 15) {
        draw_rect(net.x, net.y + i, net.width, net.height, net.color);
    }

}
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10, // cho3a3
    speed: 5,
    velocityX: 5,
    velocityY: 5, // velocity = Speed + Direction
    color: "WHITE",
}
draw_circle(ball.x, ball.y, ball.radius, ball.color);

/*draw the score for the user*/
draw_text(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
/*draw the score for the computer*/
draw_text(com.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE");

/*Render the Game*/

function render() {
    draw_rect(0, 0, canvas.width, canvas.height, "BLACK");
    draw_text(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
    draw_text(com.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE");
    draw_net();
    draw_rect(user.x, user.y, user.width, user.height, user.color);
    draw_rect(com.x, com.y, com.width, com.height, com.color);
    draw_circle(ball.x, ball.y, ball.radius, ball.color);
}

function update() {
    ball.x += velocityX;
    ball.y += velocityY;
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        velocityY = -velocityY;
    }
}

function game() {
    update(); //this function will do the movements the collision detection, score update, ...all the game logique
    render();
}
const framPerSecond = 50;
setInterval(game, 1000 / framPerSecond); // Call game(); 50 times every 1000ms = 1sec

function collision(ball, player) {
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    return ball.right > player.left && ball.top < player.bottom && ball.left < player.right && ball.bottom > player.top;
}
let collidePoint = ball.y - (user.y + player.height / 2);
collidePoint
let angleRadius = collidePoint * Math.PI / 4; // 45 degrees
/* if(ball.x < canvas.width / 2) --> player = user, else player = computer */