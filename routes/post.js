const express = require('express');
const Post = require('../model/post');

const router = express.Router();

router.post("", (req, res, next) => {
    const { title, content } = req.body;
    Post.create({
        title,
        content
    })
        .then(post => res.status(201).json(post))
        .catch(error => res.send(400).json(error))

});

router.get("", (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ message: 'Some Went Wrong' }))
});


module.exports = router;