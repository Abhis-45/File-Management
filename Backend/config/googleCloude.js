const { Storage } = require('@google-cloud/storage');
let multer = require('multer');
const storage = new Storage({
  projectId: 'filemanagementapp',
  keyFilename: 'wosQRcUfWzf9CG9C9',
});

const bucket = storage.bucket('filemanagementapp');

module.exports = bucket;