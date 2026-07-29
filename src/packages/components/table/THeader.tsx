'use client';

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { flexRender } from '@tanstack/react-table';
import { useGrid } from '../../contexts/GridContext';

const THeader = () => {
  const { table } = useGrid();
  return (
    <Table
      size="small"
      sx={(theme) => ({
        '& .MuiTableCell-root': {
          border: `1px solid ${theme.palette.divider}`,
        },
      })}
    >
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableCell
                key={header.id}
                style={{
                  width: header.getSize(),
                  minWidth: header.getSize(),
                  maxWidth: header.getSize(),
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
    </Table>
  );
};

export default THeader;
