'use client';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ToolbarColumns from './ToolbarColumns';
import ToolbarDnd from './ToolbarDnd';
import ToolbarFilters from './ToolbarFilters';
import ToolbarRows from './ToolbarRows';
import ToolbarSettings from './ToolbarSettings';

const Toolbar = ({ height }: { height: number }) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        height: height,
      }}
    >
      {activePanel === 'columns' && (
        <Box
          sx={{
            width: 208,
            borderLeft: 1,
            borderColor: 'divider',
            height: '100%',
          }}
        >
          <ToolbarColumns />
        </Box>
      )}

      {activePanel === 'rows' && (
        <Box
          sx={{
            width: 208,
            borderLeft: 1,
            borderColor: 'divider',
            height: '100%',
          }}
        >
          <ToolbarRows />
        </Box>
      )}

      {activePanel === 'filter' && (
        <Box
          sx={{
            width: 208,
            borderLeft: 1,
            borderColor: 'divider',
            height: '100%',
          }}
        >
          <ToolbarFilters />
        </Box>
      )}

      {activePanel === 'dnd' && (
        <Box
          sx={{
            width: 208,
            borderLeft: 1,
            borderColor: 'divider',
            height: '100%',
          }}
        >
          <ToolbarDnd />
        </Box>
      )}

      {activePanel === 'settings' && (
        <Box
          sx={{
            width: 208,
            borderLeft: 1,
            borderColor: 'divider',
            height: '100%',
          }}
        >
          <ToolbarSettings />
        </Box>
      )}

      <Box
        sx={{
          width: 28,
          borderLeft: 1,
          borderColor: 'divider',
        }}
      >
        {[
          { value: 'columns', label: 'Columns', icon: ViewColumnIcon },
          { value: 'rows', label: 'Rows', icon: ViewAgendaIcon },
          { value: 'filter', label: 'Filter', icon: FilterAltIcon },
          { value: 'dnd', label: 'Dnd', icon: DragIndicatorIcon },
          { value: 'settings', label: 'Settings', icon: SettingsIcon },
        ].map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            onClick={() => togglePanel(value)}
            size="small"
            sx={{
              writingMode: 'vertical-rl',
              minWidth: 28,
              width: 28,
              fontSize: 12,
              bgcolor:
                activePanel === value ? 'background.paper' : 'transparent',
              '&:hover': {
                bgcolor: 'background.paper',
              },
            }}
          >
            <Icon fontSize="small" />
            {label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Toolbar;
