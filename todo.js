
const toDo= document.querySelector('.todo'),
    toDoForm=document.querySelector('.enter-todo'),
    toDoInput=toDoForm.querySelector(".input-todo"),
    toDoButton=toDoForm.querySelector(".input-button"),
    toDoList=toDo.querySelector(".todo-list"),
    finishedList=toDo.querySelector(".finished-list");
const TODO="toDo",
    FINISH="finished";
let toDos=[]
let finished=[]
function savefinished(finishedObj){
    localStorage.setItem("finished",JSON.stringify(finishedObj));
}
function paintFinished(text){
    const li=document.createElement("li");
    const span=document.createElement("span");
    span.innerText=`${text}`;
    const delBtn=document.createElement("span");
    delBtn.innerText="delete";
    delBtn.className="delete-button"
    delBtn.addEventListener("click",deleteFinished);
    li.appendChild(span);
    li.appendChild(delBtn);
    finishedList.appendChild(li);
    const finishedObj={
        text:`${text}`,
        id: finished.length +1
    };
    li.id= finished.length +1
    li.classList.add("finished");
    finished.push(finishedObj);
    savefinished(finished);
}
function finishedToDo(e){
    deleteToDo(e);
    const checkBox=e.target
    const li=checkBox.parentNode;
    const text=li.querySelector("span").innerText;
    console.log(text)
    paintFinished(text);
}
function deleteFinished(e){
    const deleteTarget=e.target;
    const li=deleteTarget.parentNode;
    const list=li.parentNode;
    list.removeChild(li);
    const filtered=finished.filter(function(finished){
        console.log(li.id, finished.id)
        return finished.id!==parseInt(li.id)
    })
    finished=filtered;
    savefinished(finished)
}
function deleteToDo(e){
    const deleteTarget=e.target;
    const li=deleteTarget.parentNode;
    const list=li.parentNode;
    list.removeChild(li);
    const filtered=toDos.filter(function(todo){
        console.log(li.id, todo.id)
        return todo.id!==parseInt(li.id)
    })
    toDos=filtered;
    saveToDo(toDos)
}
function saveToDo(toDoObj){
    localStorage.setItem("toDo",JSON.stringify(toDoObj));
}
function paintToDo(text){
    toDoInput.value="";
    const li=document.createElement("li");
    const checkBox=document.createElement("input");
    checkBox. setAttribute('type', 'checkbox');
    checkBox.className="checkbox"
   
    const span=document.createElement("span");
    span.innerText=`${text}`;
    const delBtn=document.createElement("span");
    delBtn.innerText="delete";
    delBtn.className="delete-button"
    delBtn.addEventListener("click",deleteToDo);
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    checkBox.addEventListener("click",finishedToDo)
    const toDoObj={
        text:`${text}`,
        id: toDos.length +1
    };
    li.id= toDos.length +1
    toDos.push(toDoObj);
    saveToDo(toDos);

}

function handleSubmit(e){
    e.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
}



function loadToDo(){
    const TODO_LS=localStorage.getItem(TODO);
    const FINISHED_LS=localStorage.getItem(FINISH);
    if (TODO_LS!==null){
        const parsedToDo=JSON.parse(TODO_LS);
        console.log(parsedToDo)
        parsedToDo.forEach(function (toDo){
            paintToDo(toDo.text);
        });
    }
    if (FINISHED_LS!==null){
        const parsedFinished=JSON.parse(FINISHED_LS);
        console.log(parsedFinished)
        parsedFinished.forEach(function (finished){
            paintFinished(finished.text);
        });
    }
}
function init(){
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();