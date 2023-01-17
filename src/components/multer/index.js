const multer = require("multer");
const path = require("path");
const appRoot = require("app-root-path");

const saveImage = multer({
  storage: multer.diskStorage({}),
});
