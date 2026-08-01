let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let score = parseInt(localStorage.getItem('score')) || 0;

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const scoreDisplay = document.getElementById('score');
const progressFill = document.getElementById('progress');
const levelTitle = document.getElementById('level-title');

function updateStats() {
  scoreDisplay.innerText = score;
  const currentLevel = Math.floor(score / 100) + 1;
  const progressPercent = score % 100;
  
  progressFill.style.width = `${progressPercent}%`;
  levelTitle.innerText = `Lvl ${currentLevel}`;

  localStorage.setItem('score', score);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        ${!task.completed ? `<button class="btn-done" onclick="completeTask(${index})">✔</button>` : ''}
        <button class="btn-delete" onclick="deleteTask(${index})">✖</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  updateStats();
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

window.completeTask = (index) => {
  if (!tasks[index].completed) {
    tasks[index].completed = true;
    score += 10; // Gain 10 pts per task
    
    // Confetti effect!
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });

    renderTasks();
  }
};

window.deleteTask = (index) => {
  tasks.splice(index, 1);
  renderTasks();
};

// Initial Render
renderTasks();