const express = require("express");
const sequelize = require('./db/db');
const Post = require('./model/post');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/v1/post", (req, res, next) => {
    const { title, content } = req.body;
    Post.create({
        title,
        content
    })
        .then(post => res.status(201).json(post))
        .catch(error => res.send(400).json(error))

});

app.get("/api/v1/post", (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ message: 'Some Went Wrong' }))
});

app.use("/", (req, res, next) => {
    res.send("Welcome to POST Api");
});


sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Server started at ${PORT}`));
    })
    .catch(error => console.log(error))


