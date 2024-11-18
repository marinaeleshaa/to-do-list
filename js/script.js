var form = document.getElementById("form-parent");
var tasks_div = document.getElementById("tasks");
var title_value = document.getElementById("task_name");
var add_btn = document.getElementById("add-task");
var delete_btn = document.querySelectorAll(".delete");
var delete_form = document.getElementById("delete-form-parent");
var delete_task = document.getElementById("delete-task");
var update_form = document.getElementById("update-form-parent");
var update_value = document.getElementById("update-value");
var update_btn = document.getElementById("update-task");

function takeNewTask() {
  form.style.display = "flex";
}

function closeForm() {
  form.style.display = "none";
  delete_form.style.display = "none";
  update_form.style.display = "none";
}

let tasks = [
  {
    title: "read book",
    date: "15/10/2024",
    time: "22:15",
    isDone: false
  },
  {
    title: "end the project",
    date: "15/10/2024",
    time: "22:15",
    isDone: false
  },
  {
    title: "end js course",
    date: "15/10/2024",
    time: "22:15",
    isDone: false
  },
  {
    title: "task done",
    date: "15/10/2024",
    time: "22:15",
    isDone: false
  }
];

function getTasks(){
  var retrived_tasks = JSON.parse(localStorage.getItem("tasks"));
tasks = retrived_tasks ?? []
}
getTasks()

function fillTasks() {
  tasks_div.innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `
          <div
            class="d-flex justify-content-center align-items-center border-primary border-bottom border-2 rounded-5 p-2 item flex-sm-row flex-column ${
              task.isDone ? "done" : ""
            } "
          >
          <!-- right -->
            <div
              class="d-flex justify-content-center align-items-sm-start p-2 flex-column flex-grow-1 text-primary align-items-center"
            >
              <h4>${task.title}</h4>
              <p class="m-0">
                ${task.date} <i class="fa-solid fa-calendar-days me-2"></i> ${
      task.time
    } <i class="fa-regular fa-clock"></i>
              </p>
            </div>
            <!-- left -->
            <div
              class="d-flex justify-content-center col-4 column-gap-3 justify-content-lg-evenly"
            >
              <button class="btn bg-primary text-white rounded-circle "onclick="updateTask(${index})">
                <i class="fa-solid fa-pen" ></i>
              </button>
              <button class="btn bg-success text-white rounded-circle " onclick="doneTask(${index})">
                <i class="fa-solid fa-check icon"></i>
              </button>
              <button class="btn bg-danger text-white rounded-circle delete" onclick="deleteTask(${index})">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>`;
    tasks_div.innerHTML += content;
    index++;
  }
}

fillTasks();

// ==================add task=======================
add_btn.addEventListener("click", function () {
  let now = new Date();
  let creationDate =
    now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
  let creationTime = now.getHours() + ":" + now.getMinutes();
  let taskObj = {
    title: title_value.value,
    date: creationDate,
    time: creationTime,
    isDone: false
  };
  tasks.push(taskObj);
  storage()
  title_value.value = "";
  fillTasks();
});

// ==================delete task==========================
function deleteTask(index) {
  document.getElementById(
    "msg1"
  ).innerHTML = `do you want to delete ${tasks[index].title} ?`;
  delete_form.style.display = "flex";
  delete_task.onclick = function () {
    tasks.splice(index, 1);
    storage()
    fillTasks();
    delete_form.style.display = "none";
  };
}

// ==================update task===========================
function updateTask(index) {
  update_form.style.display = "flex";
  document.getElementById(
    "msg2"
  ).innerHTML = `do you want to update ${tasks[index].title} ?`;
  update_btn.onclick = function () {
    tasks[index].title = `${update_value.value}`;
    update_form.style.display = "none";
    storage
    fillTasks();
  };
}

// ===============done task========================
function doneTask(index) {
  tasks[index].isDone = !tasks[index].isDone;
  storage()
  fillTasks();
}

// ================local storage========================

function storage() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
}
