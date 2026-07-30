'use client';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useGrid } from '../../contexts/GridContext';

const ToolbarSettings = () => {
  const { table, setIsSplit, gridWrapperRef, isFetching, refetch } = useGrid();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(document.fullscreenElement === gridWrapperRef.current);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, [gridWrapperRef]);

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all settings to default?',
    );
    if (!confirmed) return;
    table.resetColumnPinning();
    table.resetRowPinning();
    table.resetColumnVisibility();
    table.resetColumnOrder();
    table.resetColumnSizing();
    table.setDensity('md');
    setIsSplit(false);
    window.alert('Settings have been reset to default.');
  };

  const handleToggleFullscreen = () => {
    if (!gridWrapperRef.current) return;
    if (!document.fullscreenElement) {
      gridWrapperRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

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
        <Typography variant="subtitle1">Settings</Typography>
      </Box>

      <Box
        sx={{
          px: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={handleToggleFullscreen}
          startIcon={
            isFullscreen ? (
              <FullscreenExitIcon fontSize="small" />
            ) : (
              <FullscreenIcon fontSize="small" />
            )
          }
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>

        <Button
          variant="outlined"
          size="small"
          onClick={() => refetch?.()}
          disabled={isFetching}
          startIcon={
            <RefreshIcon
              fontSize="small"
              sx={
                isFetching
                  ? {
                      animation: 'spin 1s linear infinite',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    }
                  : undefined
              }
            />
          }
        >
          {isFetching ? 'Refreshing...' : 'Refresh Data'}
        </Button>

        <Button variant="outlined" size="small" onClick={handleReset}>
          Reset to Default
        </Button>
      </Box>
    </Box>
  );
};

export default ToolbarSettings;
