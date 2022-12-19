const container = document.querySelector('.container');

const startBtn = document.querySelector('.start__btn');
const nextBtn = document.querySelector('.next__btn');

const minLive = document.querySelector('.navbar__live-title');
const points = document.querySelector('.navbar__points');
const list = document.querySelector('.navbar__list');
const difficult = document.querySelector('.select__options');

//TODO:
const add = document.querySelector('.remember-way__container');
const currentLev = document.querySelector('.remember-way__current-level');

let allPoints = 0;
let curLevel = 0;
let lives = 3;
let counts = 0;
let levelCounts = 0;
let isGamePaused = true;

points.textContent = 'Your points: 0';
minLive.textContent = `Your lives: ${lives}`;

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
    list.textContent = `Best result: ${allPoints}`;
  }
};

const handleClearWay = () => {
  add.innerHTML = '';
};

const levelUp = (event) => {
  event.stopPropagation();
  if (counts > 20 && confirm('Do you want to exchange your 20 points for 1 life?')) {
    counts -= 20;
    lives += 1;
    minLive.textContent = `Your lives: ${lives}`;
    points.textContent = `Your points: ${counts}`;
  }

  handleClearWay();
  curLevel++;
  add.innerHTML = `<div class="remember-way__level-title">Level ${curLevel} passed successfully!</div>`;
  nextBtn.hidden = false;
  startBtn.hidden = true;
  levelCounts = 0;
  isGamePaused = true;
  // if  ( lives < 3 || curLevel > 0 ) {
  //     difficult.disabled = true
  // }
  // if (curLevel + 2) {
  //   lives += 1;
  // }
};

const startGame = () => {
  isGamePaused = false;

  Array.from(add.children).forEach((it) => {
    it.classList.remove('close');
    it.classList.remove('open');
  });

  document.querySelector('.begin').addEventListener('mouseover', () => {
    document.querySelector('.finish').addEventListener('mouseover', levelUp);
  });
};

const gameOver = () => {
  if (lives < 3 || curLevel > 0) {
    difficult.disabled = true;
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
    difficult.disabled = false;
    alert('You have to start from beginning!');
  }
  // if ( counts < levelCounts ) {
  //     valList.textContent = `Лучший результат: ${counts += +difficult.value}`
  //     valList.textContent = `${counts = levelCounts}`
  // }
  minLive.textContent = `Your lives: ${lives}`;
  points.textContent = `Your points: ${counts}`;

  handleClearWay();
  fillOut();
  isGamePaused = true;
};

const addRed = (block) => {
  block.classList.add('close');
  block.addEventListener('mouseover', gameOver);
};

const addGreen = (block) => {
  block.classList.add('open');
  block.addEventListener('mouseover', (e) => {
    e.stopPropagation();
    block.classList.add('open');
  });
  block.addEventListener('mouseover', function countPoints() {
    if (!isGamePaused) {
      counts += +difficult.value;
      levelCounts += +difficult.value;
      // add.addEventListener('mouseover', () => {
      //     valList.innerHTML = `<div> Рейтинг очков </div>
      //             ${counts += +difficult.value}`
      // })
      // valList.textContent = `Лучший результат${counts += +difficult.value}`
      points.textContent = `Your points: ${counts}`;
      // valList.textContent = `Лучший результат: ${counts += +difficult.value}`

      block.removeEventListener('mouseover', countPoints);
      if (difficult.checked) {
        counts += 1;
      }
    }
  });
};

const addStart = (block) => {
  block.classList.add('start', 'begin');
  block.textContent = 'S';
  block.addEventListener('mouseover', (e) => {
    e.stopPropagation();
    container.addEventListener('mouseover', gameOver, { once: true });
  });
};

const addFinish = (block) => {
  block.classList.add('start', 'finish');
  block.textContent = 'F';
};

const fillOut = () => {
  currentLev.textContent = `Your level ${curLevel + 1}`;
  add.innerHTML = '';
  if (!levels[curLevel]) {
    pointCounter();
    alert('You passed game! Congrats!!!');
    curLevel = 0;
    difficult.disabled = false;
    // lives = 3
    // counts = 0
    // minLive.textContent = `LIVE ${lives}`
    // points.textContent = `Ваши баллы: ${counts}`
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
      if (difficult.value !== '2' && difficult.value !== '4') {
        block.classList.add('square-border');
      }
      if (it === 0) {
        addRed(block);
      } else if (it === 1) {
        addGreen(block);
      } else if (it === 2) {
        addStart(block);
      } else if (it === 3) {
        addFinish(block);
      }
      add.append(block);
    });
  });
  Array.from(document.querySelectorAll('.close')).forEach((it) => {
    it.addEventListener('mouseover', () => {
      document.querySelector('.finish').removeEventListener('mouseover', levelUp);
    });
  });
};
fillOut();

startBtn.addEventListener('click', () => {
  startGame();
});

nextBtn.addEventListener('click', () => {
  fillOut();
  startBtn.hidden = false;
  nextBtn.hidden = true;
  // nextBtn.addEventListener('click', ()=> {
  //     if (levels[curLevel][-1]) {
  //         handleClearWay()
  //         fillOut()
  //     }
  // })
});

difficult.addEventListener('change', () => {
  const squares = Array.from(document.querySelectorAll('.square'));
  if (difficult.value === '1') {
    add.classList.remove('cursor');
    squares.forEach((it) => it.classList.add('square-border'));
  } else if (difficult.value === '2') {
    add.classList.remove('cursor');
    squares.forEach((it) => it.classList.remove('square-border'));
  } else if (difficult.value === '3') {
    squares.forEach((it) => it.classList.add('square-border'));
    add.classList.add('cursor');
  } else if (difficult.value === '4') {
    squares.forEach((it) => it.classList.remove('square-border'));
    add.classList.add('cursor');
  }
});
