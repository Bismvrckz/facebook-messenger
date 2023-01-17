const router = require("express").Router();

const getUsersRouter = require("./get.users");

router.use(getUsersRouter);

module.exports = router;
