'use client';

import CloudOffIcon from '@mui/icons-material/CloudOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const TErrorMsg = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const reload = () => {
    if (isOnline) window.location.reload();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CloudOffIcon sx={{ fontSize: 52, color: 'error.main', mb: 3 }} />
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: 'error.dark', mb: 1.5 }}
      >
        Failed to Load Data
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          mb: 3,
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        {isOnline
          ? 'Something went wrong. Please try refreshing the page.'
          : "You're currently offline. Please check your internet connection."}
      </Typography>
      <Button onClick={reload} variant="outlined" disabled={!isOnline}>
        {isOnline ? 'Refresh Page' : 'No Connection'}
      </Button>
    </Box>
  );
};

export default TErrorMsg;
