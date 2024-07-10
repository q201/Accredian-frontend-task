// src/App.js
import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import HeroSection from './components/HeroSection';
import ReferralModal from './components/ReferralModal';

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <HeroSection handleOpen={handleOpen} />
      <ReferralModal open={open} handleClose={handleClose} />
    </>
  );
}

export default App;
