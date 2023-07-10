const express = require('express');
const router = express.Router();

router.get('/posts', (req, res, next) => {
    res.status(200).json({
        post: [
            {
                title: 'First Post',
                content: 'This is the first post.'
            }
        ]
    })
})

router.post('/posts', (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message: 'Post create successfully.',
        post: {
            id: new Date().toISOString(),
            title: title,
            content: content
        }
    })
})

module.exports = router;