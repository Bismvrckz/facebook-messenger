async function preSendImageMessageFunction(req, res, next) {
  try {
    const { recipient_id } = req.query;

    req.file_image_id = `${recipient_id}-${new Date().getTime()}`;
    next();
  } catch (error) {
    next(error);
  }
}

async function preSendDocumentMessageFunction(req, res, next) {
  try {
    const { recipient_id } = req.query;

    req.file_document_id = `${recipient_id}-${new Date().getTime()}`;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  preSendImageMessageFunction,
  preSendDocumentMessageFunction,
};
