const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 8000;
const usersRoute = require("./routes/bankUsers.route");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/api/bank", usersRoute);

app.listen(port, () => console.log("app running at " + port));