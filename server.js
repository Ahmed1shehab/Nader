const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let tasks = [{ name: "Sample Task", description: "This is a sample task." }];

app.get("/tasks", (req, res) => res.json(tasks));

// Add a new task
app.post("/tasks", (req, res) => {
  const { name, description } = req.body;
  tasks.push({ name, description });
  res.status(201).json({ message: "Task added!" });
});

// Update an existing task
app.put("/tasks/:index", (req, res) => {
  const index = req.params.index;
  const { name, description } = req.body;
  if (index < 0 || index >= tasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks[index] = { name, description };
  res.status(200).json({ message: "Task updated!" });
});

// Delete a task
app.delete("/tasks/:index", (req, res) => {
  const index = req.params.index;
  if (index < 0 || index >= tasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks.splice(index, 1);
  res.status(200).json({ message: "Task deleted!" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
