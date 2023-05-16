// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/comments", commentController.addComment);
router.get("/:public_id/comments", commentController.getCommentsByPublicId);


module.exports = router;