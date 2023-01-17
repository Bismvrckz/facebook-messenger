const { axiosFacebookInstance } = require("../../components/axios");

const router = require("express").Router();

async function sendMessageRouterFunction(req, res, next) {
  try {
    const { recipient_id, text, access_token } = req.body;

    const resSendMessage = await axiosFacebookInstance.post(
      `/me/messages?recipient={"id":"${recipient_id}"}&messaging_type=MESSAGE_TAG&tag=HUMAN_AGENT&message={"text":"${text}"}&access_token=${access_token}`
    );

    res.send({
      status: "Success",
      httpCode: 200,
      sentMessage: resSendMessage.data,
    });
  } catch (error) {
    next(error);
  }
}

router.post("/textMessage", sendMessageRouterFunction);

module.exports = router;
