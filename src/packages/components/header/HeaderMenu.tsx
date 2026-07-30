'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { type Header } from '@tanstack/react-table';
import { useState, type MouseEvent } from 'react';
import { useGrid } from '../../contexts/GridContext';

const HeaderMenu = <T,>({ header }: { header: Header<T, unknown> }) => {
  'use no memo';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { isLoading, isError } = useGrid();

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return header.column.getCanFilter() ? (
    <Box>
      <IconButton
        size="small"
        color={open ? 'primary' : 'default'}
        disabled={isLoading || isError}
        onClick={handleOpen}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            header.column.toggleSorting(false);
            handleClose();
          }}
          disabled={!header.column.getCanSort()}
        >
          <Typography variant="body2" sx={{ flex: 1 }}>
            Sort ASC
          </Typography>
          <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'flex-end' }}>
            <ArrowUpwardIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        <MenuItem
          onClick={() => {
            header.column.toggleSorting(false);
            handleClose();
          }}
          disabled={!header.column.getCanSort()}
        >
          <Typography variant="body2" sx={{ flex: 1 }}>
            Sort DESC
          </Typography>
          <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'flex-end' }}>
            <ArrowDownwardIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        {!header.isPlaceholder &&
          header.column.getCanPin() && [
            <Divider key="pin-divider" />,
            header.column.getIsPinned() !== 'left' && (
              <MenuItem
                key="pin-left"
                onClick={() => {
                  header.column.pin('left');
                }}
              >
                <Typography variant="body2" sx={{ flex: 1 }}>
                  Pin to left
                </Typography>
                <ListItemIcon
                  sx={{ minWidth: 'auto', justifyContent: 'flex-end' }}
                >
                  <PushPinOutlinedIcon
                    fontSize="small"
                    sx={{ transform: 'rotate(45deg)' }}
                  />
                </ListItemIcon>
              </MenuItem>
            ),
            header.column.getIsPinned() && (
              <MenuItem
                key="unpin"
                onClick={() => {
                  header.column.pin(false);
                }}
              >
                <Typography variant="body2" sx={{ flex: 1 }}>
                  Unpin
                </Typography>
                <ListItemIcon
                  sx={{ minWidth: 'auto', justifyContent: 'flex-end' }}
                >
                  <PushPinIcon fontSize="small" sx={{ opacity: 0.5 }} />
                </ListItemIcon>
              </MenuItem>
            ),
            header.column.getIsPinned() !== 'right' && (
              <MenuItem
                key="pin-right"
                onClick={() => {
                  header.column.pin('right');
                }}
              >
                <Typography variant="body2" sx={{ flex: 1 }}>
                  Pin to right
                </Typography>
                <ListItemIcon
                  sx={{ minWidth: 'auto', justifyContent: 'flex-end' }}
                >
                  <PushPinOutlinedIcon
                    fontSize="small"
                    sx={{ transform: 'rotate(-45deg)' }}
                  />
                </ListItemIcon>
              </MenuItem>
            ),
          ]}

        <Divider />

        <MenuItem
          onClick={() => {
            header.column.toggleVisibility(false);
            handleClose();
          }}
          disabled={!header.column.getCanHide()}
        >
          <Typography variant="body2" sx={{ flex: 1 }}>
            Hide column
          </Typography>
          <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'flex-end' }}>
            <VisibilityOffIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Box>
  ) : null;
};

export default HeaderMenu;
