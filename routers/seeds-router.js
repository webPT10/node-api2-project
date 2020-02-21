const express = require("express");
const db = require("../data/db");

const router = express.Router();
// creates a new sub-Router

router.use(express.json()); // in index or seeds-router?

// POST
router.post("/", (request, response) => {
  const { title, contents } = request.body;
  const newPost = { title, contents };

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
  const { text } = request.body;
  const newComment = { text };

  if (!id) {
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

router.get("/:id", (request, response) => {
  const { id } = request.params;

  db.findById(id)
    .then(post => {
      if (post) {
        response.status(201).json(post);
      } else {
        response
          .status(404)
          .json({ message: " The post with the specified ID does not exist" });
      }
    })
    .catch(error => {
      response
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (request, response) => {
  const { id } = request.params;

  db.findCommentById(id)
    .then(comment => {
      if (comment) {
        response.status(201).json(comment);
      } else {
        response
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      response
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// PUT
router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { title, contents } = request.body;

  if (!id) {
    response
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else if (!title || !contents) {
    response.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else
    db.findById(id)
      .then(post => {
        db.update(id, { title, contents })
          .then(post => {
            response.status(200).json(post);
          })
          .catch(error => {
            response.status(500).json({
              error: "Server failed to retrieve the post after changes."
            });
          });
      })
      .catch(error => {
        response
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
});

// Delete
router.delete("/:id", (request, response) => {
  const { id } = request.params;

  if (!id) {
    response
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else
    db.findById(id).then(post => {
      db.remove(id)
        .then(remove => {
          response
            .status(200)
            .json({ message: `Post with id ${id} has been removed.` });
        })
        .catch(error => {
          response
            .status(500)
            .json({ error: "The post could not be removed." });
        });
    });
  // .catch()
});

module.exports = router;