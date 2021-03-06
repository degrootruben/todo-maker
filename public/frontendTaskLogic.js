document.addEventListener("DOMContentLoaded", () => {
    // Get the task list
    const todoListDOM = document.querySelector("#task-list ul");

    // Get user email and put it in welcome message
    getUserEmail();
    async function getUserEmail() {
        const welcomeMessage = document.querySelector(".welcome-message");
        const response = await fetch("/api/v1/get-useremail");
        const email = await response.json();
        welcomeMessage.innerHTML = `Logged in as: ${email}`;
    }

    // Load tasks into DOM upon loading page
    getTasks();
    async function getTasks() {
        try {
            const response = await fetch("api/v1/get-tasks");
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
        
                    taskName.textContent = task.taskName;
                    deleteButton.textContent = "Delete";
        
                    li.appendChild(taskName);
                    li.appendChild(deleteButton);
        
                    todoListDOM.appendChild(li);
                })
            }
        } catch(err) {
            console.log(err);
        }
    }
    
    // Post tasks to server when form is submitted
    const addForm = document.forms["add-task"];
    const nameField = addForm.querySelector("input[type='text']");
    const placeholder = nameField.getAttribute("placeholder");
    
    let counter = 0;
    addForm.addEventListener('submit', async e => {
        console.log(placeholder);

        if (nameField.value != "") {
            try {
                e.preventDefault();
                nameField.setAttribute("placeholder", placeholder);
                
                console.log(`Trying to post task "${nameField.value}" to server`);
                
                // Get UserID
                const userIDResponse = await fetch("/api/v1/get-userid", { method: "GET", headers: { "Content-Type": "application/json" } });
                const userID = await userIDResponse.json();

                const data = { "taskName": nameField.value, "userID": userID };

                await fetch("/api/v1/create-task", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(res => {
                    getTasks();
                    return res;
                }).catch(err => console.log("Error while posting task to server", err));
                
                nameField.value = "";
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("Namefield is empty, please enter a task name");

            e.preventDefault();

            nameField.setAttribute("placeholder", "Please enter a task title...");
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

            fetch("/api/v1/" + id, { method: "DELETE" }).then(response => {
                console.log("Deleted task with ID of", id);
                getTasks();
            }).catch(err => console.log("Error while trying to send delete request of task to server", err));
        }
    });
    
    // Hide tasks when checkbox is checked
    const hideBox = document.querySelector("#hide");

    hideBox.addEventListener("change", e => {
        if (hideBox.checked) {
            todoListDOM.style.display = "none";
        } else {
            todoListDOM.style.display = "initial";
        }
    });

    // Search tasks through search bar
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
});