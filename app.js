const express = require("express");
const sequelize = require('./db/db');
const postRouter = require('./routes/post');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/post', postRouter);

app.use("/", (req, res, next) => {
    res.send("Welcome to POST Api");
});


sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Server started at ${PORT}`));
    })
    .catch(error => console.log(error))


