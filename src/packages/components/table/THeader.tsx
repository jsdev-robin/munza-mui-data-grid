'use client';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGrid } from '../../contexts/GridContext';
import THead from './THead';

const THeader = () => {
  'use no memo';

  const { table, isSplit } = useGrid();

  return (
    <Table
      style={{
        width: table.getCenterTotalSize(),
      }}
      size="small"
      sx={{
        '& .MuiTableCell-root': {
          borderRight: '1px solid',
          borderTop: '1px solid',
          borderBottom: '1.5px solid',
          borderLeft: isSplit ? '1px solid' : undefined,
          borderColor: 'divider',
        },
      }}
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
