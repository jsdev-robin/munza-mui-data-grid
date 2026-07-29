'use client';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { flexRender } from '@tanstack/react-table';
import { GridContextProvider, useGrid } from '../contexts/GridContext';
import type { GridProps } from '../types';

const Grid = <T,>({
  columns,
  payload,
  state,
  onColumnFiltersChange,
  onPaginationChange,
  onSortingChange,
  onRowSelectionChange,
  isLoading,
  isError,
  setGlobalFilter,
  getRowCanExpand,
  renderSubComponent,
  manualPagination,
  enableRowSelection,
  isFetching,
  refetch,
  height = '65vh',
  isToolbar,
  isPagination,
  children,
  name,
}: GridProps<T>) => {
  return (
    <GridContextProvider
      payload={payload}
      columns={columns}
      state={state}
      onColumnFiltersChange={onColumnFiltersChange}
      onRowSelectionChange={onRowSelectionChange}
      onPaginationChange={onPaginationChange}
      onSortingChange={onSortingChange}
      isLoading={isLoading}
      isError={isError}
      setGlobalFilter={setGlobalFilter}
      getRowCanExpand={getRowCanExpand}
      renderSubComponent={renderSubComponent}
      manualPagination={manualPagination}
      enableRowSelection={enableRowSelection}
      isFetching={isFetching}
      refetch={refetch}
      name={name}
      height={height}
    >
      <GridInner isToolbar={isToolbar} isPagination={isPagination}>
        {children}
      </GridInner>
    </GridContextProvider>
  );
};

const GridInner = ({}: {
  children?: React.ReactNode;
  isToolbar?: boolean;
  isPagination?: boolean;
}) => {
  const { table } = useGrid();
  return (
    <Paper>
      <TableContainer component={Paper}>
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
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
        rowsPerPage={10}
        page={10}
        onPageChange={() => {
          console.log('ok');
        }}
        onRowsPerPageChange={() => {
          console.log('ok');
        }}
      />
    </Paper>
  );
};

export { Grid };
