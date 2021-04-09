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


user.getWatchList = async(userId)=>{
    let watchList= await dbLayer.getWatchList(userId);
    if (watchList) return watchList
}

user.updateWatchList= async(userId,code)=>{
    let updated= await dbLayer.addToWatchlist(userId,code);
    if (updated) return updated
}

user.deleteWatchList = async(userId,code)=>{
    let updated= await dbLayer.delFromWatchlist(userId,code);
    if (updated) return updated
}

module.exports = user;