// FILE: src/utils/storage.js
// This file handles all interactions with the browser's localStorage.

import { Log } from '../logger';

const URLS_KEY = 'shortenedUrls';

// Function to get all URLs from localStorage
export const getUrls = () => {
  try {
    const urls = localStorage.getItem(URLS_KEY);
    Log('frontend', 'info', 'utils', 'Fetched URLs from localStorage.');
    return urls ? JSON.parse(urls) : [];
  } catch (error) {
    Log('frontend', 'error', 'utils', `Error parsing URLs from localStorage: ${error.message}`);
    return [];
  }
};

// Function to save a new URL
export const saveUrl = (urlData) => {
  try {
    const urls = getUrls();
    urls.push(urlData);
    localStorage.setItem(URLS_KEY, JSON.stringify(urls));
    Log('frontend', 'info', 'utils', `Saved new URL with shortcode: ${urlData.shortCode}`);
  } catch (error) {
    Log('frontend', 'error', 'utils', `Error saving URL to localStorage: ${error.message}`);
  }
};

// Function to find a URL by its shortcode
export const findUrlByShortCode = (shortCode) => {
  const urls = getUrls();
  const foundUrl = urls.find(url => url.shortCode === shortCode);
  if (foundUrl) {
    Log('frontend', 'info', 'utils', `Found URL for shortcode: ${shortCode}`);
  } else {
    Log('frontend', 'warn', 'utils', `No URL found for shortcode: ${shortCode}`);
  }
  return foundUrl;
};

// Function to record a click on a short URL
export const recordClick = (shortCode) => {
  try {
    const urls = getUrls();
    const urlIndex = urls.findIndex(url => url.shortCode === shortCode);
    if (urlIndex !== -1) {
      urls[urlIndex].clicks += 1;
      const clickData = {
        timestamp: new Date().toISOString(),
        source: document.referrer || 'Direct',
        location: 'Unknown',
      };
      if (!urls[urlIndex].clickDetails) {
        urls[urlIndex].clickDetails = [];
      }
      urls[urlIndex].clickDetails.push(clickData);
      localStorage.setItem(URLS_KEY, JSON.stringify(urls));
      Log('frontend', 'info', 'utils', `Recorded click for shortcode: ${shortCode}`);
    }
  } catch (error) {
    Log('frontend', 'error', 'utils', `Error recording click in localStorage: ${error.message}`);
  }
};