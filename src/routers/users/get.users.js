const {
  getInboxController,
} = require("../../components/facebookGraphAPI/get.inbox");

const router = require("express").Router();

async function getUserInbox(req, res, next) {
  try {
    const { page_access_token } = req.query;

    const { data, error } = await getInboxController({ page_access_token });

    if (error) throw error;

    res.send({
      status: "Success",
      httpCode: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
}

router.get("/inbox", getUserInbox);

module.exports = router;
