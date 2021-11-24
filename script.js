const add = document.querySelector('.add')
const startBtn = document.querySelector('.start-button')
const container = document.querySelector('.container')
const nextBtn = document.querySelector('.button')
const minLive = document.querySelector('.live')

let curLevel = 0
let live = 3

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

const levels = {
    0: level1,
    1: level2,
    2: level3,
}

const clearAdd = () => {
    add.innerHTML = ''
}
const levelUp = (e) => {
    e.stopPropagation()
    clearAdd()
    add.innerHTML = `<div class="text-content"> Уровень пройден !</div>`
    nextBtn.hidden = false
    startBtn.hidden = true
    curLevel++
    container.removeEventListener('mouseover', gameOver)
}
const startGame = () => {
    Array.from(add.children).forEach(it => {
        it.classList.remove('close')
        it.classList.remove('open')
    })
    document.querySelector('.begin').addEventListener('mouseover', () => {
        document.querySelector('.finish').addEventListener('mouseover', levelUp)
    })
    // minLv()
}

const gameOver = () => {
    clearAdd()
    fillOut()
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
}

const addStart = block => {
    block.classList.add('start', 'begin')
    block.textContent = 'S'
    block.addEventListener('mouseover', (e) => {
        e.stopPropagation()
        container.addEventListener('mouseover', gameOver, {once:true})
    })
    // minLv()
}

const addFinish = block => {
    block.classList.add('start', 'finish')
    block.textContent = 'F'
    // block.addEventListener('mouseover', levelUp )
}

// const minLv = () => {
//     if (Array.from(levels.children).map(it => it === 0)) {
//         return minLive.textContent = `Live ${live--}`
//     }
// }

const fillOut = () =>{
    add.innerHTML = ''
    const box = `${100 / levels[curLevel][0].length}%`

    levels[curLevel].forEach( row => {
        row.forEach( it => {
            const block = document.createElement('div')
            block.style.width = box
            block.style.height = box
            block.style.border = '2px solid black'
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
})