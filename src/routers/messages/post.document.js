const { axiosFacebookInstance } = require("../../components/axios");
const {
  preSendDocumentMessageFunction,
} = require("../../components/middleware");
const { saveDocument } = require("../../components/multer");

const router = require("express").Router();

async function postDocumentRouterFunction(req, res, next) {
  try {
    const { recipient_id, access_token, file_extension } = req.query;
    const { file_document_id } = req;
    const { SERVER_URL } = process.env;

    const resSendDocumentMessage = await axiosFacebookInstance.post(
      `/me/messages?recipient={id: ${recipient_id}}&message={'attachment':{'type':'file','payload':{'url':'${SERVER_URL}/public/messages/documents/${file_document_id}.${file_extension}'}}}&access_token=${access_token}&messaging_type=MESSAGE_TAG&tag=HUMAN_AGENT`
    );

    const { data } = resSendDocumentMessage;

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
  "/documentMessage",
  preSendDocumentMessageFunction,
  saveDocument.single("file"),
  postDocumentRouterFunction
);

module.exports = router;
