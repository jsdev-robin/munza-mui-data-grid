'use client';

import Box from '@mui/material/Box';
import TErrorMsg from './TErrorMsg';

const TError = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <TErrorMsg />
    </Box>
  );
};

export default TError;
