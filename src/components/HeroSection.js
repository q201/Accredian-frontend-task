// src/components/HeroSection.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const HeroSection = ({ handleOpen }) => {
  return (
    <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'primary.main', color: 'white' }}>
      <Typography variant="h2" gutterBottom>
        Refer & Earn
      </Typography>
      <Typography variant="h5" gutterBottom>
        Invite your friends and earn rewards!
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Refer Now
      </Button>
    </Box>
  );
};

export default HeroSection;
