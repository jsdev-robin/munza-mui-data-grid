'use client';

import TableCell from '@mui/material/TableCell';
import { flexRender, type Cell } from '@tanstack/react-table';
import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { useGrid } from '../../contexts/GridContext';
import { getPinStyles } from '../../utils/getPinStyles';

interface TCellProps<T> {
  cell: Cell<T, unknown>;
}
const TCell = <T,>({ cell }: TCellProps<T>) => {
  'use no memo';
  const { density, isSplit } = useGrid();
  const cellRef = useRef<HTMLTableCellElement>(null);

  const style: CSSProperties = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: cell.column.getSize(),
    minWidth: cell.column.getSize(),
    maxWidth: cell.column.getSize(),
    padding: density === 'sm' ? '4px' : density === 'md' ? '8px' : '16px',
    height: isSplit ? 'calc(var(--cell-h))' : undefined,
    transition: 'padding 0.2s',
    ...getPinStyles(cell.column, isSplit),
  };

  useLayoutEffect(() => {
    const node = cellRef.current;
    if (!node) return;

    const setCellHeightVar = () => {
      const { height } = node.getBoundingClientRect();
      document.documentElement.style.setProperty('--cell-h', `${height}px`);
    };

    setCellHeightVar();

    const resizeObserver = new ResizeObserver(setCellHeightVar);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [density, isSplit]);

  return (
    <TableCell key={cell.id} style={style}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default TCell;
