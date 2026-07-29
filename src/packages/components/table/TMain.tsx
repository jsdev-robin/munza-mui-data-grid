'use client';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useGrid } from '../../contexts/GridContext';
import TBody from './TBody';
import THeader from './THeader';

const TMain = () => {
  const { paneRef1, paneRef2, height } = useGrid();

  return (
    <Paper>
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
          height: height,
        }}
      >
        <TBody />
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

export default TMain;
