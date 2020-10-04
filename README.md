# ToDo Maker [![Latest release](https://latest-release-svg.herokuapp.com/latest-release-todo-maker.svg)](https://github.com/degrootruben/todo-maker/releases)

ToDo Maker is a webapp that lets you create your own task list! 

ToDo Maker is a project I am working on to learn the basics of Node.js, Express, HTML, CSS, Javascript, Mongoose, software development in general and all the other librariers, frameworks and tools that come along with it.

## Installing ToDo Maker
1. Clone this repo using `git clone https://github.com/degrootruben/todo-maker.git`.
2. Use `npm install`, in the repo you just cloned, to install the dependencies.
3. Remove the `.example` extension of the `.env.example` file and open the resulting `.env` file. In the file you put your MongoDB-database-URI after `DB_URI=` and put a JWT secret after `JWT_SECRET=`. Your JWT secret should be a strong password to sign your JWT's.
4. Start the project by using `node app.js` in the repo's folder.
 
## Using ToDo Maker 
⛔ These instructions should work for the `1.0.0-alpha.0` version. For future versions these instructions might not work.
### Creating an account
When you have the project running by using step 4 of [Installing ToDo Maker](#Installing-ToDo-Maker) you should be able to use ToDo Maker by going to http://localhost:8000 in your browser. You should now see the home page. Now you can create an account to make tasks. To create an account you click on "Sign up". In here you have to fill in your email, and a new password for ToDo Maker. When submitting your new account details by clicking the "Sign up" button or by pressing ENTER you should be redirected to the tasks page. 

### Adding a task
In the task page you can create tasks by filling in your task name in the "Add a task..." field. When you press ENTER or the "Add" button the task is created and should appear on your task list.

### Deleting a task
To delete a task you press the "Delete" button next to the task you want to delete.

### Searching a task
You can search a task by filling in the task you want to search in the "Search tasks..." field.

### Logging out
If you want to log out you have to be on the task page. Press the "Logout" button to log out.

### Logging in
To log in you need to open the home page by going to http://localhost:8000 in your browser. If you are redirected to the tasks page you are already logged in. If you are not redirected to the task page you can log in by pressing the "Log in" link. In this page you have to fill in your account details and log in by pressing the "Login" button or by pressing ENTER.

## The project
The idea of this project started when I finished the [Node.js Crash Course](https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU) course by The Net Ninja. This course did not only lay the foundation for this project but also sparked my interest in web development. In addition to this I used the [Node.js Auth Tutorial](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp) course by The Net Ninja to learn about authentication with JWTs in Node.js. To refresh my knowledge of HTML, CSS and JavaScript I watched some more YouTube tutorials. For other questions I mostly used StackOverflow (of course) and Reddit, they both helped me out a lot. This lead to this project at it's current state. 

To display the newest release image in the title of this README-file I had to create an [NPM package](https://www.npmjs.com/package/latest-release-svg-github). It's called [latest-release-svg-github](https://github.com/degrootruben/latest-release-svg-github), or LRSG. This is my first NPM package.

## License
This project uses the [MIT](LICENSE) license.
