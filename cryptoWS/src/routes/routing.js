const express = require("express");
const router = express.Router();
const axios = require('axios');
const { parse, stringify } = require('flatted');
const userService = require('../service/userService');

router.get("/getTickers", async (req, res, next) => {
    try {
        let response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        res.send(response.data)
    } catch (err) {
        next(err);

    }
})

router.get("/ordersHistory/:currency", async(req,res,next)=>{
    try{
        let response= await axios.get('https://api.wazirx.com/api/v2/depth?market='+req.params.currency);
        res.send(response.data)
    }catch (err) {
        next(err);

    }
})

router.get("/marketHistory/:currency", async(req,res,next)=>{
    try{
        let response= await axios.get('https://api.wazirx.com/api/v2/trades?market='+req.params.currency);
        res.send(response.data)
    }catch(err){
        next(err);
    }
})

router.post("/register",async(req,res,next)=>{
    try{
        let userObj = req.body;
        let registration = await userService.addUser(userObj);
        res.json(registration)
    }
    catch(er){
        next(er);
    }
})

router.post("/login", async(req,res,next)=>{
    try{
        let userObj = req.body;
        let login = await userService.loginUser(userObj);
        res.json(login)
    }
    catch(er){
        next(er);
    }
})
module.exports = router;