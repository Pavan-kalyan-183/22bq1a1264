import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import URLForm from '../components/URLForm';
import URLTable from '../components/URLTable';

const ShortenerPage = () => {
  const [recentUrls, setRecentUrls] = useState([]);

  const handleNewUrl = (newUrl) => {
    setRecentUrls(prevUrls => [newUrl, ...prevUrls].slice(0, 5));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Create a Short URL
      </Typography>
      <URLForm onNewUrl={handleNewUrl} />
      {recentUrls.length > 0 && (
        <URLTable urls={recentUrls} title="Recently Created URLs" />
      )}
    </Container>
  );
};

export default ShortenerPage;