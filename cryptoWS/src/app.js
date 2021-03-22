const express= require('express');
const bodyParser = require('body-parser');
const router = require("./routes/routing");
const errorLogger = require("./utilities/errorLogger");
const requestLogger = require("./utilities/requestLogger");
const cors= require('cors')
const app= express();

app.use(cors())
app.use(bodyParser.json());

app.use(requestLogger);
app.use("/",router);
app.use(errorLogger);

app.listen(3000);
console.log("Server listening on port 3000");


module.exports=app;