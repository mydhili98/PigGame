'use strict';
//selecting elements
const score0=document.getElementById("score--0");
const score1=document.getElementById("score--1");
const dice=document.querySelector('.dice');
const rollbtn=document.querySelector('.btn--roll');
const playerBE0=document.querySelector('.player--0');
const playerBE1=document.querySelector('.player--1');
const holdButton=document.querySelector('.btn--hold');
const newGameBtn=document.querySelector('.btn--new');
const wonText0=document.getElementById('winner--0');
const wonText1=document.getElementById('winner--1');

//initial scores
let currentScore;
let holdedScore;
let currentPlayer;
let playing;
const initialize=()=>{
    score0.textContent=0;
    score1.textContent=0;
    dice.classList.add('hidden');
    wonText0.classList.add('hidden');
    wonText1.classList.add('hidden');
    currentScore=0;
    holdedScore=[0,0];
    currentPlayer=0;
    playerBE0.classList.add('player--active');
    playerBE1.classList.remove('player--active');
    playing=true;
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.getElementById(`current--0`).textContent=0;
    document.getElementById(`current--1`).textContent=0;

}
initialize();
//switch player
const switchPlayer=()=>{
    document.getElementById(`current--${currentPlayer}`).textContent=0;
    currentScore=0;
    currentPlayer=currentPlayer===1 ? 0 : 1;
    playerBE0.classList.toggle('player--active');
    playerBE1.classList.toggle('player--active');
    
}

//clicking on roll button
rollbtn.addEventListener('click', function(){
    if(playing){
        let randomNumber=Math.floor((Math.random() * 6))+1;
        dice.src=`dice-${randomNumber}.png`;
        console.log(randomNumber);
        dice.classList.remove('hidden');
        if(randomNumber!==1){
            currentScore+=randomNumber;
            document.getElementById(`current--${currentPlayer}`).textContent=currentScore;
        }
        else{
            //switch player
            switchPlayer();
        }
    }
  
})

//clicking on hold button
holdButton.addEventListener('click', function(){
    if(playing && currentScore!==0){
        holdedScore[currentPlayer]+=currentScore;
        document.getElementById(`score--${currentPlayer}`).textContent=holdedScore[currentPlayer];
        if(holdedScore[currentPlayer]>=30){
            //make current player as winner
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
            dice.classList.add('hidden');
            document.getElementById(`winner--${currentPlayer}`).classList.remove('hidden');
            playing=false;
        }
        else{
            switchPlayer();
        }
    }
})

//new game
newGameBtn.addEventListener('click', initialize);