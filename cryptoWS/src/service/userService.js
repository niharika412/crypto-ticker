const dbLayer = require("../model/users");

let user={}


user.loginUser = async(userObj)=>{
    let loggedin= await dbLayer.checkLogin(userObj);
    if(loggedin)return loggedin;
}

user.addUser = async(userObj) =>{
    let toAdd= await dbLayer.addUser(userObj);
    if (toAdd) return toAdd
}

module.exports = user;