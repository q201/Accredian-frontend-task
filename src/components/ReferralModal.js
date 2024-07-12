
// src/components/ReferralModal.js
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import '../styles/toast.css'; // Import CSS file for toast notification styling

const ReferralModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: '',
  });
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false); // State for toast visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');  // Clear the error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!formData.referrerName || !formData.referrerEmail || !formData.refereeName || !formData.refereeEmail) {
      setError('All fields are required.');
      return;
    }
    handleClose();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds

    try {
      const response = await fetch('https://accredian-backend-task-9n0x.onrender.com/refer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit referral');
      }

      const result = await response.json();
      console.log('Referral submitted:', result);

      // Close the modal and reset the form
     
      setFormData({
        referrerName: '',
        referrerEmail: '',
        refereeName: '',
        refereeEmail: '',
      });
      setError('');

      // Show toast notification for success
     
    } catch (error) {
      console.error('Error submitting referral:', error);
      setError('Failed to submit referral.');
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Refer a Friend
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="referrerName"
                  value={formData.referrerName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Email"
                  name="referrerEmail"
                  type="email"
                  value={formData.referrerEmail}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Friend's Name"
                  name="refereeName"
                  value={formData.refereeName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Friend's Email"
                  name="refereeEmail"
                  type="email"
                  value={formData.refereeEmail}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography color="error">{error}</Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Snackbar open={showToast} autoHideDuration={3000} onClose={() => setShowToast(false)}>
        <Alert onClose={() => setShowToast(false)} severity="success" sx={{ width: '100%', bgcolor: 'secondary.main', color: 'white' }}>
          Referral submitted successfully!
          <div className="toast-progress">
            <div className="toast-progress-bar"></div>
          </div>
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReferralModal;
