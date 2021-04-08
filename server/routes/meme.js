const { Router } = require('express');
const express = require('express')
const router = express.Router()

const Meme = require('../models/meme')

//return last 100 memes
router.get('/memes', (req, res, next) => {
    Meme.find({}).limit(100).sort({ id: 1})
        .then(data => {
            if (data.length == 0)
                res.status(500).send(data)
            else
                res.status(200).send(data)
        })
})

//To get a meme by id
router.get('/memes/:id', (req, res, next) => {
    Meme.findOne({ _id: req.params.id })
        .then(data => res.send(data))
        .catch(() => res.status(404).send("Not Found"));
})

//To post a new meme
router.post('/memes', (req, res, next) => {
    Meme.exists({ name: req.body.name, caption: req.body.caption, url: req.body.url })
        .then(data => {
            if (!data) {
                Meme.create(req.body)
                    .then(data => {
                        res.status(201).json({
                            id: data.id
                        })
                    })
                    .catch(() =>{
                        res.status(400).send('Bad request')
                    })
            }
            else
                res.status(409).send('conflict')
        })
        .catch(() => {
            res.status(400).send('Bad request')
        })
})

//To update a meme
router.patch('/memes/:id', (req, res, next) => {
    Meme.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => Meme.findOne({ _id: req.params.id }))
        .then(data => {
            if (req.body.name === undefined) {
                res.status(400).send("Bad Request");
            }
            else {
                res.status(200).json({
                    caption: data.caption,
                    url: data.url
                })
            }
        })
        .catch(() => {
            res.status(404).send("Not Found");
        });
})

//To delete a meme
router.delete('/memes/:id', (req, res, next) => {
    Meme.findByIdAndRemove({ _id: req.params.id })
        .then(data => res.send(data))
        .catch(() => {
            res.status(404).send("Not Found");
        });
})

module.exports = router;