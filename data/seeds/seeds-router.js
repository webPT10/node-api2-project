const express = require('express');
const db = require('../db');

const router = express.Router();
// creates a new sub-Router

// POST
router.post('/api/posts', (request, response) => {
    const { title, contents } = request.body;
    const newPost = { title, contents, id: Date.now() };
    
    if(!title || !contents){
        response.status(400).json({
            errorMessage: "Title & Contents needed for the post."
        })
    }
    db.insert(newPost)
    .then(post => {
        response.status(201).json(post)
    })
    .catch(error => {
        response.status(500).json({
            error: error,
            errorMessage: "There was a terrible error while saving the post to the database."
        })
    })
})

router.post('/', (request, response) => {

})

// GET
router.get('/', (request, response) => {

})

router.get('/', (request, response) => {

})

router.get('/', (request, response) => {

})

// PUT
router.put('/', (request, response) => {

})

// Delete
router.delete('/', (request, response) => [

])

module.exports = router;