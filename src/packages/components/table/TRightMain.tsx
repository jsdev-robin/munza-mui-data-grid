'use client';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Toolbar from '@mui/material/Toolbar';
import { useGrid } from '../../contexts/GridContext';
import TRightBody from './TRightBody';
import TRightHeader from './TRightHeader';

const TRightMain = () => {
  'use no memo';
  const { isSplit, columnPinning, paneRef5, paneRef6, height, isError } =
    useGrid();

  return (
    <>
      {!isError && isSplit && (columnPinning?.left?.length ?? 0) > 0 ? (
        <Paper
          sx={{
            maxWidth: '220px',
          }}
        >
          <Toolbar />
          <TableContainer
            style={{
              width: '100%',
              overflowY: 'scroll',
              overflowX: 'hidden',
              scrollbarColor: 'transparent transparent',
            }}
            ref={paneRef5}
          >
            <TRightHeader />
          </TableContainer>
          <TableContainer
            ref={paneRef6}
            style={{
              width: '100%',
              height: height,
              overflowX: 'scroll',
            }}
          >
            <TRightBody />
          </TableContainer>
        </Paper>
      ) : null}
    </>
  );
};

export default TRightMain;
