const headerBar=document.querySelector('.header-bar'),
    toggleButton=headerBar.querySelector('.toggleButton'),
    menu=headerBar.querySelector('.header-bar_menu');
const toDo= document.querySelector('.todo'),
    toDoForm=document.querySelector('.enter-todo'),
    toDoInput=toDoForm.querySelector(".input-todo"),
    toDoButton=toDoForm.querySelector(".input-button"),
    toDoList=toDo.querySelector(".todo-list");
const TODO="todo"
toggleButton.addEventListener('click',()=>{
    menu.classList.toggle("showing");
});

function paintToDo(text){
    
}

function handleSubmit(e){
    e.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
}



function loadToDo(){
    const TODO_LS=localStorage.getItem(TODO)
    if (TODO_LS!==null){

    };
}
function init(){
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();