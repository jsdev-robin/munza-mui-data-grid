'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { useGrid } from '../../contexts/GridContext';
import TCell from './TCell';

const TBody = () => {
  const { table, isSplit } = useGrid();
  return (
    <Table
      size="small"
      style={{
        width: table.getCenterTotalSize(),
      }}
      sx={(theme) => ({
        '& .MuiTableCell-root': {
          border: `1px solid ${theme.palette.divider}`,
        },
      })}
    >
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {(isSplit
              ? row.getCenterVisibleCells()
              : row.getVisibleCells()
            ).map((cell) => (
              <TCell key={cell.id} cell={cell} />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TBody;
