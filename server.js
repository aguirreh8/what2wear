const express = require('express');
const weather = require('weather-js');
const router = express.Router();
const path = require("path");
const keys = require("./keys")
const Ebay = require("ebay");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
const ebay = new Ebay({
    app_id: process.env.EBAY_APP_ID
});
let weatherType = "";

app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index-design.html"));

});

app.get("/api/:zip?", function(req, res) {
    weather.find({ search: req.params.zip, degreeType: 'F' }, function(err, result) {
        if (err) console.log(err);
        // weatherType = result[0].current.skytext;
        // console.log(result);
        // console.log(weatherType);
        return res.json(result);
    });
})

app.get("/ebay", function(req, res) {
    const params = {
        'OPERATION-NAME': 'findItemsByKeywords',
        'keywords': "mens casual raincoats"
    };

    ebay.get('finding', params, function(err, data) {
        if (err) throw err;
        return res.json(data.findItemsByKeywordsResponse[0].searchResult[0].item);
    })
})

app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "about.html"));
})

app.listen(PORT, () => console.log(`Listening to ${PORT}`));