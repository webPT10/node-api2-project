const express = require("express");
const seedsRouter = require('./routers/seeds-router') // router
// const seedsPostsRouter = require('./routers/seeds-postsRouter'); // sub-router

const server = express();
const port = process.env.PORT || 8000;

server.use(express.json()); // in index or seeds-router?
server.use('/api/posts', seedsRouter)
// server.use('/api/posts', seedsPostsRouter)

server.get("/", (request, response) => {
  response.status(200).json({
    message: process.env.SECRET_MESSAGE || "Why, Hello there.",
  })
});

server.listen(port, () => {
  console.log(`Server running @ http://localhost:${port}`);
});
