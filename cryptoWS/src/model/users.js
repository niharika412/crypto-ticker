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
    console.log(userObj)
    let added = await usersDB.create(userObj);

    if(added) return added;
    else{
        let err= new Error("Registration not successful");
        err.status = 500;
        throw err;
    }
}

module.exports = user;