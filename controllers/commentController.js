const commentService = require("../services/commentService");
const { verifyToken } = require('../jwtUtils');

const addComment = async (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token); 

    const comment = await commentService.addComment({
      text: req.body.text,
      imagePublicId: req.body.imagePublicId,
      token: token 
    });

    res.status(201).json({ comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to add comment.' });
  }
};

const getCommentsByPublicId = async (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token); 

    const comments = await commentService.getCommentsByPublicId(
      req.params.public_id,
      decodedToken.userId 
    );
    res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get comments.' });
  }
};

module.exports = {
  addComment,
  getCommentsByPublicId
};