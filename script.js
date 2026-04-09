let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let score = localStorage.getItem("score") || 0;

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value;

    if (text === "") return;

    tasks.push({ text: text, done: false });
    input.value = "";

    updateData();
}

function toggleTask(index) {
    if (!tasks[index].done) {
        score = parseInt(score) + 10; // earn points
    }
    tasks[index].done = !tasks[index].done;
    updateData();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateData();
}

function updateData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("score", score);
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    document.getElementById("score").innerText = score;

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = task.done ? "completed" : "";

        li.innerHTML = `
            ${task.text}
            <br>
            <button onclick="toggleTask(${index})">✔</button>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        list.appendChild(li);
    });
}

displayTasks();