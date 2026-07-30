'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DebouncedInput from '../../../components/ui/debounced-input';
import { useGrid } from '../../contexts/GridContext';
import TBody from './TBody';
import THeader from './THeader';

const TMain = ({ topRightSlot }: { topRightSlot?: React.ReactNode }) => {
  'use no memo';
  const {
    paneRef1,
    paneRef2,
    height,
    table,
    setGlobalFilter,
    globalFilter,
    isSplit,
  } = useGrid();

  return (
    <Paper>
      <Toolbar>
        {table.getSelectedRowModel().rows.length > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {table.getSelectedRowModel().rows.length} selected
          </Typography>
        ) : (
          <DebouncedInput
            size="small"
            type="search"
            value={String(globalFilter)}
            onChange={(value) => {
              setGlobalFilter?.(String(value));
            }}
            placeholder="Search by query"
          />
        )}
        <Box
          sx={{
            ml: 'auto',
          }}
        >
          {topRightSlot}
        </Box>
      </Toolbar>
      <TableContainer
        style={{
          width: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
          scrollbarColor: 'transparent transparent',
        }}
        sx={
          isSplit
            ? {
                borderLeft: '1px solid',
                borderColor: 'divider',
              }
            : {}
        }
        ref={paneRef1}
      >
        <THeader />
      </TableContainer>
      <TableContainer
        ref={paneRef2}
        style={{
          width: '100%',
          height: height,
        }}
      >
        <TBody />
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50, 60, 70, 80, 90, 100]}
        component="div"
        count={table.getRowCount()}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_event, newPage) => {
          table.setPageIndex(newPage);
        }}
        onRowsPerPageChange={(event) => {
          table.setPageSize(Number(event.target.value));
        }}
      />
    </Paper>
  );
};

export default TMain;
