const getAllTasks = async () => {
    try {
        const response = await fetch('https://wincacademydatabase.firebaseio.com/rahied/taken.json');
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const postTask = async (task) => {
    try {
        await fetch('https://wincacademydatabase.firebaseio.com/rahied/taken.json', { 
            method: 'POST',
            body: task
        });
    } catch (error) {
        console.error(error);
    }
};

const updateTask = async (task, taskID) => {
    try {
        await fetch(`https://wincacademydatabase.firebaseio.com/rahied/taken/${taskID}.json`, {
            method: 'PUT',
            body: task
        });
    } catch (event) {
        console.error(error);
    }
};

const deleteTask = async (taskID) => {
    try {
        await fetch(`https://wincacademydatabase.firebaseio.com/rahied/taken/${taskID}.json`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error(error);
    }
};