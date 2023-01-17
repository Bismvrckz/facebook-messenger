const router = require("express").Router();

const postMessagesRouter = require("./post.messages");

router.use(postMessagesRouter);

module.exports = router;
