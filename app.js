const profiles = [
  { name: 'Sara', age: 29, text: 'Älskar innergårdar och kvällssol', img: 'images/profile-1.svg' },
  { name: 'Nora', age: 31, text: 'Kaffe, kultur och kollektivtrafik', img: 'images/profile-2.svg' },
  { name: 'Maja', age: 27, text: 'Cyklar överallt i stan', img: 'images/profile-3.svg' },
  { name: 'Lina', age: 34, text: 'Projektledare med hjärta för höghus', img: 'images/profile-4.svg' }
];

const startScreen = document.querySelector('#startScreen');
const swipeScreen = document.querySelector('#swipeScreen');
const matchScreen = document.querySelector('#matchScreen');
const cardStack = document.querySelector('#cardStack');
let currentIndex = 0;
let activeCard = null;
let startX = 0;
let currentX = 0;
let isDragging = false;

function show(screen) {
  [startScreen, swipeScreen, matchScreen].forEach(s => {
    s.classList.remove('is-active');
    s.hidden = true;
  });
  screen.hidden = false;
  requestAnimationFrame(() => screen.classList.add('is-active'));
}

function createCard(profile, offset = 0) {
  const card = document.createElement('article');
  card.className = 'card';
  card.style.transform = `scale(${1 - offset * 0.035}) translateY(${offset * 10}px)`;
  card.innerHTML = `
    <img src="${profile.img}" alt="Profilbild på ${profile.name}">
    <div class="badge like">LIKE</div>
    <div class="badge nope">NOPE</div>
    <div class="card-info"><h2>${profile.name}, ${profile.age}</h2><p>${profile.text}</p></div>
  `;
  return card;
}

function renderStack() {
  cardStack.innerHTML = '';
  profiles.slice(currentIndex, currentIndex + 3).reverse().forEach((profile, reversedIndex, arr) => {
    const offset = arr.length - 1 - reversedIndex;
    cardStack.appendChild(createCard(profile, offset));
  });
  activeCard = cardStack.lastElementChild;
  if (activeCard) attachDrag(activeCard);
}

function attachDrag(card) {
  card.addEventListener('pointerdown', e => {
    isDragging = true;
    startX = e.clientX;
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener('pointermove', e => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    const rotate = currentX / 14;
    card.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;
    const strength = Math.min(Math.abs(currentX) / 120, 1);
    card.querySelector('.badge.like').style.opacity = currentX > 0 ? strength : 0;
    card.querySelector('.badge.nope').style.opacity = currentX < 0 ? strength : 0;
  });

  card.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    Math.abs(currentX) > 90 ? swipe(currentX > 0 ? 'right' : 'left') : resetCard();
    currentX = 0;
  });
}

function resetCard() {
  if (!activeCard) return;
  activeCard.style.transform = '';
  activeCard.querySelectorAll('.badge').forEach(b => b.style.opacity = 0);
}

function swipe(direction) {
  if (!activeCard) return;
  const x = direction === 'right' ? 520 : -520;
  const rotation = direction === 'right' ? 28 : -28;
  activeCard.style.transform = `translateX(${x}px) rotate(${rotation}deg)`;
  activeCard.style.opacity = 0;

  setTimeout(() => {
    currentIndex++;
    if (currentIndex >= 4) {
      show(matchScreen);
    } else {
      renderStack();
    }
  }, 230);
}

document.querySelector('#startBtn').addEventListener('click', () => {
  currentIndex = 0;
  renderStack();
  show(swipeScreen);
});
document.querySelector('#restartBtn').addEventListener('click', () => show(startScreen));
document.querySelector('#nopeBtn').addEventListener('click', () => swipe('left'));
document.querySelector('#likeBtn').addEventListener('click', () => swipe('right'));
