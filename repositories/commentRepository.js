const Comment = require("../models/Comment");

const createComment = async (commentData) => {
  try {
    const comment = await Comment.create(commentData);
    return comment;
  } catch (error) {
    throw error;
  }
};

const getCommentsByPublicId = async (publicId) => {
  try {
    const comments = await Comment.findAll({
      where: { imagePublicId: publicId },
    });
    return comments;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createComment,
  getCommentsByPublicId,
};
