import React, { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import { Log } from '../logger';
import { saveUrl, findUrlByShortCode } from '../utils/storage';

const URLForm = ({ onNewUrl }) => {
  const [longUrl, setLongUrl] = useState('');
  const [customShortCode, setCustomShortCode] = useState('');
  const [validity, setValidity] = useState(30);
  const [error, setError] = useState('');

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    Log('frontend', 'info', 'component', 'Submit button clicked on URLForm.');

    if (!longUrl || !longUrl.startsWith('http')) {
      const msg = 'Please enter a valid URL (e.g., https://example.com).';
      setError(msg);
      Log('frontend', 'warn', 'component', `Validation failed: ${msg}`);
      return;
    }

    let shortCodeToUse = customShortCode.trim();
    if (shortCodeToUse) {
      if (findUrlByShortCode(shortCodeToUse)) {
        const msg = `Custom shortcode "${shortCodeToUse}" is already taken.`;
        setError(msg);
        Log('frontend', 'warn', 'component', `Shortcode collision: ${msg}`);
        return;
      }
    } else {
      shortCodeToUse = generateShortCode();
      Log('frontend', 'info', 'component', `Generated new shortcode: ${shortCodeToUse}`);
    }

    const creationDate = new Date();
    const expiryDate = new Date(creationDate.getTime() + (validity || 30) * 60000);

    const newUrlData = {
      longUrl,
      shortCode: shortCodeToUse,
      creationDate: creationDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      clicks: 0,
      clickDetails: [],
    };

    saveUrl(newUrlData);
    onNewUrl(newUrlData);

    setLongUrl('');
    setCustomShortCode('');
    setValidity(30);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <TextField
          required
          fullWidth
          label="Enter Long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <TextField
          fullWidth
          label="Optional: Custom Shortcode"
          value={customShortCode}
          onChange={(e) => setCustomShortCode(e.target.value)}
        />
        <TextField
          fullWidth
          label="Optional: Validity (in minutes, default 30)"
          type="number"
          value={validity}
          onChange={(e) => setValidity(parseInt(e.target.value, 10))}
        />
        <Button type="submit" variant="contained" size="large">
          Shorten URL
        </Button>
      </Stack>
    </Box>
  );
};

export default URLForm;