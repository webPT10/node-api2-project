const express = require("express");
const db = require("../data/db");

const router = express.Router();
// creates a new sub-Router

router.use(express.json()); // in index or seeds-router?

// POST
router.post("/", (request, response) => {
  const { title, contents } = request.body;
  const newPost = { title, contents, id: Date.now() };

  if (!title || !contents) {
    response.status(400).json({
      error: "failure",
      message: "Please provide title and contents for the post."
    });
  } else
    db.insert(newPost)
      .then(post => {
        response.status(201).json(post);
      })

      .catch(error => {
        response.status(500).json({
          error: "failure",
          message:
            "There was a terrible error while saving the comment to the database."
        });
      });
});

router.post("/:id/comments", (request, response) => {
  const { id } = request.params;
  const { text, post_id } = request.body;
  const newComment = { text, post_id, id: Date.now() };

  if (!post_id) {
    response
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else if (!text) {
    response
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else
    db.findById(id).then(post => {
      if (post) {
        db.insertComment(newComment)
          .then(comment => {
            response.status(201).json(comment);
          })
          .catch(error => {
            response.status(500).json({
              error:
                "There was an error while saving the comment to the database."
            });
          });
      }
    });
});

// GET
router.get("/", (request, response) => {
  db.find()
    .then(posts => {
      response.status(201).json(posts);
    })
    .catch(error => {
      response
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/", (request, response) => {});

router.get("/", (request, response) => {});

// PUT
router.put("/", (request, response) => {});

// Delete
router.delete("/", (request, response) => []);

module.exports = router;

// const { id } = request.params;
// const comment = request.body;

// if(!comment['post_id']){
//     response.status(404).json({ message: "The post with the specified ID does not exist." })
// }
// else if (!comment.text) {
//     response.status(400).json({ message: 'Please provide Text for the comment.'})
// }
// else
//     db.findById(id)
//         .then(post => {
//             if(post){
//                 db.insertComment(comment)
//                     .then(promise => {
//                         response.status(201).json({ message: 'Success - comment added.'})
//                     })
//                     .catch(error => {
//                         response.status(500).json({ "Fail - server failed to add comment."})
//                     })
//             }
//             else response.status(400).json({ message: `Fail - Could not find post with ID ${id}`})
//         })
