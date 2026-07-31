'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useGrid } from '../../contexts/GridContext';
import TDataNotFound from './TDataNotFound';

const TLeftNoData = () => {
  const { table } = useGrid();

  return (
    <Table
      size="small"
      style={{
        width: table.getCenterTotalSize(),
      }}
      sx={{
        '& .MuiTableCell-root': {
          borderBottom: '1px solid',
          borderColor: 'transparent',
        },
      }}
    >
      <TableBody>
        <TableRow>
          {table.getLeftVisibleLeafColumns().map((column, i) => (
            <TableCell
              key={i}
              style={{
                width: column.getSize(),
                minWidth: column.getSize(),
                maxWidth: column.getSize(),
              }}
            >
              <TDataNotFound />
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TLeftNoData;
