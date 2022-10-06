<!-- constants -->

<!-- variables -->
let flippedCard;
let disableBoard;
let firstCard;
let secondCard;

<!-- cached elements -->
const cards = document.querySelectorAll('.memory-card');
const playBtn = document.quarySelectorAll('button');

<!-- event listeners -->
addEventListener when:
    card is clicked -> cards will flip
    'play again' button is clicked -> game will reset

<!-- functions  -->
function flipCard() {
    if board is not locked -> allow cards to flip
    if choosing first or second card -> allow card to flip
    if choosing second card -> check for match
}

function checkMatch() {
    if first & second card match -> keep cards facing up -> continue game
    otherwise -> flip cards back to normal position
}

function matchedCards() {
    make matched cards unclickable/unflippable -> reset the remainder of the board
}

function unflipCards() {
    player clicks two cards -> cards unflip after a few seconds
}

function shuffleCards() {
    shuffle all div elements each time player refreshes game
}

function resetGame() {
    reset game when:
        player has won
        player has run out of guesses
        player has pressed the 'play again' button
}

function hideButton() {
    game in-progress -> button hidden
    game over -> button visible
}