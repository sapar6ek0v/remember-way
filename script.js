const add = document.querySelector('.add')
const startBtn = document.querySelector('.start-button')
const container = document.querySelector('.container')
const nextBtn = document.querySelector('.button')
const minLive = document.querySelector('.live')
const currentLev = document.querySelector('.current-level')
const difficult = document.querySelector('#checkbox')
const balls = document.querySelector('.balls')
const list = document.querySelector('#list')
// const valList = document.createElement('li')
// list.append(valList)
balls.textContent = `Ваши баллы:`
minLive.textContent = `LIVE`
let points = 0
let curLevel = 0
let level = 0
let live = 3
let gamePaused = true
let counts = 0
let levelCounts = 0


const level1 = [
    [2,0,0,0,0],
    [1,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,1,1],
    [0,0,0,0,3],
]
const level2 = [
    [0,1,1,1,2,0],
    [0,1,0,0,0,0],
    [0,1,1,1,0,0],
    [0,0,0,1,0,0],
    [0,1,1,1,0,0],
    [0,3,0,0,0,0],
]
const level3 = [
    [0,2,1,1,1,1,1],
    [0,0,0,0,0,0,1],
    [0,0,0,0,1,1,1],
    [0,0,1,1,1,0,0],
    [0,0,1,0,0,0,0],
    [0,0,1,0,0,0,0],
    [0,0,1,1,1,1,3],
]
const level4 = [
    [0,0,0,0,0,2,1,0],
    [0,0,0,0,0,0,1,0],
    [1,1,1,1,1,1,1,0],
    [1,0,0,0,0,0,0,0],
    [1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,1,0],
    [0,0,0,0,0,0,1,0],
    [0,0,3,1,1,1,1,0],
]
const level5 = [
    [2,1,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,0,0,0,0],
    [0,0,1,1,1,0,0,0,0],
    [0,0,1,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,1,0,0],
    [0,1,1,1,1,1,1,0,0],
    [0,3,0,0,0,0,0,0,0],
]

const levels = {
    0: level1,
    1: level2,
    2: level3,
    3: level4,
    4: level5,
}
const countsPoints = () => {
    if ( counts > points ) {
        points = counts
        list.textContent = `Лучший результат ${ points }`
    }
}

const clearAdd = () => {
    add.innerHTML = ''
}
const levelUp = (e) => {
    if ( counts > 20 && confirm('Хотите ли обменять ваши 20 баллы на 1 жизнь')) {
        counts -= 20
        live += 1
    }
    e.stopPropagation()
    clearAdd()
    level++
    add.innerHTML = `<div class="text-content">Уровень ${level} пройден !</div>`
    nextBtn.hidden = false
    startBtn.hidden = true
    // container.addEventListener('mouseover', gameOver)
    curLevel++
    levelCounts = 0
    gamePaused = true
    // if  ( live < 3 || curLevel > 0 ) {
    //     difficult.disabled = true
    // }
    // valList.textContent = `Лучший результат: ${counts += +difficult.value}`
    if ( curLevel + 2 ) {
        live += 1
    }


}
const startGame = () => {
    gamePaused = false
    Array.from(add.children).forEach(it => {
        it.classList.remove('close')
        it.classList.remove('open')
    })
    document.querySelector('.begin').addEventListener('mouseover', () => {
        document.querySelector('.finish').addEventListener('mouseover', levelUp)
    })
}

const gameOver = () => {
    if  ( live < 3 || curLevel > 0 ) {
        difficult.disabled = true
    }
    if (gamePaused) {
        return ;
    }
    counts -= levelCounts + 2
    levelCounts = 0
    live--
    if (live <=0 ) {
        countsPoints()
        curLevel = 0
        live = 3
        counts = 0
        difficult.disabled = false
        alert('Вы должны начать заново')
    }
    // if ( counts < levelCounts ) {
    //     valList.textContent = `Лучший результат: ${counts += +difficult.value}`
    //     valList.textContent = `${counts = levelCounts}`
    // }
    minLive.textContent = `LIVE ${live}`
    balls.textContent = `Ваши баллы: ${counts}`

    clearAdd()
    fillOut()
    gamePaused =true
}
const addRed = block => {
    block.classList.add('close')
    block.addEventListener('mouseover' , gameOver)
}

const addGreen = block => {
    block.classList.add('open')
    block.addEventListener('mouseover', (e) => {
        e.stopPropagation()
        block.classList.add('open')
    })
    block.addEventListener('mouseover', function countPoints () {
        if (!gamePaused) {
            counts += +difficult.value
            levelCounts  += +difficult.value
            // add.addEventListener('mouseover', () => {
            //     valList.innerHTML = `<div> Рейтинг очков </div>
            //             ${counts += +difficult.value}`
            // })
            // valList.textContent = `Лучший результат${counts += +difficult.value}`
            balls.textContent = `Ваши баллы: ${counts}`
            // valList.textContent = `Лучший результат: ${counts += +difficult.value}`

            block.removeEventListener('mouseover', countPoints )
            if (difficult.checked) {
                counts += 1
            }

        }
    })
}

const addStart = block => {
    block.classList.add('start', 'begin')
    block.textContent = 'S'
    block.addEventListener('mouseover', (e) => {
        e.stopPropagation()
        container.addEventListener('mouseover', gameOver, {once:true})
    })

}

const addFinish = block => {
    block.classList.add('start', 'finish')
    block.textContent = 'F'
}

const fillOut = () =>{
    currentLev.textContent = `Ваш уровень ${curLevel + 1}`
    add.innerHTML = ''
    if (!levels[curLevel]) {
        countsPoints()
        alert("Ты прошёл мою игру")
        curLevel = 0
        difficult.disabled = false
        // live = 3
        // counts = 0
        // minLive.textContent = `LIVE ${live}`
        // balls.textContent = `Ваши баллы: ${counts}`
        fillOut()
        return;
    }
    const box = `${100 / levels[curLevel][0].length}%`

    levels[curLevel].forEach( row => {
        row.forEach( it => {
            const block = document.createElement('div')
            block.style.width = box
            block.style.height = box
            block.classList.add('square')
            if ( difficult.value !== '2' && difficult.value !== '4' ) {
                block.classList.add('square-border')
            }
            if ( it === 0 ) {
                addRed(block)
            } else if ( it === 1 ) {
                addGreen(block)
            } else if ( it === 2 ) {
               addStart(block)
            } else if ( it === 3 ) {
                addFinish(block)
            }
            add.append(block)
        })
    })
    Array.from(document.querySelectorAll('.close')).forEach( it => {
        it.addEventListener('mouseover', () => {
            document.querySelector('.finish').removeEventListener('mouseover', levelUp)
        })
    })

}
fillOut()

startBtn.addEventListener('click', () => {
   startGame()
})
nextBtn.addEventListener('click', () => {
    fillOut()
    startBtn.hidden = false
    nextBtn.hidden = true
    // nextBtn.addEventListener('click', ()=> {
    //     if (levels[curLevel][-1]) {
    //         clearAdd()
    //         fillOut()
    //     }
    // })
})

difficult.addEventListener('change', () => {
    const squares = Array.from(document.querySelectorAll('.square'))
    if ( difficult.value === '1' ) {
        add.classList.remove('cursor')
        squares.forEach(it => it.classList.add('square-border'))
    } else if ( difficult.value === '2' ) {
        add.classList.remove('cursor')
        squares.forEach(it => it.classList.remove('square-border'))
    } else if ( difficult.value === '3' ) {
        squares.forEach(it => it.classList.add('square-border'))
        add.classList.add('cursor')
    } else if ( difficult.value === '4' ) {
        squares.forEach(it => it.classList.remove('square-border'))
        add.classList.add('cursor')
    }
})



