const express = require("express");
const app = express();

app.get("/", function (req, res) {
	res.send("Test hello!");
});

app.listen(3030);
