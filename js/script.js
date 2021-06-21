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

function appendToActiveList(taskText) {
    let newItem = document.createElement('li')
    newItem.classList.add('list-item')
    newItem.innerHTML =
        `
            <span class = "text">${taskText}</span>
            <div class = "list-item-buttons">
                <button class = "btn btn_colored btn-complete">Complete</button>
                <button class = "btn btn_colored btn-remove">Remove</button> 
            </div>
        `
    activeList.append(newItem)
}

function addActive(taskText) {
    if (taskText && !tasks.active.includes(taskText)) {
        tasks.active.push(taskText)
        appendToActiveList(taskText)
        viewActiveList();
    }
}

function viewActiveList() {
    if (tasks.active.length > 0)
        wrapperActive.classList.remove('d-none')
    else
        wrapperActive.classList.add('d-none')
}

function viewCompleteList() {
    if (tasks.completed.length > 0)
        wrappeCompleted.classList.remove('d-none')
    else
        wrapperCompleted.classList.add('d-none')
}

// Add task to tasks.active

btnAdd.addEventListener('click', () => {
    addActive(inputNew.value)
    inputNew.value = ''
})

inputNew.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        btnAdd.click();
    }
})