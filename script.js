const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");
const taskCount = document.getElementById("task-count");
const clearAllBtn = document.getElementById("clear-all");

// Event listeners
addBtn.addEventListener("click", addTask);

inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function(e) {
    // If the click is on the li itself or the text inside it
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateStats();
    } 
    // If the click is on the span or the i (trash icon) inside the span
    else if (e.target.tagName === "SPAN" || e.target.closest("span")) {
        // Find the closest li and remove it
        const li = e.target.closest("li");
        li.style.transform = "translateX(50px)";
        li.style.opacity = "0";
        setTimeout(() => {
            li.remove();
            saveData();
            updateStats();
        }, 300);
    }
}, false);

clearAllBtn.addEventListener("click", function() {
    const checkedTasks = document.querySelectorAll('li.checked');
    checkedTasks.forEach(task => {
        task.style.transform = "translateX(50px)";
        task.style.opacity = "0";
        setTimeout(() => {
            task.remove();
            saveData();
            updateStats();
        }, 300);
    });
});

function addTask() {
    if (inputBox.value.trim() === '') {
        // Subtle shake animation if input is empty
        const row = document.querySelector('.row');
        row.style.animation = "shake 0.4s ease";
        setTimeout(() => row.style.animation = "", 400);
        return;
    }
    
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    
    let span = document.createElement("span");
    span.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    li.appendChild(span);
    
    inputBox.value = "";
    saveData();
    updateStats();
}

function saveData() {
    localStorage.setItem("futuristicTodo", listContainer.innerHTML);
}

function showTask() {
    const saved = localStorage.getItem("futuristicTodo");
    if (saved) {
        listContainer.innerHTML = saved;
    } else {
        // Add some default techy tasks for the first time load
        const defaultTasks = ["Initialize core systems", "Calibrate UI components", "Deploy to production server"];
        defaultTasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task;
            let span = document.createElement("span");
            span.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            li.appendChild(span);
            listContainer.appendChild(li);
        });
        saveData();
    }
    updateStats();
}

function updateStats() {
    const total = document.querySelectorAll('li').length;
    const completed = document.querySelectorAll('li.checked').length;
    const remaining = total - completed;
    
    if (total === 0) {
        taskCount.innerText = "No tasks initialized";
    } else {
        taskCount.innerText = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
    }
}

// Add shake keyframe dynamically for input validation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
    }
`;
document.head.appendChild(style);

// Initialize application state
showTask();
