const jwt = require('jsonwebtoken');
const Comment = require("../models/Comment");
const Image = require("../models/Image");

const verifyToken = (token) => {
  try {
    console.log('Token:', token); 
    const decodedToken = jwt.verify(token, 'lmw');
    return decodedToken;
  } catch (error) {
    console.error('Error:', error.message); 
    throw new Error('Invalid token');
  }
};


const addComment = async (commentData) => {
  try {
    const { text, imagePublicId, token } = commentData;

    const decodedToken = verifyToken(token);
    const userId = decodedToken.userId;

    const image = await Image.findOne({ where: { public_id: imagePublicId } });
    if (!image) {
      throw new Error("Image not found");
    }

    const comment = await Comment.create({ text, imagePublicId, userId });
    return comment;
  } catch (error) {
    throw error;
  }
};

const getCommentsByPublicId = async (publicId, token) => {
  try {
    const decodedToken = verifyToken(token);
    const userId = decodedToken.userId;

    const comments = await Comment.findAll({
      where: { imagePublicId: publicId, userId: userId },
    });
    return comments;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addComment,
  getCommentsByPublicId,
};
