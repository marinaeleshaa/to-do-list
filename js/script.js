var form = document.getElementById("form-parent");
var tasks_div = document.getElementById("tasks");
var title_value = document.getElementById("task_name");
var add_btn = document.getElementById("add-task");
var delete_btn = document.querySelectorAll(".delete");
var delete_form = document.getElementById("delete-form-parent");
var delete_all_form = document.getElementById("delete-all-form-parent");
var delete_task = document.getElementById("delete-task");
var update_form = document.getElementById("update-form-parent");
var update_value = document.getElementById("update-value");
var update_btn = document.getElementById("update-task");
var delete_all_btn = document.getElementById("delete-all");
var getUserName = document.getElementById("getUserName");
var nameInput = document.getElementById("nameInput");
var addNameBtn = document.getElementById("add-name-btn");
var addUserBtn = document.getElementById("addUserBtn");

function takeNewTask() {
  form.style.display = "flex";
}

function closeForm() {
  form.style.display = "none";
  delete_form.style.display = "none";
  update_form.style.display = "none";
  delete_all_form.style.display = "none";
  getUserName.style.display = "none";
}

let tasks = [
  // {
  //   title: "read book",
  //   date: "15/10/2024",
  //   time: "22:15",
  //   isDone: false
  // },
  // {
  //   title: "end the project",
  //   date: "15/10/2024",
  //   time: "22:15",
  //   isDone: false
  // },
  // {
  //   title: "end js course",
  //   date: "15/10/2024",
  //   time: "22:15",
  //   isDone: false
  // },
  // {
  //   title: "task done",
  //   date: "15/10/2024",
  //   time: "22:15",
  //   isDone: false
  // }
];

function getTasks() {
  var retrived_tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = retrived_tasks ?? [];
}
getTasks();

function fillTasks() {
  tasks_div.innerHTML = "";
  if (tasks.length) {
    document.getElementById("text").style.display = "none";
    delete_all_btn.style.display = "inline-block";
    tasks_div.classList.add("p-2", "p-md-3");
  } else {
    tasks_div.classList.remove("p-2", "p-md-3");
    document.getElementById("text").style.display = "flex";
    delete_all_btn.style.display = "none";
  }

  let index = 0;
  for (task of tasks) {
    let content = `
          <div
            class="d-flex justify-content-center align-items-center  rounded-5 p-2 item flex-sm-row flex-column ${
              task.isDone ? "bg-success-subtle border border-success" : ""
            } ${task.isDone ? "" : "border-primary-subtle border border-2 "}"
          >
          <!-- right -->
            <div
              class="d-flex justify-content-center align-items-sm-start p-2 flex-column flex-grow-1  align-items-center text-primary"
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
                <i class="fa-solid  ${
                  task.isDone ? "fa-rotate-left" : "fa-check icon"
                }"></i>
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
  if (!title_value.value.trim()) {
    document.getElementById("empty-name").innerHTML =
      "must add a name to your task";
    return;
  }
  let taskObj = {
    title: title_value.value,
    date: creationDate,
    time: creationTime,
    isDone: false,
  };
  tasks.push(taskObj);
  storage();
  title_value.value = "";
  fillTasks();
  document.getElementById("empty-name").innerHTML = "";
  closeForm();
});

// ==================delete task==========================
function deleteTask(index) {
  document.getElementById(
    "msg1"
  ).innerHTML = `do you want to delete ${tasks[index].title} ?`;
  delete_form.style.display = "flex";
  delete_task.onclick = function () {
    tasks.splice(index, 1);
    storage();
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
    if (!update_value.value.trim()) {
      document.getElementById("update-error").innerHTML =
        "must add a name to your task";
      return;
    }
    tasks[index].title = `${update_value.value}`;
    update_form.style.display = "none";
    storage();
    fillTasks();
    update_value.value = "";
    document.getElementById("update-error").innerHTML = "";
    closeForm();
  };
}

// ===============done task========================
function doneTask(index) {
  tasks[index].isDone = !tasks[index].isDone;
  storage();
  fillTasks();
}



// =====================delete all tasks=====================

delete_all_btn.addEventListener("click", () => {
  delete_all_form.style.display = "flex";
  const msgElement = document.getElementById("msg3");
  msgElement.innerHTML = `Do you want to delete all tasks?`;
  document.getElementById("delete-all-task").onclick = () => {
    tasks = [];
    storage();
    fillTasks();
    closeForm();
  };
});
// =========================get the name=======================

let userName = "";

// Retrieve stored username from localStorage
function getName() {
  let retrievedName = localStorage.getItem("userName"); // Get stored name
  userName = retrievedName ? JSON.parse(retrievedName) : "user"; // Default to "user" if null
}

// Call getName() first to ensure userName is set
getName(); 

// Display welcome message with stored name
document.getElementById("welcomeMsg").innerHTML = `Welcome, ${userName}❤️ Stay focused and succeed 😉👌`;

document.getElementById("msg4").innerHTML = "I'm so happy to know your name😍";

// Show input form
addUserBtn.addEventListener("click", () => {
  getUserName.style.display = "flex";
});

// Handle name input changes
nameInput.addEventListener("change", () => {
  let newName = nameInput.value.trim();

  if (newName && newName !== userName) {
    document.getElementById("name-error").innerHTML = ""; // Clear error if valid
  }
});

// Handle name submission
addNameBtn.addEventListener("click", () => {
  let newName = nameInput.value.trim();

  if (!newName || newName === "user") {
    document.getElementById("name-error").innerHTML = "Add Your Name!";
    return;
  }
  if (newName === userName) {
    document.getElementById("name-error").innerHTML = "Add a Different Name!";
    return;
  }

  // Update username and save to localStorage
  userName = newName;
  localStorage.setItem("userName", JSON.stringify(userName)); // Save updated name

  // Update welcome message
  document.getElementById("welcomeMsg").innerHTML = `Welcome, ${userName}❤️ Stay focused and succeed 😉👌`;

  nameInput.value = ""; // Clear input
  closeForm();
});

// Save tasks to localStorage
function storage() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
}
