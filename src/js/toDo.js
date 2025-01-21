let todos = [];
let sortAscending = true;
let showCompleted = true;

function addTodo(event) {
  event.preventDefault();
  const input = document.getElementById("todoInput");
  const priority = document.getElementById("priorityInput");

  if (input.value.trim()) {
    const todo = {
      id: Date.now(),
      text: input.value,
      priority: priority.value,
      completed: false,
    };

    todos.push(todo);
    renderTodos();
    input.value = "";
  }
}

function toggleTodoComplete(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

function toggleCompleted() {
  showCompleted = !showCompleted;
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function editTodo(id) {
  const todoElement = document.getElementById(`todo-${id}`);
  const todo = todos.find((t) => t.id === id);

  todoElement.innerHTML = `
                <input type="text" value="${todo.text}" id="edit-${id}">
                <select id="edit-priority-${id}">
                    <option value="high" ${
                      todo.priority === "high" ? "selected" : ""
                    }>Alta</option>
                    <option value="medium" ${
                      todo.priority === "medium" ? "selected" : ""
                    }>Media</option>
                    <option value="low" ${
                      todo.priority === "low" ? "selected" : ""
                    }>Baja</option>
                </select>
                <div class="todo-actions">
                    <button onclick="saveEdit(${id})">Guardar</button>
                    <button onclick="renderTodos()">Cancelar</button>
                </div>
            `;

  todoElement.classList.add("editing");
}

function saveEdit(id) {
  const todo = todos.find((t) => t.id === id);
  const newText = document.getElementById(`edit-${id}`).value;
  const newPriority = document.getElementById(`edit-priority-${id}`).value;

  if (newText.trim()) {
    todo.text = newText;
    todo.priority = newPriority;
    renderTodos();
  }
}

function sortByPriority() {
  sortAscending = !sortAscending;
  const priorityValues = { high: 3, medium: 2, low: 1 };

  todos.sort((a, b) => {
    const priorityA = priorityValues[a.priority];
    const priorityB = priorityValues[b.priority];
    return sortAscending ? priorityB - priorityA : priorityA - priorityB;
  });

  renderTodos();
}

function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  const visibleTodos = showCompleted
    ? todos
    : todos.filter((todo) => !todo.completed);

  visibleTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.id = `todo-${todo.id}`;
    li.className = `todo-item ${todo.priority}-priority ${
      todo.completed ? "completed" : ""
    }`;

    li.innerHTML = `
                    <input type="checkbox" class="todo-checkbox" 
                           ${todo.completed ? "checked" : ""} 
                           onchange="toggleTodoComplete(${todo.id})">
                    <div class="todo-content">
                        <span class="todo-text">${todo.text}</span>
                        <span class="priority-label">(${
                          todo.priority === "high"
                            ? "Alta"
                            : todo.priority === "medium"
                            ? "Media"
                            : "Baja"
                        })</span>
                    </div>
                    <div class="todo-actions">
                        <button class="edit-btn" onclick="editTodo(${
                          todo.id
                        })">Editar</button>
                        <button class="delete-btn" onclick="deleteTodo(${
                          todo.id
                        })">Eliminar</button>
                    </div>
                `;

    todoList.appendChild(li);
  });
}
