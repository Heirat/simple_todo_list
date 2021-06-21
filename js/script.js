'use strict'

const inputNew = document.querySelector('#input-new'),
    btnAdd = document.querySelector('#btn-add'),
    wrapperActive = document.querySelector('.wrapper-active'),
    activeList = document.querySelector('.active-list'),
    wrapperCompleted = document.querySelector('.wrapper-completed'),
    completedList = document.querySelector('.completed-list')

let tasks = {
    active: [],
    completed: []
}

btnAdd.addEventListener('click', () => {
    if (inputNew.value && !tasks.active.includes(inputNew.value))
        tasks.active.push(inputNew.value);
    console.log(tasks.active);
})

inputNew.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        btnAdd.click();
    }
})