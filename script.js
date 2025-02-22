document.addEventListener("DOMContentLoaded", function() {
    const taskText = document.getElementById("taskText");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Cargar tareas guardadas
    loadTasks();

    addTaskBtn.addEventListener("click", function() {
        const text = taskText.value.trim();
        if (text === "") return; // Evitar agregar tareas vacías

        addTaskToList(text, false);
        saveTasks(); // Guardar en LocalStorage
        taskText.value = "";
    });

    function addTaskToList(text, completed) {
        const taskContainer = document.createElement("li");
        taskContainer.classList.add("task-container");
        if (completed) taskContainer.classList.add("completed");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", function() {
            taskContainer.classList.toggle("completed");
            saveTasks();
        });

        // Texto de la tarea
        const taskLabel = document.createElement("span");
        taskLabel.classList.add("task-label");
        taskLabel.textContent = text;

        // Botón eliminar
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            taskContainer.remove();
            saveTasks();
        });

        // Agregar elementos
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskLabel);
        taskContainer.appendChild(deleteBtn);
        taskList.appendChild(taskContainer);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task-container").forEach(task => {
            const text = task.querySelector(".task-label").textContent;
            const completed = task.querySelector("input").checked;
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => addTaskToList(task.text, task.completed));
    }
});
