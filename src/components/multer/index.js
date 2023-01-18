const multer = require("multer");
const path = require("path");
const appRoot = require("app-root-path");

const saveImage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(appRoot.path, "public", "messages", "images"));
    },
    filename: function (req, file, cb) {
      cb(null, `${req.file_image_id}.${req.query.image_extension}`);
    },
  }),
  limits: {
    fileSize: 26214400,
  },
});

const saveDocument = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(appRoot.path, "public", "messages", "documents"));
    },
    filename: function (req, file, cb) {
      cb(null, `${req.file_document_id}.${req.query.file_extension}`);
    },
  }),
  limits: {
    fileSize: 26214400,
  },
});

module.exports = { saveImage, saveDocument };
