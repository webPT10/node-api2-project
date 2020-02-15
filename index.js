const express = require("express");
const seedsRouter = require('./routers/seeds-router') // router
const seedsPostsRouter = require('./routers/seeds-postsRouter'); // sub-router

const server = express();
const port = 8000;

server.use(express.json()); // in index or seeds-router?
server.use('/api/posts', seedsRouter)
// server.use('/api/posts', seedsPostsRouter)

server.get("/", (request, response) => {
  response.send("Nil Satis Nisi Optimum");
});

server.listen(port, () => {
  console.log(`Server running @ http://localhost:${port}`);
});
