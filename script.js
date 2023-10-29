document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskDeadline = document.getElementById("taskDeadline");
    const taskPriority = document.getElementById("taskPriority");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const taskDate = taskDeadline.value;
        const taskPri = taskPriority.value;

        if (taskText !== "" && taskDate !== "" && taskPri !== "") {
            createTask(taskText, taskDate, taskPri);
            taskInput.value = "";
            taskDeadline.value = "";
            taskPriority.value = "low";
            sortTasks();
        }
    });

    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    function createTask(text, deadline, priority) {
        const task = document.createElement("div");
        task.className = "task";
        task.innerHTML = `
            <span>${text}</span>
            <span>Deadline: ${deadline}</span>
            <span>Priority: ${priority}</span>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(task);

        const deleteButton = task.querySelector(".delete");
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(task);
            sortTasks();
        });
    }

    function sortTasks() {
        const tasks = Array.from(taskList.querySelectorAll(".task"));

        tasks.sort(function (a, b) {
            const deadlineA = new Date(a.querySelector("span:nth-child(2)").textContent.split(":")[1]);
            const deadlineB = new Date(b.querySelector("span:nth-child(2)").textContent.split(":")[1]);

            const priorityA = a.querySelector("span:nth-child(3)").textContent.split(":")[1];
            const priorityB = b.querySelector("span:nth-child(3)").textContent.split(":")[1];

            if (deadlineA < deadlineB) return -1;
            if (deadlineA > deadlineB) return 1;

            // If deadlines are the same, sort by priority (low to high)
            if (priorityA === priorityB) return 0;
            if (priorityA === "Low") return -1;
            if (priorityB === "Low") return 1;
            if (priorityA === "Medium") return -1;
            if (priorityB === "Medium") return 1;
            return -1; // Default to sorting higher priority tasks first
        });

        // Remove all tasks from the taskList and re-add them in the sorted order
        taskList.innerHTML = "";
        tasks.forEach(function (task) {
            taskList.appendChild(task);
        });
    }
});