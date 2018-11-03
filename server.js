const express = require('express');
const bodyParser = require("body-parser");
require("dotenv").config();
const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require("./routes/apiRoutes.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(htmlRoutes);
app.use(apiRoutes);



app.listen(PORT, () => console.log(`Listening to ${PORT}`));