// Todo array to store all todos
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Function to add new todo
function addTodo(e) {
    e.preventDefault();

    const todo = {
        id: generateId(),
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        priority: document.getElementById('priority').value,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.unshift(todo);
    saveTodos();
    renderTodos();
    e.target.reset();
}

// Function to delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Function to toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}

// Function to edit todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    
    const titleElement = todoElement.querySelector('.todo-title');
    const descriptionElement = todoElement.querySelector('.todo-description');
    
    const titleInput = document.createElement('input');
    titleInput.value = todo.title;
    titleInput.className = 'edit-input';
    
    const descriptionInput = document.createElement('textarea');
    descriptionInput.value = todo.description;
    descriptionInput.className = 'edit-input';
    
    titleElement.replaceWith(titleInput);
    descriptionElement.replaceWith(descriptionInput);
    
    const saveBtn = todoElement.querySelector('.edit-btn');
    saveBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
        </svg>
    `;
    saveBtn.onclick = () => saveTodoEdit(id, titleInput.value, descriptionInput.value);
}

// Function to save todo edit
function saveTodoEdit(id, newTitle, newDescription) {
    todos = todos.map(todo => 
        todo.id === id 
            ? { ...todo, title: newTitle, description: newDescription }
            : todo
    );
    saveTodos();
    renderTodos();
}

// Function to filter todos
function filterTodos() {
    const priority = document.getElementById('filterPriority').value;
    const date = document.getElementById('filterDate').value;
    
    renderTodos(priority, date);
}

// Function to render todos
function renderTodos(priorityFilter = 'all', dateFilter = '') {
    const todoList = document.getElementById('todoList');
    let filteredTodos = [...todos];
    
    if (priorityFilter !== 'all') {
        filteredTodos = filteredTodos.filter(todo => todo.priority === priorityFilter);
    }
    
    if (dateFilter) {
        filteredTodos = filteredTodos.filter(todo => todo.date === dateFilter);
    }
    
    todoList.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <div class="todo-header">
                <h3 class="todo-title">${todo.title}</h3>
                <div class="todo-actions">
                    <button class="todo-btn complete-btn" onclick="toggleTodo('${todo.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </button>
                    <button class="todo-btn edit-btn" onclick="editTodo('${todo.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                        </svg>
                    </button>
                    <button class="todo-btn delete-btn" onclick="deleteTodo('${todo.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="todo-info">
                <p class="todo-description">${todo.description}</p>
                <div class="todo-meta">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        ${todo.date}
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        ${todo.time}
                    </span>
                    <span class="priority-badge priority-${todo.priority}">
                        ${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Event listeners
document.getElementById('todoForm').addEventListener('submit', addTodo);

// Initial render
renderTodos();