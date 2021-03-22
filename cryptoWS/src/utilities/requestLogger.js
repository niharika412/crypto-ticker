const fs = require('fs');

let requestLogger= (req,res,next)=>{
    fs.appendFile("./requestLogger.txt", new Date()+" - " + req.method + " "+req.url+" \n", (error)=>{
        if(error) return next(err);
        else next();
    });
}

module.exports = requestLogger;