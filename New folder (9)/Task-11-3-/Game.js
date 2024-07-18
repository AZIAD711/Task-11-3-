const images = [
    '🐶', '🐶', '🐱', '🐱', '🐭', '🐭', '🐹', '🐹',
    '🐰', '🐰', '🦊', '🦊', '🐻', '🐻', '🐼', '🐼'
];
let flippedCards = [];
let matchedCards = 0;
let timer;
const flipBackTime = 5000;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffle(images);
    images.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.innerHTML = `
            <div class="card-inner" id="card-${index}">
                <div class="card-front"></div>
                <div class="card-back">${image}</div>
            </div>
        `;
        gameBoard.appendChild(card);
        card.addEventListener('click', () => flipCard(card));
    });
}

function flipCard(card) {
    const cardInner = card.querySelector('.card-inner');
    if (cardInner.classList.contains('flipped') || flippedCards.length >= 2) {
        return;
    }
    cardInner.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 1) {
        timer = setTimeout(() => flipBack(), flipBackTime);
    } else if (flippedCards.length === 2) {
        clearTimeout(timer);
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        matchedCards += 2;
        flippedCards = [];
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        if (matchedCards === images.length) {
            document.getElementById('message').innerText = 'You win!';
        }
    } else {
        setTimeout(() => flipBack(), 1000);
    }
}

function flipBack() {
    flippedCards.forEach(card => {
        card.querySelector('.card-inner').classList.remove('flipped');
    });
    flippedCards = [];
    if (matchedCards < images.length) {
        document.getElementById('message').innerText = 'You lost!';
    }
}

function resetGame() {
    matchedCards = 0;
    flippedCards = [];
    clearTimeout(timer);
    document.getElementById('message').innerText = '';
    createBoard();
}

document.getElementById('reset-button').addEventListener('click', resetGame);

window.onload = resetGame;
