const express = require('express');
const weather = require('weather-js');
const router = express.Router();
const path = require("path");


const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));

});

app.get("/api/:zip?", function(req, res) {
	weather.find({search: req.params.zip, degreeType: 'F'}, function(err, result) {
	  if(err) console.log(err);
	 
	  // const weatherResults = JSON.stringify(result, null, 1);
	  return res.json(result);
	});
})

app.listen(PORT, () => console.log(`Listening to ${PORT}`));
