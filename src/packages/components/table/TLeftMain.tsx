'use client';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { useGrid } from '../../contexts/GridContext';
import TLeftBody from './TLeftBody';
import TLeftHeader from './TLeftHeader';

const TLeftMain = () => {
  'use no memo';
  const { isSplit, columnPinning, paneRef3, paneRef4, height, isError } =
    useGrid();

  return (
    <>
      {!isError && isSplit && (columnPinning?.left?.length ?? 0) > 0 ? (
        <Paper
          sx={{
            maxWidth: '220px',
          }}
        >
          <TableContainer
            style={{
              width: '100%',
              overflowY: 'scroll',
              overflowX: 'hidden',
              scrollbarColor: 'transparent transparent',
            }}
            ref={paneRef3}
          >
            <TLeftHeader />
          </TableContainer>
          <TableContainer
            ref={paneRef4}
            style={{
              width: '100%',
              height: height,
            }}
          >
            <TLeftBody />
          </TableContainer>
        </Paper>
      ) : null}
    </>
  );
};

export default TLeftMain;
