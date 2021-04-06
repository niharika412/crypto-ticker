const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userId: {type: String, unique:true},
    userName:{type: String, required:true},
    dob:{type:Date, required:true},
    email:{type:String,required:true, match:[/^\S+@\S+$/,"Email format not correct"]},
    password:{type:String, required:true, match:[/[a-zA-Z]*[0-9]{1}/,"1 number"]},
    watchList:[{type:String}]
},{collection:"CryptoUsers", toObject: {versionKey:false}})


let collection={};

const usersDBURL = 'mongodb://localhost:27017/usersDB';

const connectionOptions = {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}

collection.getUsersCollection= async()=>{
    try{
        let database= await mongoose.connect(usersDBURL,connectionOptions);
        let userModel = await database.model('User',userSchema);
        return userModel;
    }
    catch(error){
        let err = new Error("Could not connect to database");
        err.status=500;
        throw err;
    }
}

module.exports = collection;