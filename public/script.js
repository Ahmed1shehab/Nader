const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const editForm = document.getElementById("edit-form");
const updateButton = document.getElementById("update-task");

let taskToEdit = null;

// Fetch tasks from the server
async function fetchTasks() {
  const response = await fetch("/tasks");
  const tasks = await response.json();
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="task-name">${task.name}</span>: 
      <span class="task-desc">${task.description}</span>
      <i class="material-icons update" onclick="editTask(${index})">edit</i>
      <i class="material-icons delete" onclick="deleteTask(${index})">delete</i>
    `;
    taskList.appendChild(li);
  });
}

// Add a new task
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("task-name").value;
  const description = document.getElementById("task-desc").value;

  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });

  fetchTasks();
  taskForm.reset();
});

// Edit task function
function editTask(index) {
  fetch("/tasks")
    .then((response) => response.json())
    .then((tasks) => {
      const task = tasks[index];
      document.getElementById("edit-name").value = task.name;
      document.getElementById("edit-desc").value = task.description;
      taskToEdit = { ...task, index };
      editForm.style.display = "block";
    });
}

// Update task function
updateButton.addEventListener("click", async () => {
  if (taskToEdit) {
    const name = document.getElementById("edit-name").value;
    const description = document.getElementById("edit-desc").value;

    await fetch(`/tasks/${taskToEdit.index}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    fetchTasks();
    editForm.style.display = "none";
    taskToEdit = null;
  }
});

// Delete task function
async function deleteTask(index) {
  await fetch(`/tasks/${index}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();
