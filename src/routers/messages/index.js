const router = require("express").Router();

const postMessagesRouter = require("./post.messages");
const postImageMessagesRouter = require("./post.image");
const postDocumentMessagesRouter = require("./post.document");

router.use(postMessagesRouter);
router.use(postImageMessagesRouter);
router.use(postDocumentMessagesRouter);

module.exports = router;
