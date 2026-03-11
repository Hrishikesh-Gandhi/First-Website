let mole = 0;
let prev = 0;
let score = 0;
let counter = 0;
let tim = 0;
function RandomHole() 
{
    const min =1;
        const max =49;
        const random = Math.floor(Math.random() * (max - min) + min);
        return random;
}

console.log(RandomHole());
function generateGrid(mole) {
    let gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    for (let i = 0; i < 49; i++) 
        {
            if((i+1) === mole) {
                let html =`<button class="${i+1} cell mole" onclick="whack(${i+1})"></button>`;
                gameContainer.innerHTML += html;
            }
            else {
                let html =`<button class="${i+1} cell" onclick="whack(${i+1})"></button>`;
                gameContainer.innerHTML += html;
            }
        }
}
 //function moveMole
// (
 //  document.querySelector(`.${prev}`)
// )
 {};
generateGrid(0);
function RUN(t) {
    mole = RandomHole();
     generateGrid(mole);
    let timer = t*1000;
      id= setInterval
      (
        () => {
        counter++;
        if(counter>=900)
            {
        mole = RandomHole();
        if(prev === mole) {
            mole = RandomHole();
        }
        prev = mole;
        generateGrid(mole);
        counter=0;
         }
        timer--;
        if(timer <= 0) {
            gameOver(id);
        }
        displayitmer(timer);
    }
    , 1);
}
function whack(number) 
{
    if(number === mole) {
        score+=2;
        document.getElementById('score').innerHTML = 'Score: ' + score;
        counter = 0;
        mole = RandomHole();
        generateGrid(mole);
    }
    else {
        score-=1;
        document.getElementById('score').innerHTML = 'Score: ' + score;
        counter = 0;
        mole = RandomHole();
        if(prev === mole) {
            mole = RandomHole();
        }
        prev = mole;
        generateGrid(mole);
    }
}
function gameOver(id) {
    clearInterval(id);
    document.getElementById('score').innerHTML = 'Game Over! Final Score: ' + score;
    document.getElementById('game-container').innerHTML = '<h1>Game Over!</h1> <br><h2>PPS: ' + Math.round(score / (tim)) + '</h2>' ;
    document.getElementById('timer').innerHTML = '<button class="button" onclick="window.location.reload()"">Play Again</button>';

}
function displayitmer(t) {
    document.getElementById('timer').innerHTML = 'Time: ' + Math.round(t/1000);
}
function startGame(Time) {
    document.querySelector('body').innerHTML+=
    `
    <div id="game-container" class="container"></div>
    <div id="score">Score: 0</div>
    <div id="timer">Time: ${Time}</div>
    `
    document.getElementById('container').innerHTML = '';
    if(Time > 0) {
        RUN(Time);
    }
   else {
   RUN(10);
   }
   tim = Time;
}
