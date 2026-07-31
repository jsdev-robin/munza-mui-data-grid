'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useMemo } from 'react';
import { useGrid } from '../../contexts/GridContext';
import TDataNotFound from './TDataNotFound';

const TNoData = () => {
  const { table, isSplit } = useGrid();

  const visibleColumns = useMemo(
    () =>
      isSplit
        ? table.getCenterVisibleLeafColumns()
        : table.getVisibleLeafColumns(),
    [table, isSplit],
  );

  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            {visibleColumns.map((column, i) => (
              <TableCell
                key={i}
                style={{
                  width: column.getSize(),
                  minWidth: column.getSize(),
                  maxWidth: column.getSize(),
                }}
              />
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <TDataNotFound />
    </>
  );
};

export default TNoData;
