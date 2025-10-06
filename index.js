let tasks = [];

// Load saved tasks from localStorage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks = savedTasks.map(t => {
    if (!t.status) t.status = "pending"; // Ensure old tasks have status
    return t;
});

// Update date and time in header
function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const time = now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentDateTime').textContent = date + " | " + time;
}

// Add task from form
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskForm = document.getElementById('taskForm');
    const task = {
        task: taskForm.task.value,
        time: taskForm.time.value,
        duration: taskForm.duration.value,
        status: taskForm.status.value || "pending"
    };
    tasks.push(task);
    taskForm.reset();
    displayTasks();
});

// Display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item', task.status); // Add status as class
        taskItem.innerHTML = `
            <p><strong>${task.task}</strong></p>
            <p>${task.time}</p>
            <p>${task.duration} min</p>
            <p>Status: ${task.status}</p>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });

    // Attach delete button functionality
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            tasks.splice(index, 1);
            displayTasks();
        });
    });
}

// Initial render
displayTasks();
updateDateTime();
setInterval(updateDateTime, 1000);

// Update tasks every 30 seconds
setInterval(displayTasks, 30000);