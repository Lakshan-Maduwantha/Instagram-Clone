const cloudinary = require("../configuration/cloudinary");
const Image  = require("../models/Image");
const User  = require("../models/user");
const Comment  = require("../models/Comment");

async function uploadImage(req, userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    const image = await Image.create({ public_id: upload.public_id, userId: userId });
    return image;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; 
  }
}


async function getImageUrl(public_id) {
  const image = await Image.findOne({ where: { public_id } });
  if (!image) {
    throw new Error('Image not found');
  }
  const url = cloudinary.url(public_id);
  return { url, userId: image.userId };
}

async function deleteImage(public_id) {
  try {
    const image = await Image.findOne({ where: { public_id } });
    if (!image) {
      throw new Error(`Could not find image with public_id ${public_id}`);
    }
    await Comment.destroy({ where: { imagePublicId: public_id } });
    await cloudinary.v2.uploader.destroy(public_id);
    await Image.destroy({ where: { public_id } });
    return;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
}

module.exports = {
  uploadImage,
  getImageUrl,
  deleteImage,
};
