'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useMemo, useState } from 'react';
import { useGrid } from '../../contexts/GridContext';

const ToolbarColumns = () => {
  'use no memo';
  const { table, setIsSplit, isSplit } = useGrid();
  const [searchTerm, setSearchTerm] = useState('');
  const visibleColumns = useMemo(() => {
    return table
      .getAllLeafColumns()
      .filter((column) => !['rowNumber'].includes(column.id))
      .filter((column) =>
        column.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [searchTerm, table]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        height: '100%',
        py: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1.5,
          pb: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2">
          Columns ({table.getAllLeafColumns().length})
        </Typography>

        <Button
          size="small"
          onClick={() => {
            table.resetColumnVisibility();
            setSearchTerm('');
          }}
        >
          Restore
        </Button>
      </Box>
      <Box sx={{ px: 1.5 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search columns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          px: 1.5,
          flex: 1,
          overflowY: 'auto',
        }}
      >
        {visibleColumns.length > 0 ? (
          <React.Fragment>
            {visibleColumns.map((column) => (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    size="small"
                    checked={column.getIsVisible()}
                    onChange={(_, checked) => {
                      console.log(checked);
                      column.toggleVisibility(Boolean(checked));
                    }}
                  />
                }
                label={
                  <Typography variant="body2" noWrap>
                    {column.id
                      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </Typography>
                }
              />
            ))}
          </React.Fragment>
        ) : (
          <Typography
            variant="body2"
            align="center"
            sx={{
              px: 2,
              py: 4,
              color: 'text.secondary',
            }}
          >
            No columns found
          </Typography>
        )}
      </Box>
      <Grid container spacing={1.5} sx={{ px: 1.5 }}>
        <Grid size={6}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={() => {
              table.resetColumnPinning();
              setIsSplit(false);
            }}
          >
            Reset Pinning
          </Button>
        </Grid>

        <Grid size={6}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={() => table.resetColumnSizing()}
          >
            Reset Sizing
          </Button>
        </Grid>

        <Grid size={12}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            disabled={!table.getIsSomeColumnsPinned()}
            onClick={() => setIsSplit(!isSplit)}
          >
            {isSplit ? 'Exit Split View' : 'Enter Split View'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ToolbarColumns;
