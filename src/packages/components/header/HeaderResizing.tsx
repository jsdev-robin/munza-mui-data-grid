'use client';

import Box from '@mui/material/Box';
import { type Header } from '@tanstack/react-table';

const HeaderResizing = <T,>({ header }: { header: Header<T, unknown> }) => {
  'use no memo';
  const isResizing = header.column.getIsResizing();

  return (
    <Box
      className="header-resizer"
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: 5,
        bgcolor: isResizing ? 'primary.main' : 'rgba(0, 0, 0, 0.5)',
        cursor: 'col-resize',
        userSelect: 'none',
        touchAction: 'none',
        opacity: isResizing ? 1 : 0,
      }}
    />
  );
};

export default HeaderResizing;
