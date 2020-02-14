const express = require("express");
// router
// sub-router

const server = express();
const port = 8080;

server.use(express.json());
// server.use('/', router-imported)
// server.use('/api/posts', subRouter-imported)

server.listen(port, () => {
  console.log(`Server running @ http://localhost:${port}`);
});
