const bucket = require('../config/googleCloud');
const File = require('../models/File');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadFile = async (req, res) => {
  const blob = bucket.file(uuidv4() + '-' + req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => res.status(500).json({ message: err.message }));

  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    const file = await File.create({
      user: req.user._id,
      name: req.file.originalname,
      url: publicUrl,
    });
    res.status(201).json(file);
  });

  blobStream.end(req.file.buffer);
};

const getUserFiles = async (req, res) => {
  const files = await File.find({ user: req.user._id });
  res.json(files);
};

const deleteFile = async (req, res) => {
  const file = await File.findById(req.params.id);
  if (file.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  await bucket.file(file.name).delete();
  await file.remove();
  res.json({ message: 'File deleted' });
};

module.exports = { upload, uploadFile, getUserFiles, deleteFile };
