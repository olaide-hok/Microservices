const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const commmentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commmentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commmentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content});

    commmentsByPostId[req.params.id] = comments;

    await axios.post('http:localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
        },
    });

    res.status(201).send(comments);
});

app.post('/events', (req, res) => {
    console.log('Event recieved', req.body.type);

    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});
