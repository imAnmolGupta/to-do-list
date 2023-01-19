(function(){


let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
/* method 1
function fetchTodos(){ //to display list of 10 todos
    //Get request. fetch function returns a promise
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function(response){ //to convert this response into Json first
        return response.json(); //.json will return a promise
    }).then(function(data){
        tasks=data.slice(0,10);
        renderList();
    })
    .catch(function(error){
        console.log('error',error);
    })

}
*/
async function fetchTodos(){
    try{
        const response=await fetch('https://jsonplaceholder.typicode.com/todos');
        const data=await response.json();
        tasks=data.slice(0,10);
        renderList();
    }
    catch(error){
        console.log(error)
    }
}

function addTaskToDOM(task){
    const li=document.createElement('li');
    
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : '' } class="custom-checkbox" >
        <label for="${task.id}"> ${task.title} </label>
        <img src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-bin-hotel-essentials-justicon-flat-justicon.png" class="delete" data-id="${task.id}" / >
    `;
    
    tasksList.append(li);
}

function renderList () {
    tasksList.innerHTML='';// so nothing is rendered in list
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;

}

function toggleTask (taskId) {
    const task=tasks.filter(function(task){
        return task.id ===Number(taskId)
    });
    if(task.length>0){
        const currentTask=task[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
    showNotification('Could not toggle task');
}

function deleteTask (taskId) {
    const newTasks=tasks.filter(function(task){
        return task.id !==Number(taskId)
    });
    tasks=newTasks;
    renderList();
    showNotification('Task deleted');
}

function addTask (task) {
    if(task){
    //     fetch('https://jsonplaceholder.typicode.com/todos',{
    //         method: 'POST', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(task),
    //     }).then(function(response){ 
    //         return response.json(); 
    //         }).then(function(data){
    //             console.log(data);
    //             tasks.push(task);
    //             renderList();
    //             showNotification('Task added');
    //           })
    // .catch(function(error){
    //     console.log('error',error);
    // })
    
    tasks.push(task);
    renderList();
    showNotification('Task added');
    return;
    }
    //if task is not present then
    showNotification('Task can not be added');

}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e){
    if(e.key==='Enter'){
        const text=e.target.value;
        console.log('text is',text);

    if(text==' '){
        showNotification('Task text can not be empty');
        return;
    }
    const task={
        title:text,
        id:Date.now().toString(),
        completed:false
    }
    e.target.value=' '; //to make input box empty again
    addTask(task); //passing task to function
}
} 


function handleClickListener(e){
    const target=e.target; 
    if(target.className==='delete' ) {
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className==='custom-checkbox') {
        const taskId=target.id;
        toggleTask(taskId);
        return;
    }
}

function initializeApp(){
    fetchTodos();
    addTaskInput.addEventListener('keyup',handleInputKeypress);
    document.addEventListener('click',handleClickListener);

}
initializeApp();

})()