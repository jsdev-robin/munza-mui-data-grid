'use client';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGrid } from '../../contexts/GridContext';
import THead from './THead';

const TLeftHeader = () => {
  'use no memo';

  const { table } = useGrid();

  return (
    <Table
      style={{
        width: table.getCenterTotalSize(),
      }}
      size="small"
      sx={(theme) => ({
        '& .MuiTableCell-root': {
          border: `1px solid ${theme.palette.divider}`,
        },
      })}
    >
      <TableHead>
        {table.getLeftHeaderGroups().map((headerGroup) => (
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

export default TLeftHeader;
