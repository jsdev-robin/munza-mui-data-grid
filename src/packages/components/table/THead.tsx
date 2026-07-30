'use client';

import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { flexRender, type Header } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import { useGrid } from '../../contexts/GridContext';
import { getPinStyles } from '../../utils/getPinStyles';

interface THeadProps<T> {
  header: Header<T, unknown>;
}

const THead = <T,>({ header }: THeadProps<T>) => {
  'use no memo';
  const { isSplit } = useGrid();
  const style: CSSProperties = {
    padding: 0,
    position: 'relative',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: header.getSize(),
    minWidth: header.getSize(),
    maxWidth: header.getSize(),
    ...getPinStyles(header.column, isSplit),
  };

  return (
    <TableCell key={header.id} style={style} component="th">
      <Box
        sx={{
          padding: '4px 4px',
        }}
      >
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        <TextField
          size="small"
          type="date"
          sx={{
            '& .MuiOutlinedInput-root': {
              height: 28,
            },
            '& .MuiOutlinedInput-input': {
              padding: '4px 8px',
              fontSize: 13,
            },
          }}
        />
      </Box>
    </TableCell>
  );
};

export default THead;
