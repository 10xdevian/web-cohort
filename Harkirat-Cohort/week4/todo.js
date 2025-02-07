const express = require("express");
// const fs = require("fs");

const app = express();

// middleware to pass json bodies
app.use(express.json());

let todos = [];
let idCounter = 1;

function generateID() {
  return idCounter++;
}
// get all todos
app.get("/todos", function (req, res) {
  res.status(200).json(todos);
});

// create todos
app.post("/todos", function (req, res) {
  const todo = {
    id: generateID(),
    title: req.body.title,
    description: req.body.description,
  };
  todos.push(todo);
  res.status(200).send("Todo is Created ").json({ id: todo.id });
});

// update the todo by id
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id); // convert id into number
  // find the todo by id
  const todoIndex = todos.findIndex((t) => {
    return t.id === id;
  });
  if (todoIndex !== -1) {
    // todo exists
    todos[todoIndex] = {
      ...todos[todoIndex], // keep existing properties of todo
      ...req.body, // update by body
    };
    res.status(200).send("Todo is updated ");
  } else {
    res.status(404).send("Todo is not Found");
  }
});

app.delete("/todos/:id", function (req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(404).json({ message: "Id is Invailed" });
  }
  const todoIndex = todos.findIndex((t) => {
    return t.id === id;
  });

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos.splice(todoIndex, 1); // slice first take index and 2nd how many argument you want to remove
  res.status(200).json({ message: "Todo is deleted" });
});
app.listen(3000);
