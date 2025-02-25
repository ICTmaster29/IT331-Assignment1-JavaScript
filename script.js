// Task manager class to handle all functionalities
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.initializeElements();
        this.setupEventListeners();
        this.renderTasks();
    }

    // Get DOM elements
    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addButton = document.getElementById('addButton');
        this.taskList = document.getElementById('taskList');
    }

    // Setup event listeners
    setupEventListeners() {
        this.addButton.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    }

    // Load tasks from localStorage
    loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Add new task
    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText
            };
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
            this.taskInput.value = '';
        }
    }

    // Delete task
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    // Render all tasks
    renderTasks() {
        this.taskList.innerHTML = '';
        
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.textContent = task.text;
            li.addEventListener('click', () => this.deleteTask(task.id));
            this.taskList.appendChild(li);
        });
    }
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});