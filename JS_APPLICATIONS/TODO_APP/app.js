const addTaskSelector = document.querySelector('#add_task');
const listItemsSelector = document.querySelector('#list_items');
const clearSelector = document.querySelector('#clear_all');
const input = document.getElementById('input_task_value'); 
const msgSelector = document.querySelector('#msg_alert'); 
const taskCountSelector = document.getElementById('task_count');
task = []

function loadData (task){
	task.forEach( (val) => addTask(val.id, val.todo, val.done, val.trash) )
}

const allTask = localStorage.getItem('task');
if(allTask){
	task = JSON.parse(allTask);
    taskCountSelector.innerHTML = task.length;
	loadData(task);
}
// else{
// 	task= []
// }


// Add task on Enter button hit ===========================================
document.addEventListener('keyup', (event) => {
	if(event.keyCode == 13){
	    const inputValue = input.value;
		if(inputValue){
			let id = Date.now();
			let checkExistingVal = task.some((val, ind) => val.todo == inputValue)
			if(checkExistingVal){
				let message = `"${inputValue}" Task is already there, please add newone.`
				alertMessage(message, 'danger')
			}
			else{
				addTask(id, inputValue, false, false);
				task.push({id:id, todo:inputValue, done: false, trash: false})
				localStorage.setItem('task', JSON.stringify(task));
				let message = 'Thanks! to add a new task to the list'
				alertMessage(message, 'success')
			}
		}
		input.value = ''
	}
})

// Add task function ===========================================
function addTask (id, todo, done, trash) {
	const success = done ? 'bg-success' : null
	let createNode = document.createElement('li');
	createNode.classList.add('list-group-item');
	createNode.setAttribute("id", id);
	listItemsSelector.appendChild(createNode).innerHTML  = `
										<span> <span class="check ${success}" job="complete" id="${id}"> </span> ${todo}</span> 
									  	<span class="text-danger text-sm" job="delete" id="${id}"> Delete</span> 
									  `
}


// clear all task ===========================================
clearSelector.addEventListener('click', () => {
	localStorage.clear();
    location.reload();
})

// Delete single task ===========================================
listItemsSelector.addEventListener('click', (e) => {
	const element = e.target;
	deleteTask(element);
	markSuccess(element);
})

const deleteTask = (element) => {
	if(element.getAttribute('job') === 'delete') {
		element.parentElement.remove();	
		task.map((val, index) => {
			if(element.id == val.id) {
				task.splice(index, 1)
			}
		})
	localStorage.setItem('task', JSON.stringify(task))	
	}
}

function alertMessage(message, action){
	let msgDiv = document.createElement('div');
	msgSelector.appendChild(msgDiv).innerHTML = `
		<div class="alert alert-${action}">
		   ${message}
		</div>`
	setTimeout(() => msgDiv.remove(),2000)	
}


function markSuccess(element) {
	if(element.getAttribute('job') === 'complete'){
		element.classList.toggle('bg-success');
		task.map((val, index) => {
			if(element.id == val.id) { val.done = !val.done }	
	    })
	 localStorage.setItem('task', JSON.stringify(task))	
   }
}








