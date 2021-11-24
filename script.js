const add = document.querySelector('.add')
const startBtn = document.querySelector('.start-button')
const container = document.querySelector('.container')
const nextBtn = document.querySelector('.button')
const level1 = [
    [2,0,0,0,0],
    [1,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,1,1],
    [0,0,0,0,3],
]

const clearAdd = () => {
    add.innerHTML = ''
}

const gameOver = () => {
    clearAdd()
    fillOut()
}

const one1 = () => {

}

const fillOut = () =>{
    const box = `${100 / level1[0].length}%`

    level1.forEach( row => {
        row.forEach( it => {
            const block = document.createElement('div')
            block.style.width = box
            block.style.height = box
            block.style.border = '2px solid black'
            if ( it === 0 ) {
                block.classList.add('close')
                block.addEventListener('mouseover' , gameOver)
            } else if ( it === 1 ) {
                block.classList.add('open')
                block.addEventListener('mouseover', (e) => {
                    e.stopPropagation()
                    block.classList.add('open')
                })
            } else if ( it === 2 ) {
                block.classList.add('start')
                block.textContent = 'S'
                block.addEventListener('mouseover', (e) => {
                    e.stopPropagation()
                    container.addEventListener('mouseover', gameOver, {once:true})
                })
            } else if ( it === 3 ) {
                block.classList.add('start')
                block.textContent = 'F'
                block.addEventListener('mouseover', () => {
                    container.addEventListener('mouseover', () => {}, {once: false})
                })
            }
            add.append(block)
        })
    })
}

fillOut()
startBtn.addEventListener('click', () => {
    Array.from(add.children).forEach(it => {
        it.classList.remove('close')
        it.classList.remove('open')
    })
})