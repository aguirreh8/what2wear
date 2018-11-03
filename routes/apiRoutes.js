const express = require('express');
const router = express.Router();
const Ebay = require("ebay");
const keys = require("../keys.js");

const ebay = new Ebay({
    app_id: keys.ebayKey.app_id
});

router.get('/ebay', (req, res) => {
	const params = {
        'OPERATION-NAME': 'findItemsByKeywords',
        'keywords': "mens casual raincoats"
    };

    ebay.get('finding', params, function(err, data) {
        if (err) throw err;
        return res.json(data.findItemsByKeywordsResponse[0].searchResult[0].item);
    })
})

module.exports = router;

