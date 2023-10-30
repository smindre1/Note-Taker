//Test File
const express = require("express");

// const { clog } = require('./middleware/clog');
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(routes);

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
