'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useGrid } from '../../contexts/GridContext';
import TCell from './TCell';
import { TLeftCellPin } from './TLeftCellPin';

const TLeftBody = () => {
  'use no memo';
  const { table, renderSubComponent } = useGrid();
  return (
    <Table
      size="small"
      sx={{
        '& .MuiTableCell-root': {
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <TableBody>
        {table.getTopRows().map((row) => (
          <TLeftCellPin key={row.id} row={row} table={table} />
        ))}
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <TableRow selected={row.getIsSelected()}>
              {row.getLeftVisibleCells().map((cell) => (
                <TCell key={cell.id} cell={cell} />
              ))}
            </TableRow>
            {renderSubComponent && row.getIsExpanded() && (
              <TableRow>
                <TableCell colSpan={row.getVisibleCells().length}>
                  {renderSubComponent({ row })}
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
        {table.getBottomRows().map((row) => (
          <TLeftCellPin key={row.id} row={row} table={table} />
        ))}
      </TableBody>
    </Table>
  );
};

export default TLeftBody;
