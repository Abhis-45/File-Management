const express = require('express');
const { upload, uploadFile, getUserFiles, deleteFile } = require('../controllers/fileController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadFile);
router.get('/', protect, getUserFiles);
router.delete('/:id', protect, deleteFile);

module.exports = router;