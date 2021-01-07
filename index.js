//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all evemt listeners
loadEventListeners();

// Load all evemt listeners
function loadEventListeners(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add Tasks
    form.addEventListener('submit', addTask);
    //Remove task
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTask);
    //Filter tasks events
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    //create new li
    const li = document.createElement('li');
    //add className
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    })
}

//Add Tasks
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task')
    }

    //create new li
    const li = document.createElement('li');
    //add className
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    //Store to LS
    storeTaskInLocalStorage(taskInput.value);
    
    // Clear the input
    taskInput.value = '';

    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task
function clearTask() {
    // taskList.innerHTML = '';

    if(confirm('Are you sure')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        };
    };

    // Clear from LS
    clearTasksFromLocalStorage()
}

//Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear()
}


// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    });
}

