'use client';

import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useGrid } from '../../contexts/GridContext';
import { getPinStyles } from '../../utils/getPinStyles';
import TRowSkeleton from './TRowSkeleton';

const TLeftSkeleton = () => {
  const { table, isSplit, density } = useGrid();
  const theme = useTheme();

  const visibleColumns = table
    .getLeftHeaderGroups()
    .map((group) =>
      group.headers
        .filter((header) => !header.isPlaceholder && !header.subHeaders?.length)
        .map((header) => header.column),
    )
    .flat();

  return (
    <Table>
      <TableBody>
        {[...Array(20)].map((_, i) => (
          <TableRow
            key={i}
            sx={{
              '& > *': {
                borderRight: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            {visibleColumns.map((column, j) => (
              <TableCell
                key={j}
                style={{
                  width: column.getSize(),
                  minWidth: column.getSize(),
                  maxWidth: column.getSize(),
                  padding:
                    density === 'sm'
                      ? '4px'
                      : density === 'md'
                        ? '8px'
                        : '16px',
                  transition: 'padding 0.2s',
                  ...getPinStyles(column, isSplit, theme),
                }}
              >
                <TRowSkeleton column={column} i={i} j={j} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TLeftSkeleton;
