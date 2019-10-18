const taskFormEl = document.querySelector('#add-task-form');
const taskFieldEl = document.querySelector('#add-task-field');
const taskFormButton = document.querySelector('#add-task-button');
const tasksDiv = document.querySelector('#tasks');

const renderToDOM = async () => {
    tasksDiv.innerHTML = '';
    try {
        const data = await getAllTasks();
        const taskIDs = Object.keys(data);
        const tasks = Object.values(data);
        
        tasks.forEach((task, index) => {
            // create new div for task inside of tasks div
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            tasksDiv.appendChild(taskDiv);

            // create checkbox for task
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            taskDiv.appendChild(checkbox);

            // add event listener to checkbox, to set task to done/to do
            checkbox.addEventListener('change', async function(event) {
                let taskUpdated;
                if (event.target.checked) {
                    taskUpdated = { body: task.body, done: true };
                } else {
                    taskUpdated = { body: task.body, done: false };
                }
                const taskUpdatedJSON = JSON.stringify(taskUpdated);
                await updateTask(taskUpdatedJSON, taskIDs[index]);
                renderToDOM();
            });

            // create paragraph for task body
            const taskText = document.createElement('p');
            taskText.textContent = task.body;
            taskDiv.appendChild(taskText);

            // add event listener to paragraph, to set task to done/to do
            taskText.addEventListener('click', async function(event) {
                let taskUpdated;
                if (task.done) {
                    taskUpdated = { body: task.body, done: false };
                } else {
                    taskUpdated = { body: task.body, done: true };
                }
                const taskUpdatedJSON = JSON.stringify(taskUpdated);
                await updateTask(taskUpdatedJSON, taskIDs[index]);
                renderToDOM();
            });

            // check if task is completed, if so: check checkbox and strike through text
            if (task.done) {
                checkbox.checked = true;
                taskText.style.textDecoration = 'line-through';
            }

            // add image to delete task
            const imgDeleteButton = document.createElement('img');
            imgDeleteButton.setAttribute('src', './trash-delete-icon.jpg');
            imgDeleteButton.setAttribute('alt', 'Remove Task');
            imgDeleteButton.classList.add('btn-delete');
            taskDiv.appendChild(imgDeleteButton);

            // add event listener to image, to delete task
            imgDeleteButton.addEventListener('click', async function(event) {
                await deleteTask(taskIDs[index]);                
                renderToDOM();
            });
        })
    } catch (error) {
        console.error(error);
    }
};

taskFormEl.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    if (event.target.task.value) {
        const task = { body: event.target.task.value, done: false };
        const taskJSON = JSON.stringify(task);
        await postTask(taskJSON);
    
        event.target.task.value = '';
        renderToDOM();
    }
});

renderToDOM();