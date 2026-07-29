'use client';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGrid } from '../../contexts/GridContext';
import THead from './THead';

const THeader = () => {
  const { table, isSplit } = useGrid();

  return (
    <Table
      size="small"
      // sx={(theme) => ({
      //   '& .MuiTableCell-root': {
      //     border: `1px solid ${theme.palette.divider}`,
      //   },
      // })}
    >
      <TableHead>
        {(isSplit
          ? table.getCenterHeaderGroups()
          : table.getHeaderGroups()
        ).map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <THead header={header} key={header.id} />
            ))}
          </TableRow>
        ))}
      </TableHead>
    </Table>
  );
};

export default THeader;
