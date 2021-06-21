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

document.addEventListener('DOMContentLoaded', () => {
    let tasksString = localStorage.getItem('tasks')
    if (tasksString)
        tasks = JSON.parse(tasksString)
})

window.addEventListener('beforeunload', e => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
})

btnAdd.addEventListener('click', () => {
    if (inputNew.value && !tasks.active.includes(inputNew.value))
        tasks.active.push(inputNew.value);
    console.log(tasks.active);
})

inputNew.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        btnAdd.click();
    }
})