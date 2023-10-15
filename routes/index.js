const app = require("express").Router()
const api = require("./apiroutes")
const html = require("./htmlroutes")
app.use("/api", api);
app.use("/",html)

module.exports =app;
