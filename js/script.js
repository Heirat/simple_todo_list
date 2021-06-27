'use strict';
// Elements for adding new task
const
	inputNew = document.querySelector('#input-new'),
	btnAdd = document.querySelector('#btn-add');

// List elements
const
	wrapperActive = document.querySelector('.wrapper-active'),
	activeList = document.querySelector('.active-list'),
	wrapperCompleted = document.querySelector('.wrapper-completed'),
	completedList = document.querySelector('.completed-list');

// Clear buttons
const
	btnClearActive = document.querySelector('#clear-active'),
	btnClearCompleted = document.querySelector('#clear-completed');

// Stores task texts
let tasks = {
	active: [],
	completed: [],
};

/* Safe and load from Local storage */

document.addEventListener('DOMContentLoaded', () => {
	let tasksString = localStorage.getItem('tasks');
	if (tasksString)
		tasks = JSON.parse(tasksString);
	assignActiveList();
	assignCompletedList();
});

window.addEventListener('beforeunload', (e) => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
});

/**
 * Append new task in the end of active-list
 */
function appendToActiveList(taskText) {
	let newItem = document.createElement('li');
	newItem.classList.add('list-item');
	newItem.innerHTML = `
		<span class = "text">${taskText}</span>
		<div class = "list-item-buttons">
			<button class = "btn btn_colored btn-complete">Complete</button>
			<button class = "btn btn_colored btn-remove">Remove</button> 
		</div>
    `;
	activeList.append(newItem);
}

/**
 * Append new task in the end of completed-list
 */
function appendToCompletedList(taskText) {
	let newItem = document.createElement('li');
	newItem.classList.add('list-item');
	newItem.innerHTML = `
		<span class = "text text_completed">${taskText}</span>
		<div class = "list-item-buttons">
			<button class = "btn btn_colored btn-uncomplete">Uncomplete</button>
			<button class = "btn btn_colored btn-remove">Remove</button> 
		</div>
    `;
	completedList.append(newItem);
}

/**
 * Assign tasks.active to activeList
 */
function assignActiveList() {
	assignTasksToList(tasks.active, activeList, appendToActiveList);
	hideClearBtns();
}

/**
 * Assign tasks.completed to completedList
 */
function assignCompletedList() {
	assignTasksToList(tasks.completed, completedList, appendToCompletedList);
	hideClearBtns();
}

function hideClearBtns() {
	if (tasks.active.length > 0)
		btnClearActive.classList.remove('d-none');
	else
		btnClearActive.classList.add('d-none');

	if (tasks.completed.length > 0)
		btnClearCompleted.classList.remove('d-none');
	else
		btnClearCompleted.classList.add('d-none');
}

/**
 * Assign tasks from taskAray to listElem with appendFunc
 * @param {string[]} taskArray
 * @param {Element} listElem
 * @param {function} appendFunc
 */
function assignTasksToList(taskArray, listElem, appendFunc) {
	let items = Array.from(listElem.children);
	let itemsTexts = items.map(item => {
		return item.querySelector('.text').textContent;
	});
	// Remove all list items missed in tasks.active
	items.forEach(item => {
		if (!taskArray.includes(item.querySelector('.text').textContent))
			item.remove()
	})

	// Append all tasks missed in activeList
	taskArray.forEach(task => {
		if (!itemsTexts.includes(task))
			appendFunc(task);
	});
}

/* Handle new task input and add button */

btnAdd.addEventListener('click', () => {
	addTask(inputNew.value, tasks.active, assignActiveList);
	inputNew.value = '';
});

inputNew.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		btnAdd.click();
	}
});

/**
 * Add new task with taskText to taskArray with assignFunc
 * @param {string} taskText
 * @param {string[]} taskArray
 * @param {function} assignFunc
 */
function addTask(taskText, taskArray, assignFunc) {
	if (taskText && !tasks.active.includes(taskText) && !tasks.completed.includes(taskText)) {
		taskArray.push(taskText);
		assignFunc();
	}
}

/* Handle clear buttons */

btnClearActive.addEventListener('click', () => {
	clearList(tasks.active, activeList, assignActiveList);
});

btnClearCompleted.addEventListener('click', () => {
	clearList(tasks.completed, completedList, assignCompletedList);
});

/**
 * Clears all tasks from taskArray and all elements from listElem
 * @param {string[]} taskArray 
 * @param {Element} listElem 
 * @param {function} assignFunc 
 */
function clearList(taskArray, listElem, assignFunc) {
	taskArray.length = 0;
	while (listElem.firstChild)
		listElem.removeChild(listElem.firstChild);
	assignFunc();
}

/* Handle complete buttons */

activeList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-complete'))
		makeCompleted(e.target.parentElement.parentElement);
})

completedList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-uncomplete'))
		makeActive(e.target.parentElement.parentElement);
})

/**
 * Moves listItem from activeList to completedList
 * @param {Element} listItem
 */
function makeCompleted(listItem) {
	let text = listItem.querySelector('.text').textContent;
	deleteTask(text, tasks.active, activeList);
	addTask(text, tasks.completed, assignCompletedList);
}

/**
 * Moves listItem from completedList to activeList
 * @param {Element} listItem
 */
function makeActive(listItem) {
	let text = listItem.querySelector('.text').textContent;
	deleteTask(text, tasks.completed, completedList);
	addTask(text, tasks.active, assignActiveList);
}

/**
 * Find and delete task with given taskText from listElem and taskArray
 * @param {string} taskText 
 * @param {string[]} taskArray 
 * @param {Element} listElem 
 */
function deleteTask(taskText, taskArray, listElem) {
	taskArray.splice(taskArray.indexOf(taskText), 1);
	let deletedItem = Array.from(listElem.children).find(item => {
		return item.querySelector('.text').textContent == taskText;
	});
	deletedItem.remove();
	hideClearBtns();
}

/*  */