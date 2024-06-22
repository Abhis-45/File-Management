import React, { useState } from 'react';
import { uploadFile } from '../api';

const FileUpload = ({ token }) => {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => setFile(e.target.files[0]);

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await uploadFile(formData, config);
      alert('File uploaded successfully');
    } catch (error) {
      alert('Error uploading file');
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
