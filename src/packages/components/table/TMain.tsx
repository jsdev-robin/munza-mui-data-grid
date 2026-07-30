'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useGrid } from '../../contexts/GridContext';
import TBody from './TBody';
import THeader from './THeader';

const TMain = ({ topRightSlot }: { topRightSlot?: React.ReactNode }) => {
  'use no memo';
  const { paneRef1, paneRef2, height, table } = useGrid();

  return (
    <Paper>
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
        ]}
      >
        {table.getSelectedRowModel().rows.length > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {table.getSelectedRowModel().rows.length} selected
          </Typography>
        ) : (
          <TextField size="small" />
        )}
        <Box
          sx={{
            ml: 'auto',
            mr: 1,
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
