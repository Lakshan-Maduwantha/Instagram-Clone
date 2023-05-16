const imageService = require("../services/imageService");

async function upload(req, res) {
  const userId = req.body.userId; 
  const upload = await imageService.uploadImage(req, userId);
  return res.json({ upload });
}


async function getImage(req, res) {
  const { public_id } = req.params;

  try {
    const imageData = await imageService.getImageUrl(public_id);
    return res.json(imageData);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

async function deleteImage(req, res) {
  const { public_id } = req.params;
  await imageService.deleteImage(public_id);
  return res.sendStatus(204);
  
}

module.exports = {
  upload,
  getImage,
  deleteImage,
};
