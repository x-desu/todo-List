const clearAll = document.querySelector('#clear');
const todolist = document.querySelector('.task-list');
const input = document.querySelector('#task-Input');
const form = document.querySelector('#taskForm');

let todos = []


//on load
onload = ()=>{
    if(localStorage.getItem('todos')){
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    renderTodos()
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();


    saveTodo()
    renderTodos()

})

//save todo 

function saveTodo(){
    const todoValue = input.value


    //check empty input
    const isEmpty = todoValue.trim() === '' || todoValue === null;
    const isDuplicate = todos.some(todo => todo.value.toUpperCase() === todoValue.toUpperCase());

    if(isEmpty){
        alert('Please enter a task');
        
    }else if(isDuplicate){
        alert('Task already exists');
    }else{

    todos.push({
        value: todoValue,
        checked: false,
        edit: false,
        line: false
    })

    input.value = '';

    }
}

function renderTodos(){
    todolist.innerHTML = ''
    todos.forEach((todo, index)=>{
        todolist.innerHTML += `
        <div class="task" id=${index}>
        <div>
        <i class="fa-circle ${todo.checked ?'fa-solid':'fa-regular'} check" data-action="checked">
        </i>
        </div>
        <div class="content">
            <textarea data-actions="checked" type="text" class="text ${todo.line ?'line':''}" ${todo.edit ?'':'readonly'}>${todo.value}</textarea>
        </div>
        <div class="actions">
            <button class="edit" data-action="edit">edit</button>
            <button class="delete" data-action="delete">delete</button>
        </div>
        </div>`

    })

    localStorage.setItem('todos', JSON.stringify(todos))

}


//event listeners
todolist.addEventListener('click', (e)=>{

    const target = e.target;
    const todo = target.parentElement.parentElement;
    
    if(todo.className !== 'task') return;

        const todoId = Number(todo.id)
        const action = target.dataset.action;

        if(action === 'checked'){
            checkTodo(todoId,e)
        }
        if(action === 'edit' || action === 'save'){
            
            editTodo(todoId,e)
        }
        if(action === 'delete'){
            deleteTodo(todoId,e)
        }
    

         
    
    
})
//check todo
function checkTodo(todoId,e){
    todos = todos.map((todo, index)=>{
        if(index === todoId){
            todo.checked = !todo.checked;
        }
        return todo;
    })
    const line = e.target.parentElement.parentElement.children[1].children[0];
    if(todos[todoId].checked){
        todos[todoId].line = true;
    }else{
        todos[todoId].line = false;
    }
    
    console.log(todos)
    
    renderTodos()
}

function editTodo(todoId,e){
    if(e.target.innerHTML === 'edit'){
    const editt = e.target.parentElement.parentElement.children[2].children[0];
    editt.innerHTML = 'save';
    const inputEl = document.getElementById(todoId).querySelector('.text')
    inputEl.focus();
    inputEl.removeAttribute('readonly')
    
    editt.dataset.action = 'save'
    
    }else if(e.target.innerHTML === 'save'){
        const editt = e.target.parentElement.parentElement.children[2].children[0];
        editt.innerHTML = 'edit';
        const inputEl = document.getElementById(todoId).querySelector('.text')
        inputEl.setAttribute('readonly', true)
        editt.dataset.action = 'edit'
        todos[todoId].value = inputEl.value;
        renderTodos()
    }
}



//delete todo
function deleteTodo(todoId,e){
    todos = todos.filter((todo, index) => index !== todoId);
    renderTodos()

}



/* const edit_btn = document.getElementsByClassName('.edit');
console.log(edit_btn) */
