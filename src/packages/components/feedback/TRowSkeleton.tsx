'use client';

import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import type { Column } from '@tanstack/react-table';

const PREDEFINED_WIDTHS = [60, 100, 80, 50, 70, 40, 90];

const TRowSkeleton = ({
  column,
  i,
  j,
}: {
  column: Column<unknown, unknown>;
  i: number;
  j: number;
}) => {
  return (
    <>
      {['select'].includes(column.id) ? (
        <CircularProgress size={16} />
      ) : ['actions', 'pin', 'drag-handle', 'rowNumber'].includes(column.id) ? (
        <Skeleton variant="text" sx={{ width: '100%', height: 16 }} />
      ) : (
        <Skeleton
          variant="text"
          sx={{
            height: 16,
            width: `${PREDEFINED_WIDTHS[(i + j) % PREDEFINED_WIDTHS.length]}px`,
          }}
        />
      )}
    </>
  );
};

export default TRowSkeleton;
