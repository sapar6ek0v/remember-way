const container = document.querySelector('.container');

const startBtn = document.querySelector('.start__btn');
const nextBtn = document.querySelector('.next__btn');

const live = document.querySelector('.navbar__live-title');
const points = document.querySelector('.navbar__points');
const list = document.querySelector('.navbar__list');
const difficultyLevel = document.querySelector('.select__options');

const gameContainer = document.querySelector('.remember-way__container');
const currentLev = document.querySelector('.remember-way__current-level');

let allPoints = 0;
let curLevel = 0;
let lives = 3;
let counts = 0;
let levelCounts = 0;
let isGamePaused = true;

points.textContent = 'Your points: 0';
live.textContent = `Your lives: ${lives}`;

const level1 = [
  [2, 0, 0, 0, 0],
  [1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 1, 1],
  [0, 0, 0, 0, 3],
];

const level2 = [
  [0, 1, 1, 1, 2, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 3, 0, 0, 0, 0],
];

const level3 = [
  [0, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 1, 1],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 3],
];

const level4 = [
  [0, 0, 0, 0, 0, 2, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 3, 1, 1, 1, 1, 0],
];

const level5 = [
  [2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 3, 0, 0, 0, 0, 0, 0, 0],
];

const levels = {
  0: level1,
  1: level2,
  2: level3,
  3: level4,
  4: level5,
};

const pointCounter = () => {
  if (counts > allPoints) {
    allPoints = counts;
    const li = document.createElement('li');
    li.textContent = `Best result: ${allPoints}`;
    list.appendChild(li);
  }
};

const handleClearWay = () => {
  gameContainer.innerHTML = '';
};

const levelUp = (event) => {
  event.stopPropagation();

  if (counts > 20 && confirm('Do you want to exchange your 20 points for 1 life?')) {
    counts -= 20;
    lives += 1;
    live.textContent = `Your lives: ${lives}`;
    points.textContent = `Your points: ${counts}`;
  }

  handleClearWay();

  curLevel++;
  gameContainer.innerHTML = `<div class="remember-way__level-title">Level ${curLevel} passed successfully!</div>`;
  nextBtn.hidden = false;
  startBtn.hidden = true;
  levelCounts = 0;
  isGamePaused = true;
};

const startGame = () => {
  isGamePaused = false;

  Array.from(gameContainer.children).forEach((it) => {
    it.classList.remove('close');
    it.classList.remove('open');
  });

  document.querySelector('.begin').addEventListener('mouseover', () => {
    document.querySelector('.finish').addEventListener('mouseover', levelUp);
  });
};

const gameOver = () => {
  if (lives < 3 || curLevel > 0) {
    difficultyLevel.disabled = true;
  }

  if (isGamePaused) {
    return;
  }

  counts -= levelCounts + 2;
  levelCounts = 0;
  lives--;

  if (lives <= 0) {
    pointCounter();
    curLevel = 0;
    lives = 3;
    counts = 0;
    difficultyLevel.disabled = false;
    alert('You have to start from beginning!');
  }

  live.textContent = `Your lives: ${lives}`;
  points.textContent = `Your points: ${counts}`;

  handleClearWay();
  fillOut();
  isGamePaused = true;
};

const addRedBlock = (block) => {
  block.classList.add('close');
  block.addEventListener('mouseover', gameOver);
};

const addGreenBlock = (block) => {
  block.classList.add('open');

  block.addEventListener('mouseover', (event) => {
    event.stopPropagation();
    block.classList.add('open');
  });

  block.addEventListener('mouseover', function countPoints() {
    if (!isGamePaused) {
      counts += +difficultyLevel.value;
      levelCounts += +difficultyLevel.value;

      points.textContent = `Your points: ${counts}`;

      block.removeEventListener('mouseover', countPoints);

      if (difficultyLevel.checked) {
        counts += 1;
      }
    }
  });
};

const handleStartBlock = (block) => {
  block.classList.add('start', 'begin');
  block.textContent = 'S';
  block.addEventListener('mouseover', (event) => {
    event.stopPropagation();
    container.addEventListener('mouseover', gameOver, { once: true });
  });
};

const handleFinishBlock = (block) => {
  block.classList.add('start', 'finish');
  block.textContent = 'F';
};

const fillOut = () => {
  currentLev.textContent = `Your level ${curLevel + 1}`;
  gameContainer.innerHTML = '';

  if (!levels[curLevel]) {
    pointCounter();
    alert('You passed game! Congrats!!!');
    curLevel = 0;
    difficultyLevel.disabled = false;
    fillOut();
    return;
  }

  const box = `${100 / levels[curLevel][0].length}%`;

  levels[curLevel].forEach((row) => {
    row.forEach((it) => {
      const block = document.createElement('div');
      block.style.width = box;
      block.style.height = box;
      block.classList.add('square');

      if (difficultyLevel.value !== '2' && difficultyLevel.value !== '4') {
        block.classList.add('square-border');
      }

      if (it === 0) {
        addRedBlock(block);
      } else if (it === 1) {
        addGreenBlock(block);
      } else if (it === 2) {
        handleStartBlock(block);
      } else if (it === 3) {
        handleFinishBlock(block);
      }

      gameContainer.append(block);
    });
  });

  Array.from(document.querySelectorAll('.close')).forEach((it) => {
    it.addEventListener('mouseover', () => {
      document.querySelector('.finish').removeEventListener('mouseover', levelUp);
    });
  });
};

fillOut();

startBtn.addEventListener('click', () => startGame());

nextBtn.addEventListener('click', () => {
  fillOut();
  startBtn.hidden = false;
  nextBtn.hidden = true;
});

difficultyLevel.addEventListener('change', () => {
  const squares = Array.from(document.querySelectorAll('.square'));
  if (difficultyLevel.value === '1') {
    gameContainer.classList.remove('no-cursor');
    squares.forEach((it) => it.classList.add('square-border'));
  } else if (difficultyLevel.value === '2') {
    gameContainer.classList.remove('no-cursor');
    squares.forEach((it) => it.classList.remove('square-border'));
  } else if (difficultyLevel.value === '3') {
    squares.forEach((it) => it.classList.add('square-border'));
    gameContainer.classList.add('no-cursor');
  } else if (difficultyLevel.value === '4') {
    squares.forEach((it) => it.classList.remove('square-border'));
    gameContainer.classList.add('no-cursor');
  }
});
