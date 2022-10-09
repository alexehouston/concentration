// constants
const CHAR_LOOKUP = {
    mercury: 'img/sailor-mercury.png',
    venus: 'img/sailor-venus.png',
    moon: 'img/sailor-moon.png',
    chibi: 'img/sailor-chibi-moon.png',
    mars: 'img/sailor-mars.png',
    jupiter: 'img/sailor-jupiter.png',
    saturn: 'img/sailor-saturn.png',
    neptune: 'img/sailor-neptune.png',
    uranus: 'img/sailor-uranus.png',
    pluto: 'img/sailor-pluto.png',
}

// variables
let firstCard;
let secondCard;
let cardFlipped = false;
let lockedBoard = false;

// cached elements
const cards = document.querySelectorAll('.memory-card');
const playBtn = document.querySelectorAll('button');

// event listeners
// card is clicked -> cards will flip
[...cards].forEach((card) => {
    card.addEventListener( 'click', function() {
      card.classList.toggle('flipped');
    });
  });
// 'play again' button is clicked -> game will reset

// functions
init();

function init() {


    render();
} 

function flipCard() {
    // if board is not locked -> allow cards to flip
    if (lockedBoard) return;
    if (this === firstCard) return;
        this.classList.add('flip');
    if (!cardFlipped) {
     // if choosing first or second card -> allow card to flip
        cardFlipped = true;
        firstCard = this; 
    } else {
    // check for match after selecting second card
        cardFlipped = false;
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    // if first & second card match -> keep cards facing up
    if (firstCard.dataset === secondCard.dataset) {
        freezeCards();
    } else {
        // otherwise -> flip cards back to normal position
        resetCards();
    }
}

function freezeCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function resetCards() {
    // player clicks two cards -> cards unflip after a few seconds
    lockedBoard = true;
    setTimeout(() => {
        firstCard.classlist.remove('flip');
        secondCard.classlist.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
// reset board if player makes incorrect guesses
    [cardFlipped, lockedBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame () {
// reset game when:
// player has won
// player has run out of guesses
// player has pressed the 'play again' button
}

// shuffle all div elements each time player refreshes game
function shuffleCards() {
    cards.forEach(card => {
        let randomCard = Math.floor(Math.random()*20);
        card.style.order = randomCard;
    })
};

function hideButton() {
    // game in-progress -> button hidden
    // game over -> button visible
}