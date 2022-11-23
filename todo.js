let tasks = []
let newtask = []
let checked = false;
let checkarr = []

let newarr = []

const clearAll = document.querySelector('#clear');

clearAll.addEventListener('click', ()=>{
    localStorage.clear();
    location.reload();
    count = 0
})
    
//local storage saving tasks
const storage = (task)=>{
    console.log(tasks)

    
    //empty value
    const isEmpty = task === '';

    //check duplicate
    const isDuplicate = tasks.some((ele)=> ele.toLowerCase() === task.toLowerCase());

    if(tasks == null){
        console.log('empty')
    }

    if(!isEmpty && !isDuplicate){
        tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks(task)
    
    }else if(isDuplicate){
        alert('Task already exists');
    }

    //saving to local storage
    
    
};
let count = -1
//render items
const renderTasks = (taskInpu)=>{
    
    newtask = JSON.parse(localStorage.getItem('tasks'));
    console.log(newtask)
    if(taskInpu !== undefined){
        count++
        addtasks(taskInpu,count);
        
        console.log(count)
        checkarr.push(false)
        localStorage.setItem('checked', JSON.stringify(checkarr));
    }else if (newtask !== null){
        
        newtask.forEach((task,index)=>{
            addtasks(task,index);
            count = index
        })
}

}

function addtasks(task,index){
    const form = document.querySelector('#taskForm');
    const input = document.querySelector('#task-Input');
    const list_el = document.querySelector('.task-list');
const task_el = document.createElement('div')
        task_el.classList.add('task');

        const content_el = document.createElement('div');
        content_el.classList.add('content');
         
        /* const check = document.createElement('input');
        check.type = 'checkbox';
        check.classList.add('check');
        task_el.appendChild(check); */


        //check if task is checked
        const check = document.createElement('i');
        check.classList.add('fa-regular');
        check.classList.add('fa-circle');
        check.classList.add('check');
        task_el.appendChild(check);
        task_el.appendChild(content_el);
        
        console.log(index)
        if(checkarr !== null){
            if(checkarr[index] == true){
                console.log(checkarr)                  
            check.classList.toggle('fa-regular');
            check.classList.toggle('fa-solid');
            content_el.classList.toggle('checked');
            }
        }
        check.addEventListener('click', (e)=>{

            /* checkarr = JSON.parse(localStorage.getItem('checked'));
            console.log(checkarr) */
            check.classList.toggle('fa-regular');
            check.classList.toggle('fa-solid');
            
            content_el.classList.toggle('checked');
            if(check.classList.contains('fa-solid')){
                checked = true;
                
            }else{
                checked = false;
                }
                checkarr = JSON.parse(localStorage.getItem('checked'));
            checkarr[index] = checked
                
                localStorage.setItem('checked', JSON.stringify(checkarr));
        })


        //input value 
        const input_el = document.createElement('textarea');
        input_el.classList.add('text')
        input_el.setAttribute('maxlength', '112');
        input_el.type = 'text';
        input_el.value = task;
        input_el.setAttribute('readonly', true);

        content_el.appendChild(input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        const edit_btn = document.createElement('button');
        edit_btn.classList.add('edit');
        edit_btn.innerHTML = 'Edit';
        const delete_btn = document.createElement('button');
        delete_btn.classList.add('delete');
        delete_btn.innerHTML = 'Delete';
        task_actions_el.appendChild(edit_btn);
        task_actions_el.appendChild(delete_btn);

        
        task_el.appendChild(task_actions_el);
        list_el.appendChild(task_el);
        
        
        
      
        edit_btn.addEventListener('click', ()=>{
            if(edit_btn.innerHTML === 'Edit'){
        input_el.removeAttribute('readonly');
        input_el.focus();

        edit_btn.innerHTML = 'Save';
        
            }else{
                const getItems = JSON.parse(localStorage.getItem('tasks'));
                console.log(getItems)
                getItems[index] = input_el.value;
                input_el.setAttribute('readonly', true);
                edit_btn.innerHTML = 'Edit';


                
                console.log(getItems)
                localStorage.setItem('tasks', JSON.stringify(getItems));
                

            }
        
        })

        delete_btn.addEventListener('click', ()=>{
            task_el.remove();
            const getItems = JSON.parse(localStorage.getItem('tasks'));
            console.log(getItems) 
             getItems.splice(index, 1);
            console.log(getItems) 
            const setItems = localStorage.setItem('tasks', JSON.stringify(getItems)); 
            checkarr = JSON.parse(localStorage.getItem('checked'));
            checkarr.splice(index, 1);
            localStorage.setItem('checked', JSON.stringify(checkarr));
            count--
        
        })
        
}
    

onload = ()=> {
    const form = document.querySelector('#taskForm');
    const input = document.querySelector('#task-Input');
    const list_el = document.querySelector('.task-list');
    console.log('loaded');
    if(JSON.parse(localStorage.getItem('checked') !== null)){
        checkarr = JSON.parse(localStorage.getItem('checked'));
    }
    
    renderTasks()
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const task = input.value;
        if(!task){
            alert('Please enter a task');
            return;
        }
        
        if(JSON.parse(localStorage.getItem('tasks') !== null)){
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        
        //save tasks to local storage
        storage(task);
        input.value = '';

        //render tasks
       
    
} )

}

 
