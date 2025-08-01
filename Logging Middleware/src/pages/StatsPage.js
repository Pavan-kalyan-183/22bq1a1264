import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import { getUrls } from '../utils/storage';
import { Log } from '../logger';

const StatsPage = () => {
  const [allUrls, setAllUrls] = useState([]);

  useEffect(() => {
    Log('frontend', 'info', 'page', 'StatsPage loaded.');
    setAllUrls(getUrls());
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        URL Statistics
      </Typography>
      {allUrls.length === 0 ? (
        <Typography>No URLs have been shortened yet.</Typography>
      ) : (
        <Box>
          {allUrls.map((url) => (
            <Paper key={url.shortCode} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6">
                <a href={`/${url.shortCode}`} target="_blank" rel="noopener">
                  {`${window.location.origin}/${url.shortCode}`}
                </a>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Original: <a href={url.longUrl} target="_blank" rel="noopener">{url.longUrl}</a>
              </Typography>
              <Typography><strong>Total Clicks:</strong> {url.clicks}</Typography>
              <Typography><strong>Created:</strong> {new Date(url.creationDate).toLocaleString()}</Typography>
              <Typography><strong>Expires:</strong> {new Date(url.expiryDate).toLocaleString()}</Typography>
              {url.clickDetails && url.clickDetails.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Click Details:</Typography>
                  <List dense>
                    {url.clickDetails.map((click, index) => (
                      <ListItem key={index}>
                        <ListItemText 
                          primary={`Click at ${new Date(click.timestamp).toLocaleString()}`}
                          secondary={`Source: ${click.source}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default StatsPage;
