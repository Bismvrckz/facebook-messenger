const { axiosFacebookInstance } = require("../../components/axios");
const { preSendImageMessageFunction } = require("../../components/middleware");
const { saveImage } = require("../../components/multer");

const router = require("express").Router();

async function sendImageMessageRouterFunction(req, res, next) {
  try {
    const { recipient_id, access_token, image_extension } = req.query;
    const { file_image_id } = req;
    const { SERVER_URL } = process.env;

    const resSendImageMessage = await axiosFacebookInstance.post(
      `/me/messages?recipient={id: ${recipient_id}}&message={'attachment':{'type':'image','payload':{'url':'${SERVER_URL}/public/messages/images/${file_image_id}.${image_extension}'}}}&access_token=${access_token}&messaging_type=MESSAGE_TAG&tag=HUMAN_AGENT`
    );

    const { data } = resSendImageMessage;

    res.send({
      status: "Success",
      httpCode: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
}

router.post(
  "/imageMessage",
  preSendImageMessageFunction,
  saveImage.single("image"),
  sendImageMessageRouterFunction
);

module.exports = router;
