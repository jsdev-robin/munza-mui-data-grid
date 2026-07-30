'use client';

import Box from '@mui/material/Box';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import TLeftMain from '../components/table/TLeftMain';
import TMain from '../components/table/TMain';
import Toolbar from '../components/toolbar';
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
  'use no memo';
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

const GridInner = ({
  isToolbar = true,
}: {
  children?: React.ReactNode;
  isToolbar?: boolean;
  isPagination?: boolean;
}) => {
  'use no memo';
  const { gridWrapperRef } = useGrid();
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (tableWrapperRef.current) {
      setTableHeight(tableWrapperRef.current.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    const el = tableWrapperRef.current;
    if (!el) return;
    const updateHeight = () => {
      setTableHeight(el.getBoundingClientRect().height);
    };
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);

    document.addEventListener('fullscreenchange', updateHeight);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      document.removeEventListener('fullscreenchange', updateHeight);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <Box
      ref={gridWrapperRef}
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          bgcolor: 'action.hover',
          borderRadius: 1,
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
          width: '100%',
        }}
      >
        <TLeftMain />
        <Box
          sx={{
            overflow: 'hidden',
            flex: 1,
          }}
          ref={tableWrapperRef}
        >
          <TMain />
        </Box>

        {isToolbar && <Toolbar height={tableHeight} />}
      </Box>
    </Box>
  );
};

export { Grid };
