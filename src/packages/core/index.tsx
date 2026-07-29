'use client';

import Box from '@mui/material/Box';
import TMain from '../components/table/TMain';
import { GridContextProvider } from '../contexts/GridContext';
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
  return (
    <Box>
      <TMain />
    </Box>
  );
};

export { Grid };
