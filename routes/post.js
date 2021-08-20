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


router.put("", (req, res, next) => {
    const { id, title, content } = req.body;
    if (!id) res.status(404).json({ message: `Post not found` });

    Post.findOne({
        where: {
            id
        }
    })
        .then(result => result.update({ title, content }))
        .then(result => result.save())
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error));
});


router.delete("/:id", (req, res, next) => {
    const id = req.params['id'];
    if (!id) res.status(404).json({ message: `Post not found` });
    Post.findOne({ where: { id } })
        .then(result => {
            if (result)
                return result.destroy()
            return res.status(404).json({ message: `Post not found` });
        })
        .then(() => res.status(200).json({ message: `Post with id ${id} is deleted successfully` }))
        .catch(error => res.status(500).json(error));

});


module.exports = router;