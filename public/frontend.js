document.addEventListener("DOMContentLoaded", () => {
    // Get app data and set webtitle and other data according to this data
    let webTitle = {};
    fetch("/get-data", {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json()).then(data => {
        webTitle = data.name;
        console.log("Name of app:", webTitle);
        document.title = webTitle.toString();
        document.querySelector("#page-banner .title").textContent = webTitle;
    }).catch(err => console.log(err));

    // Load tasks into DOM upon loading page
    let todoList = [{}];
    fetch("/get-list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json()).then(data => {
        todoList = data.slice(0);
    }).catch(err => console.log("Error when loading tasks into DOM", err));
    console.log("Data gotten from server and copied into todoList variable:", todoList);

    const todoListDOM = document.querySelector("#task-list ul");

    if (todoList.length > 0) {
        todoList.forEach(task => {
            const li = document.createElement("li");
            const taskName = document.createElement("span");
            const deleteButton = document.createElement("span");

            taskName.classList.add("name");
            taskName.setAttribute("dbID", task.id);
            deleteButton.classList.add("delete");

            console.log("Task title: " + task.title);
            taskName.textContent = task.title;
            deleteButton.textContent = "Delete";

            li.appendChild(taskName);
            li.appendChild(deleteButton);

            todoListDOM.appendChild(li);
        })
    }

    // Delete tasks
    todoListDOM.addEventListener("click", e => {
        if (e.target.className == "delete") {
            const li = e.target.parentElement;
            todoListDOM.removeChild(li);
        }
    });

    // Add tasks to database when form is submitted
    const addForm = document.forms["add-task"];
    const nameField = addForm.querySelector("input[type='text']");
    const placeholder = nameField.getAttribute("placeholder");

    let counter = 0;
    addForm.addEventListener('submit', e => {

        if (nameField.value != "") {
            e.preventDefault();
            nameField.setAttribute("placeholder", placeholder);

            // Add classes
            console.log("Task title:", nameField.value);

            fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: nameField.value })
            }).then(response => response.html()).then(data => {
                console.log("Got response from server upon posting form data");
            }).catch((error) => {
                console.error("Error while posting form data to server:", error);
            });

            nameField.value = "";
        } else {
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

