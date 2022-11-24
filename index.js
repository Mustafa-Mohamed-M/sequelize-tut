const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 5001;

const todoRoutes = require("./api/routes/todo");
const userRoutes = require("./api/routes/user");
app.use("/", todoRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
    console.log(`Todo server is listening on port ${port}.`);
});