'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { CSSProperties } from 'react';
import { useGrid } from '../../contexts/GridContext';

const DraggableColumnItem = ({
  columnId,
  label,
}: {
  columnId: string;
  label: string;
}) => {
  'use no memo';
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: columnId });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderRadius: 1,
        bgcolor: 'action.hover',
        px: 1,
        py: 0.5,
      }}
    >
      <Box
        {...attributes}
        {...listeners}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'grab',
          color: 'text.secondary',
        }}
      >
        <DragIndicatorIcon fontSize="small" />
      </Box>
      <Typography variant="body2" noWrap>
        {label
          .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
          .replace(/^./, (str) => str.toUpperCase())}
      </Typography>
    </Paper>
  );
};

const ToolbarDnd = () => {
  'use no memo';
  const { table } = useGrid();
  const columnOrder = table.getState().columnOrder.length
    ? table.getState().columnOrder
    : table.getAllLeafColumns().map((column) => column.id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      table.setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          height: '100%',
          py: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1,
            pb: 1,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="subtitle1">
            Columns DND ({table.getAllLeafColumns().length})
          </Typography>
          <Tooltip title="Reset">
            <IconButton size="small" onClick={() => table.resetColumnOrder()}>
              <RestartAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flex: 1,
            px: 1,
            overflowY: 'auto',
          }}
        >
          <SortableContext
            items={columnOrder}
            strategy={verticalListSortingStrategy}
          >
            {columnOrder.map((columnId) => {
              const column = table.getColumn(columnId);
              if (!column) return null;
              return (
                <DraggableColumnItem
                  key={columnId}
                  columnId={columnId}
                  label={
                    typeof column.columnDef.header === 'string'
                      ? column.columnDef.header
                      : columnId
                  }
                />
              );
            })}
          </SortableContext>
        </Box>
      </Box>
    </DndContext>
  );
};

export default ToolbarDnd;
