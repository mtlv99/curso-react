import * as React from 'react';
import { ImageList, ImageListItem } from '@mui/material';

export const ImageGallery = ({ imageUrls = [] }) => {
  if (imageUrls.length === 0) return null;

  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      {imageUrls?.map((imageUrl, index) => (
        <ImageListItem key={imageUrl}>
          <img
            src={`${imageUrl}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${imageUrl.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={`Imagen de la nota núm ${index}`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
