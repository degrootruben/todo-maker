document.addEventListener("DOMContentLoaded", () => {
    // Load tasks into DOM upon loading page
    const todoListDOM = document.querySelector("#task-list ul");

    getTasks();
    async function getTasks() {
        const response = await fetch("/get-tasks");
        const data = await response.json();

        todoListDOM.innerHTML = "";
        if (data.length > 0) {
            console.log("Loading tasks into DOM");

            data.forEach(task => {
                const li = document.createElement("li");
                const taskName = document.createElement("span");
                const deleteButton = document.createElement("span");
    
                taskName.classList.add("name");
                taskName.setAttribute("dbID", task._id);
                deleteButton.classList.add("delete");
    
                taskName.textContent = task.title;
                deleteButton.textContent = "Delete";
    
                li.appendChild(taskName);
                li.appendChild(deleteButton);
    
                todoListDOM.appendChild(li);
            })
        }
    }
    
    
    // Add tasks to database when form is submitted
    const addForm = document.forms["add-task"];
    const nameField = addForm.querySelector("input[type='text']");
    const placeholder = nameField.getAttribute("placeholder");
    
    let counter = 0;
    addForm.addEventListener('submit', async e => {

        if (nameField.value != "") {
            e.preventDefault();
            nameField.setAttribute("placeholder", placeholder);
            
            console.log(`Trying to post task "${nameField.value}" to server`);
            
            const data = { "title": nameField.value, "time": Date.now() };

            await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(getTasks()).catch(err => console.log("Error while posting task to server", err));
            
            nameField.value = " ";
        } else {
            console.log("Namefield is empty, please enter a task name");
            e.preventDefault();
            nameField.setAttribute("placeholder", "Please enter a book title...");
            counter++;
            if (counter == 5) {
                alert("Enter a task title to add a task to the list!");
                counter = 0;
            }
            return;
        }
    });
    
    // Delete tasks
    todoListDOM.addEventListener("click", e => {
        if (e.target.className == "delete") {
            const id = e.target.parentNode.firstElementChild.getAttribute("dbID");

            fetch("/" + id, { method: "DELETE" }).then(response => {
                console.log("Deleted task with ID of", id);
                getTasks();
            }).catch(err => console.log("Error while trying to send delete request of task to server", err));
        }
    });
    
    // Hide books when checkbox is checked
    const hideBox = document.querySelector("#hide");

    hideBox.addEventListener("change", e => {
        if (hideBox.checked) {
            todoListDOM.style.display = "none";
        } else {
            todoListDOM.style.display = "initial";
        }
    });

    // Search books through search bar
    const searchBar = document.forms["search-tasks"].querySelector("input");

    searchBar.addEventListener("keyup", e => {
        const term = searchBar.value.toLowerCase().replace(/'/g, "");
        const tasksInDOM = todoListDOM.getElementsByTagName("li");

        Array.from(tasksInDOM).forEach(task => {
            const title = task.firstElementChild.textContent;

            if (title.toLowerCase().replace(/'/g, "").indexOf(term) != -1) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }

        });
    });

    // Display contact or about tab
    const tabs = document.querySelector(".tabs");
    const panels = document.querySelectorAll(".panel");

    tabs.addEventListener("click", e => {
        if (e.target.tagName == "LI") {
            const targetPanel = document.querySelector(e.target.dataset.target);

            panels.forEach(panel => {
                if (panel == targetPanel) {
                    panel.classList.add("active");
                } else {
                    panel.classList.remove("active");
                }
            })
        }
    });
});

