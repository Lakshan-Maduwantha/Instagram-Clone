const express = require("express");
const imageController = require("../controllers/imageController");
const uploader = require("../configuration/multer");

const router = express.Router();

router.post("/upload", uploader.single("file"), imageController.upload);
router.get("/image/:public_id", imageController.getImage);
router.delete("/image/:public_id", imageController.deleteImage);

module.exports = router;
