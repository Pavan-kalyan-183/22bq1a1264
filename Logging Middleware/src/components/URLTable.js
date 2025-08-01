import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Typography
} from '@mui/material';

const URLTable = ({ urls, title }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ p: 2 }}>{title}</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Expires At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url.shortCode}>
              <TableCell sx={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <Link href={url.longUrl} target="_blank" rel="noopener">
                  {url.longUrl}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/${url.shortCode}`} target="_blank" rel="noopener">
                  {`${window.location.origin}/${url.shortCode}`}
                </Link>
              </TableCell>
              <TableCell>{url.clicks}</TableCell>
              <TableCell>{new Date(url.expiryDate).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default URLTable;