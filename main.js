/*
1. user put value
2. press + button to add to do list
3. press delete button to delete to do list
4. press check button to done to do list
    when you press check button true to false 
    if it is true then Done 
    if it is false then Not Done
5. if you press done while proceeding, under-line moves
6. Done includes done lists, Not done includes proceeding lists
6. All includes all lists
*/

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = []; 
addButton.addEventListener("click", addTask);
console.log(tabs);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
    let list = [];
    if (mode == "all"){
        list = taskList; 
    }else if (mode == "ongoing" || mode == "done"){
        list = filterList; 
    }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class = "task">
            <div class = "task-done">${list[i].taskContent}</div>
            <div>
                <button onclick = "toggleComplete('${list[i].id}')">Check</button>
                <button onclick = "deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
    } else {
      resultHTML += `<div class = "task">
            <div>
            ${list[i].taskContent}
            </div>
            <div>
                <button onclick = "toggleComplete('${list[i].id}')">Check</button>
                <button onclick = "deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event){
    mode = event.target.id; 
    filterList = []

    document.getElementById("under-line").style.width = event.target.offsetWidth + "px"; 
    // document.getElementById("under-line").style.top = event.target.offsetTop + event.target.offsetWidth + "px"; 
    document.getElementById("under-line").style.left = event.target.offsetLeft + "px"; 
    if(mode == "all"){
        render();
    }else if (mode == "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render(); 
    }else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render(); 
    }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
