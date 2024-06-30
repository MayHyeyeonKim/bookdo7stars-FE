import React, { useState } from 'react';
import { Button } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CloudinaryContext, Image } from 'cloudinary-react';

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const CloudImageUpload = ({ onUpload }) => {
  const [image, setImage] = useState('');

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloudName: CLOUDNAME, uploadPreset: UPLOADPRESET, sources: ['local', 'url', 'camera'] }, (error, result) => {
      if (result.event === 'success') {
        setImage(result.info.secure_url);
        onUpload(result.info.secure_url);
      }
    });
  };

  return (
    <CloudinaryContext cloudName="your_cloud_name">
      <Button variant="contained" onClick={uploadWidget}>
        Upload Image
      </Button>
      {image && (
        <div>
          <Image publicId={image} width="500" crop="scale" />
        </div>
      )}
    </CloudinaryContext>
  );
};

export default CloudImageUpload;
