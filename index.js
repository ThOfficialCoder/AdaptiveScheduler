let tasks = [];

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

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

function addTask() {
    const taskForm = document.getElementById('taskForm');
    const task = {
        task: taskForm.task.value,
        time: taskForm.time.value,
        duration: taskForm.duration.value
    };
    tasks.push(task);
    taskForm.reset();
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <p><strong>${task.task}</strong></p>
            <p>${task.time}</p>
            <p>${task.duration}</p>
            <button class="delete-button" data-index=index="${index}">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            tasks.splice(index, 1);
            displayTasks();
        })
    })
}

displayTasks();

updateDateTime();
setInterval(updateDateTime, 1000);