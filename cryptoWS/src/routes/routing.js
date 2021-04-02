const express = require("express");
const router = express.Router();
const axios = require('axios');
const { parse, stringify } = require('flatted');

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

module.exports = router;