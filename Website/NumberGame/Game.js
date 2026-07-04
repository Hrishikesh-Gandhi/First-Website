let screen =[]
const guess = [];
let temp=parseInt(new URLSearchParams(window.location.search).get('digits')) || 4;
if(temp>10){totalDigits=10}
else if(1>temp){totalDigits=1}
else{totalDigits=temp}

for(let i = 0; i < totalDigits; i++)
{
    screen.push('');
}//initialize screen with empty strings
let selected = 1;//index of selected digit
const generatedNumber = NumberGenrator(totalDigits);//generate random number
startGame();

function NumberGenrator(GenDigits)
{
 const generatedNumber = Math.floor(Math.random()*Math.pow(10, GenDigits));
 return generatedNumber;
}//generate random number with given number of digits    
function renderScreen()
{
    for(let i = 0; i < totalDigits; i++)
    {
        document.querySelector(`.n${i + 1}`).textContent = screen[i];
    }
}//render screen with current digits    
function processGuess(Input,gen)
{
    let digDone = [];
    let digs=0;
    let digcp=0;
  for(let i = 0; i<totalDigits;i++)
  {
   let digi = (Input%Math.pow(10,i+1) - Input%Math.pow(10,i))/Math.pow(10,i); 
   
   for(let j = 0; j<totalDigits;j++)
   {
    

    if(digi === ((gen%Math.pow(10,j+1) - gen%Math.pow(10,j))/Math.pow(10,j)))
        {
         if(i===j){digcp++;}
         if(checkCloning(digDone, digi)){digs++;}
        }
   }  
   digDone.push(digi);
  }  
  return [digs, digcp];
}//process guess and return correct digits and correct position
function checkCloning(digd,n)
{
 for(let i = 0; i < digd.length; i++)
 {
  if(digd[i] === n)
  {
   return false;
  }
 }
 return true;
}//check if digit is already used    
function changeSelected(newSelected)
{
 document.querySelector(`.n${selected}`).classList.remove('selected');
 selected = newSelected;
 document.querySelector(`.n${selected}`).classList.add('selected');
}//change selected digit    
function deleteDigit(){
    screen[selected-1] = '';
    renderScreen();
}//delete digit from selected position    
function numberButton(number){
    screen[selected-1] = number;
    let ns;
    if(selected < totalDigits){
        ns = selected + 1;
    }
    else{
        ns = 1;
    }
    changeSelected(ns);
    renderScreen();
}//add number to selected position    
function renderGuesses(){
    document.querySelector(`.guess`).innerHTML = '<div>All Guesses</div>';
    for(let i = 0; i < guess.length; i++){
        let currHtml = document.querySelector(`.guess`).innerHTML;
        currHtml += `<div class="g${i + 1} guesses">Guess ${i + 1}: ${MakeDigitsEqualToNumber(guess[i].guess)}  --- ${guess[i].correctDigits}/${guess[i].correctPosition}</div>`;
        document.querySelector(`.guess`).innerHTML = currHtml;
    }
}//render guesses    
function checkEmptySpaces()
{
 for(let i = 0; i < screen.length; i++)
 {
  if(screen[i] === '')
   {
    return false
   }
  }
  return true;
}//check if all spaces are filled    
function ReadGuess()
{
  let g =0;
  for(let i = 1;i<=totalDigits;i++)  
  {
    g+=screen[i-1]*Math.pow(10,totalDigits-i);
  }  
  return g;
}//read guess from screen    
function clearScreen(){
    for(let i = 0; i < totalDigits; i++){
        screen[i] = '';
    }
    renderScreen();
    changeSelected(1);
}//clear screen    
function submitGuess()
{
  if(checkEmptySpaces() && checkRepeatGuesses())
  {
    const inpy = ReadGuess();
    const result = processGuess(inpy, generatedNumber);
    guess.push({guess: inpy, correctDigits: result[0], correctPosition: result[1]});    
    console.log(guess);
    renderGuesses();
    clearScreen();
    if(inpy === generatedNumber){
        AfterWin();
    }
    else{
        changeSelected(1);
    }
  }
  else if(!checkEmptySpaces()){
    alert("Please fill all the digits");
    changeSelected(1);
  }
  else if(!checkRepeatGuesses()){
    alert("You have already guessed this number");
     changeSelected(1);
  }
 
}//submit guess    
function checkRepeatGuesses(){
    for(let i = 0; i < guess.length; i++){
        if(guess[i].guess === ReadGuess()){
            return false;
        }
    }
    return true;
}//check if guess is already made    
function genrateScreen()
{
    let h=''
  for(let i = 0; i < totalDigits; i++)
    {
    h+=`<div class="digHolder n${i+1}" onclick="changeSelected(${i+1})">
                     
            </div>`
  }


  document.querySelector('.Screen').innerHTML = h;
  if(totalDigits > 5){
    document.querySelector('.screen').style.setProperty('grid-template-columns', `1fr `.repeat(totalDigits));
    document.querySelector('body').style.setProperty('grid-template-columns', '50% 30% 20%');
    document.querySelector('.numpad').style.setProperty('width', '60%');
    document.querySelectorAll('.digHolder').forEach(dig => {dig.style.setProperty('font-size', '2.5cqw');});
  }
}//generate screen 
function startGame(){
    genrateScreen();
    renderScreen();
    document.querySelector(`.n${selected}`).classList.add('selected');
}//start game
function MakeDigitsEqualToNumber(number){
   if(String(number).length < totalDigits){
    return String(number).padStart(totalDigits, '0');
   }
   return String(number);
}//make digits equal to number of Digits needed 
function AfterWin(){
    removeEventListener('keydown', Event);
    document.querySelector('.Main_Area').innerHTML = 
    `<div class="win">You won!</div><div class="win sec"> You Guessed in ${guess.length} attempts</div><div class="sec"><button class="but" onclick="window.location.reload()">Play Again?</button> <button class="but" onclick="window.location.href='index.html'">Home Page</button></div>`;
}//function to run after win 
addEventListener('keydown',Event);
function Event(e)
{
     if(e.key === 'Enter'){
        submitGuess();

    }
    if(Number(e.key) >= 0 && Number(e.key) <= 9){
        numberButton(Number(e.key));
    }
    if(e.key === 'Backspace'){
        deleteDigit();
    }
    if(e.key === 'Delete'){
        clearScreen();
    }
    if(e.key === "ArrowLeft"){
        if(selected > 1){
            changeSelected(selected - 1);
        }
        else{
            changeSelected(totalDigits);
        }
    }
    if(e.key === "ArrowRight"){
        if(selected < totalDigits){
            changeSelected(selected + 1);
        }
        else{
            changeSelected(1);
        }
    }
}//event listener 
