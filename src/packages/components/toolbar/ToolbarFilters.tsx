'use client';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import type { Column } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import DebouncedInput from '../../../components/ui/debounced-input';
import { useGrid } from '../../contexts/GridContext';

const ToolbarFilter = <T,>({ column }: { column: Column<T, unknown> }) => {
  'use no memo';

  const sortedUniqueValues = useMemo(() => {
    return column.getCanFilter()
      ? {
          id: column.id
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, (char) => char.toUpperCase()),
          uniqueValues: Array.from(column.getFacetedUniqueValues().keys()),
        }
      : null;
  }, [column]);

  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            transition: 'all 0.2s',
            '&:hover': { bgcolor: 'action.hover' },
            transform: open ? 'rotate(90deg)' : 'none',
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </Box>
        <Typography variant="body2" noWrap>
          {sortedUniqueValues?.id && sortedUniqueValues.id.length > 15
            ? `${sortedUniqueValues.id.slice(0, 15)}...`
            : sortedUniqueValues?.id}
        </Typography>
      </Box>
      <Collapse in={open}>
        <Box sx={{ p: 1.5, pr: 0 }}>
          <datalist id={column.id + 'list'}>
            {sortedUniqueValues?.uniqueValues.map((val: string, i: number) => (
              <option value={val} key={i} />
            ))}
          </datalist>
          <DebouncedInput
            fullWidth
            size="small"
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
            slotProps={{
              htmlInput: { list: column.id + 'list' },
            }}
            disabled={filterVariant === undefined}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

const ToolbarFilters = () => {
  'use no memo';
  const { table, globalFilter, setGlobalFilter } = useGrid();

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          pb: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="subtitle1">Filters</Typography>
      </Box>

      <Box sx={{ px: 1 }}>
        <DebouncedInput
          size="small"
          type="search"
          value={String(globalFilter)}
          onChange={(value) => {
            setGlobalFilter?.(String(value));
          }}
          placeholder="Search all columns..."
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          flex: 1,
          px: 1.5,
          overflowY: 'auto',
        }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <React.Fragment key={headerGroup.id}>
            {headerGroup.headers
              .filter(
                (header) =>
                  !['rowNumber', 'select', 'pin', 'actions'].includes(
                    header.column.id,
                  ),
              )
              .map((header) => (
                <ToolbarFilter key={header.id} column={header.column} />
              ))}
          </React.Fragment>
        ))}
      </Box>

      <Box sx={{ px: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<RestartAltIcon fontSize="small" />}
          onClick={() => table.setColumnFilters([])}
        >
          Reset Filters
        </Button>
      </Box>
    </Box>
  );
};

export default ToolbarFilters;
