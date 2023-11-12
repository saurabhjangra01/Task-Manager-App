const express = require("express");
const app = express();

const tasks = require('./routes/router-tasks');
const mongoLib = require('./db/connect');
require('dotenv').config();
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');


// middlewares
// app.use(express.static('./'));      // this is used to serve our static files
app.use(express.json());            // we get data in req.body because of this


// routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandler);



// connect to server
const port = process.env.PORT || 3000;

(async function () {
    try{
        // initialize database connections
        db = await mongoLib.connectMongo(process.env.MONGO_URI);
        console.log("######################  Mongo connected  ######################");

        // initialize express server
        app.listen(port, ()=> {
            console.log("######################  Express connected  ######################");
            console.log("Server Listening on PORT ", port, "...");
        });
    }
    catch(err){
        console.log("error connecting to the server ############ ", err);
    }
})();