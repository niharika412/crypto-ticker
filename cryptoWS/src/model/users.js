const connection = require('./connection');

const user={}

user.checkLogin = async (userObj)=>{
    let usersDB = await connection.getUsersCollection();
    let checkUser = await usersDB.findOne({userName:userObj.userName,password:userObj.password},{_id:0});
    if(!checkUser){
        let err = new Error("You are not registered. Please register to continue");
        err.status= 500;
        throw err;
    }
    return checkUser;
}

user.generateID = async()=>{
    let usersDB = await connection.getUsersCollection();
    let uIds = await usersDB.distinct("userId");
    let maxId = Math.max(...uIds);
    if(maxId) return maxId +1;
    else return 1111;
}

user.addUser = async (userObj)=>{
    let usersDB = await connection.getUsersCollection();
    userObj.userId= await user.generateID();
    // console.log(userObj)
    let added = await usersDB.create(userObj);
    if(added) return added;
    else{
        let err= new Error("Registration not successful");
        err.status = 500;
        throw err;
    }
}


user.getWatchList = async(userId)=>{
    let userDB = await connection.getUsersCollection();
    let watch = await userDB.aggregate([{$match:{userId:userId}},{$project:{watchList:1,userId:1}},{$unwind:'$watchList'},{$group:{_id:'$userId', items:{$addToSet:'$watchList'}}}]);
    if(watch) return watch;
    else{
        let err= new Error("Watchlist is not available");
        err.status = 500;
        throw err;
    }
}

user.addToWatchlist = async (userId,cryptoCode)=>{
    let userDB = await connection.getUsersCollection();
    let pushtoarray = await userDB.updateOne({userId:userId},{$push:{watchList:cryptoCode}});
    if(pushtoarray.nModified ==1){
        return cryptoCode+" successfully added to WatchList";
    }
    else{
        let err= new Error("Watchlist could not be updated");
        err.status = 500;
        throw err;
    }
}


user.delFromWatchlist = async(userId,code)=>{
    let userDB = await connection.getUsersCollection();
    let deleted = await userDB.updateOne({userId:userId},{$pull:{watchList:code}})
    // console.log(userId,code,deleted)
    if(deleted.nModified ==1){
        return code+" successfully deleted from WatchList";
    }
    else{
        let err= new Error("Watchlist could not be updated");
        err.status = 500;
        throw err;
    }
}

module.exports = user;