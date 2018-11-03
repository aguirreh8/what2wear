const express = require('express');
const router = express.Router();
const Ebay = require("ebay");
const weather = require('weather-js');
const keys = require("../keys.js");

const ebay = new Ebay({
    app_id: keys.ebayKey.app_id
});

router.get('/ebay', (req, res) => {
	const params = {
        'OPERATION-NAME': 'findItemsByKeywords',
        'keywords': "mens casual winter"
    };

    ebay.get('finding', params, function(err, data) {
        if (err) throw err;
        return res.json(data.findItemsByKeywordsResponse[0].searchResult[0].item);
    })
})

router.get('/api/:zip?', (req, res) => {
	weather.find({ search: req.params.zip, degreeType: 'F' }, function(err, result) {
        if (err) console.log(err);
        return res.json(result);
    });
})

module.exports = router;

