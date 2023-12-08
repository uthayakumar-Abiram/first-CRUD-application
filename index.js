
// The require('dotenv').config() statement is commonly used in Node.js applications to load environment variables from a file named .env. This helps in managing configuration settings for your application, such as API keys, database connection strings, or other sensitive information, without hardcoding them in your code.
// require('dotenv'): This imports the dotenv module into your Node.js application. The dotenv module is a zero-dependency module that loads environment variables from a .env file into process.env.
// .config(): This method is called on the dotenv module to read the .env file and set  key-value the environment variables in the process.env object.

//dotenv is a built in module
// env use for manage our api ,database driver etc securly
//require is a built-in function in Node.js used to include external modules or libraries in your code.
require('dotenv').config();

const routes = require('./routes/routes');
const routes2 = require('./routes/routes2');
// The express module is a popular web application framework for Node.js that simplifies the process of building web applications by providing a set of features and tools for routing, middleware, and handling HTTP requests and responses.
const express = require('express');
//mongoose. This allows the code to use the functionalities provided by the Mongoose library, which is commonly used for interacting with MongoDB databases in a Node.js environment
const mongoose = require('mongoose');
// After calling require('dotenv').config(), you can access these values in your code using process.env.API_KEY and process.env.DATABASE_URL.
const mongoString = process.env.DATABASE_URL;
//mongoose is a library for working with mongoose
mongoose.connect(mongoString);

const database = mongoose.connection;
// display error
database.on('error', (error) => {
    console.log(error)
})

//its a event its going lisien this event one time
// expected out put "Database Connected"
database.once('connected', () => {
    console.log('Database Connected');
})
// This executes the express function by calling it with an empty arguments list "()".
//  The actual code to the function is found in node_modules/express/lib/express.
//  js , named createApplication , and 
// it is that function that we got a reference to in the first line.
const app = express();
//The express. json() function is a middleware function used in index. js applications to parse incoming JSON data from HTTP requests
app.use(express.json());

// app.listen(3000, () => { ... }): This line tells the index.js application to start listening for incoming HTTP requests on port 3000.
//(3000, () => { ... }): The first argument, 3000, is the port number on which the server will listen. The second argument is a callback function that will be executed once the server is successfully started.
// console.log(Server Started at ${3000}): Inside the callback function, it logs a message to the console, indicating that the server has started. The ${3000} is using a template string to insert the actual port number into the string.

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
// i created two end points for routes
app.use('/api', routes)
app.use('/api2', routes2)




//  a function that will have all the access for requesting an object, 
// responding to an object, and moving to the next
//  middleware function in the application request-response cycle.