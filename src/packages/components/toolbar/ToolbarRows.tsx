'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGrid } from '../../contexts/GridContext';

const ToolbarRows = () => {
  'use no memo';
  const { table, density } = useGrid();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: '100%',
        py: 1,
      }}
    >
      <Box
        sx={{
          px: 1,
          pb: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="subtitle1">Rows</Typography>
      </Box>
      <Box
        sx={{
          px: 1,
          flex: 1,
          gap: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 1,
          }}
        >
          Row Density
        </Typography>
        <Stack spacing={1}>
          <Button
            size="small"
            variant={density === 'sm' ? 'contained' : 'outlined'}
            onClick={() => table.setDensity('sm')}
          >
            Small
          </Button>

          <Button
            size="small"
            variant={density === 'md' ? 'contained' : 'outlined'}
            onClick={() => table.setDensity('md')}
          >
            Default
          </Button>

          <Button
            size="small"
            variant={density === 'lg' ? 'contained' : 'outlined'}
            onClick={() => table.setDensity('lg')}
          >
            Large
          </Button>
        </Stack>
      </Box>
      <Box sx={{ px: 1 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => table.resetRowPinning()}
        >
          Reset Row Pinning
        </Button>
      </Box>
    </Box>
  );
};

export default ToolbarRows;
