import React, { useEffect, useState } from 'react';
import { getFiles, deleteFile } from '../api';

const FileList = ({ token }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await getFiles(config);
      setFiles(data);
    };

    fetchFiles();
  }, [token]);

  const onDelete = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await deleteFile(id, config);
    setFiles(files.filter((file) => file._id !== id));
  };

  return (
    <div>
      <h3>Your Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
            <button onClick={() => onDelete(file._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
