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
let firstCard, secondCard;
let cardFlipped = false;
let lockedBoard = false;

// cached elements
let cards = document.getElementsByClassName("memory-card");
if (cards !== 0) {
    let card_array = [];
    for (let x = 0; x < cards.length; x++) {
        card_array.push(x);
    }
    for (let x = 0; x < cards.length; x++) {
        let j = Math.floor(Math.random() * card_array.length);
        let card = cards.item(card_array[j]);
        card.parentNode.appendChild(card);
        card_array.splice(j, 1);
    }
}
const playBtn = document.querySelectorAll('button');

// event listeners
// card is clicked -> cards will flip
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard);
}
// 'play again' button is clicked -> game will reset

// functions
init();

function init() {


    render();
} 

function flipCard() {
    if (lockedBoard) return;
    if (this === firstCard) return;
    this.classList.add('flipped');
    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? freezeCards() : resetCards();
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
        this.classlist.remove('flipped');
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

// shuffle all div elements each time game is refre
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