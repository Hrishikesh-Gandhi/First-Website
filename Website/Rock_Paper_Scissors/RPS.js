function movegen(){
    const a = Math.random();
    if(a < 1/3){return 'rock';}
    else if(a<2/3){return 'paper';}
    else{return 'scissors';}
    ;
}
function process(pMove){
    const cMove = movegen();
    let result;
    if(pMove === 'rock'){

    if(cMove === 'rock'){result = 'Tied'}
    else  if(cMove === 'paper'){result = 'Lost'}
    else if(cMove === 'scissors'){result = 'Won'};

    }
    else  if(pMove === 'paper'){

    if(cMove === 'rock'){result = 'Won'}
    else  if(cMove === 'paper'){result = 'Tied'}
     else if(cMove === 'scissors'){result = 'Lost'};

    }
     else if(pMove === 'scissors'){

    if(cMove === 'rock'){result = 'Lost'}
    else  if(cMove === 'paper'){result = 'Won'}
    else if(cMove === 'scissors'){result = 'Tied'};

     };
     const res ={pMove:pMove,cMove:cMove,Result:result};
     
     console.log(res);
     genHTML(res);
}
function genHTML(res){
    
    html = 
     `
     <div>
        <div class="res">You ${res.Result}</div>
        <div class="play"> You <img src="Imgs/${res.pMove}-emoji.png" class="Img2"> --- <img src="Imgs/${res.cMove}-emoji.png" class="Img2"> Computer</div>
        <div class="score">1 Wins , 2 Loses , 4 Ties</div>
        </div>
     `
     document.querySelector('.res').innerHTML = html;
}