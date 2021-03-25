const express = require("express");
const router = express.Router();
const axios = require('axios');
const { parse, stringify } = require('flatted');

router.get("/getTickers", async (req, res, next) => {
    try {
        let response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        // let count = 0;
        // for (var c in response.data) {

        //     count = count + 1;
        // }
        // // console.log(count);// 2
        res.send(response.data)
    } catch (err) {
        next(err);

    }
})



module.exports = router;