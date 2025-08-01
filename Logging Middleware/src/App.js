import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';
import RedirectPage from './pages/RedirectPage';

// A simple dark theme for Material UI
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:shortCode" element={<RedirectPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;