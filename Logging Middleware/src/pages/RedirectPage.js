import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findUrlByShortCode, recordClick } from '../utils/storage';
import { Log } from '../logger';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Log('frontend', 'info', 'page', `RedirectPage attempting to process shortcode: ${shortCode}`);
    const urlData = findUrlByShortCode(shortCode);

    if (urlData) {
      // Check if the URL has expired
      if (new Date(urlData.expiryDate) < new Date()) {
        Log('frontend', 'warn', 'page', `Attempted to access expired shortcode: ${shortCode}`);
        navigate('/?error=expired');
        return;
      }

      // Record the click before redirecting
      recordClick(shortCode);
      
      Log('frontend', 'info', 'page', `Redirecting shortcode ${shortCode} to ${urlData.longUrl}`);
      // Redirect to the original URL
      window.location.href = urlData.longUrl;
    } else {
      Log('frontend', 'error', 'page', `Shortcode not found: ${shortCode}. Navigating to stats page.`);
      // If shortcode doesn't exist, redirect to the main page with an error
      navigate('/?error=notfound');
    }
  }, [shortCode, navigate]);

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Redirecting...</Typography>
      </Box>
    </Container>
  );
};

export default RedirectPage;