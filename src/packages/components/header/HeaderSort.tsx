'use client';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { flexRender, type Header } from '@tanstack/react-table';

const HeaderSort = <T,>({ header }: { header: Header<T, unknown> }) => {
  'use no memo';

  const canSort = header.column.getCanSort();
  const sortDirection = header.column.getIsSorted();

  const tooltipTitle = !canSort
    ? ''
    : sortDirection === 'asc'
      ? 'Sorted ascending — click to sort descending'
      : sortDirection === 'desc'
        ? 'Sorted descending — click to clear sort'
        : 'Click to sort ascending';

  return (
    <Tooltip title={tooltipTitle} disableHoverListener={!canSort}>
      <Box
        onClick={header.column.getToggleSortingHandler()}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: canSort ? 'pointer' : 'default',
          userSelect: canSort ? 'none' : 'auto',
        }}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {{
          asc: <ArrowDropUpIcon fontSize="small" />,
          desc: <ArrowDropDownIcon fontSize="small" />,
        }[sortDirection as string] ?? null}
      </Box>
    </Tooltip>
  );
};

export default HeaderSort;
