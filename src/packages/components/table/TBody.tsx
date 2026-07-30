'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useGrid } from '../../contexts/GridContext';
import TCell from './TCell';

const TBody = () => {
  'use no memo';
  const { table, isSplit, renderSubComponent } = useGrid();
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
          <React.Fragment key={row.id}>
            <TableRow selected={row.getIsSelected()}>
              {(isSplit
                ? row.getCenterVisibleCells()
                : row.getVisibleCells()
              ).map((cell) => (
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
      </TableBody>
    </Table>
  );
};

export default TBody;
