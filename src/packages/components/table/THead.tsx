'use client';

import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import { type Header } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import { useGrid } from '../../contexts/GridContext';
import { getPinStyles } from '../../utils/getPinStyles';
import HeaderFilter from '../header/HeaderFilter';
import HeaderMenu from '../header/HeaderMenu';
import HeaderResizing from '../header/HeaderResizing';
import HeaderSort from '../header/HeaderSort';

interface THeadProps<T> {
  header: Header<T, unknown>;
}

const THead = <T,>({ header }: THeadProps<T>) => {
  'use no memo';
  const { isSplit } = useGrid();

  const style: CSSProperties = {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: header.getSize(),
    minWidth: header.getSize(),
    maxWidth: header.getSize(),
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...getPinStyles(header.column, isSplit),
  };

  return (
    <TableCell
      key={header.id}
      component="th"
      colSpan={header.colSpan}
      style={style}
      sx={{
        position: 'relative',
        '&:hover .header-resizer': {
          opacity: 1,
        },
      }}
    >
      {header.isPlaceholder ? null : (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              p: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <HeaderSort header={header} />
            <HeaderMenu header={header} />
          </Box>
          <HeaderFilter column={header.column} />
        </Box>
      )}
      <HeaderResizing header={header} />
    </TableCell>
  );
};

export default THead;
