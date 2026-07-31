'use client';

import DatabaseIcon from '@mui/icons-material/Storage';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TDataNotFound = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'red',
            mb: 1.5,
          }}
        >
          <DatabaseIcon sx={{ fontSize: 24 }} />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          No data
        </Typography>
        <Typography variant="body2">No data found</Typography>
      </Box>
    </Box>
  );
};

export default TDataNotFound;
