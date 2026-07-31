'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useGrid } from '../../contexts/GridContext';
import TError from '../feedback/TError';
import TNoData from '../feedback/TNoData';
import TSkeleton from '../feedback/TSkeleton';
import TCell from './TCell';
import { TCellPin } from './TCellPin';

const TBody = () => {
  'use no memo';
  const { table, isSplit, renderSubComponent, isLoading, isError } = useGrid();

  return isLoading ? (
    <TSkeleton />
  ) : isError ? (
    <TError />
  ) : table.getRowModel().rows.length === 0 ? (
    <TNoData />
  ) : (
    <Table
      size="small"
      style={{
        width: table.getCenterTotalSize(),
      }}
      sx={{
        '& .MuiTableCell-root': {
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <TableBody>
        {table.getTopRows().map((row) => (
          <TCellPin key={row.id} row={row} table={table} isSplit={isSplit} />
        ))}
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
        {table.getBottomRows().map((row) => (
          <TCellPin key={row.id} row={row} table={table} isSplit={isSplit} />
        ))}
      </TableBody>
    </Table>
  );
};

export default TBody;
