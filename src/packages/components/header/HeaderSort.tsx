'use client';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import { flexRender, type Header } from '@tanstack/react-table';

const HeaderSort = <T,>({ header }: { header: Header<T, unknown> }) => {
  'use no memo';
  return (
    <Box
      onClick={header.column.getToggleSortingHandler()}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: header.column.getCanSort() ? 'pointer' : 'default',
        userSelect: header.column.getCanSort() ? 'none' : 'auto',
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {{
        asc: <ArrowDropUpIcon fontSize="small" />,
        desc: <ArrowDropDownIcon fontSize="small" />,
      }[header.column.getIsSorted() as string] ?? null}
    </Box>
  );
};

export default HeaderSort;
