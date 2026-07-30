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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'action.hover',
        px: 1,
        py: 0.75,
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
    </Box>
  );
};

const ToolbarDnd = () => {
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
          <Button
            size="small"
            variant="text"
            onClick={() => table.resetColumnOrder()}
          >
            Reset
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flex: 1,
            px: 1.5,
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
