import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material';
import { useState } from 'react';
import type { BackgroundConfig } from './backgroundConfig';
import { STATIC_COLORS } from './backgroundConfig';
import { GLASS_COLOR } from './styles';

interface BackgroundConfigMenuProps {
  config: BackgroundConfig;
  onChange: (config: BackgroundConfig) => void;
  onRefresh: () => void;
  sideBarOpen: Boolean;
}

const menuPaperSx = {
  bgcolor: 'rgba(20, 20, 20, 0.88)',
  backdropFilter: 'blur(16px)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.1)',
  minWidth: 210,
  borderRadius: 2
};

const menuItemSx = {
  fontSize: '0.875rem',
  gap: 1,
  '&.Mui-selected': {
    bgcolor: 'rgba(255,255,255,0.08)'
  },
  '&:hover': {
    bgcolor: 'rgba(255,255,255,0.06)'
  }
};

export function BackgroundConfigMenu({
  config,
  onChange,
  onRefresh,
  sideBarOpen
}: BackgroundConfigMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const close = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Background settings">
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 10,
            color: 'white',
            bgcolor: sideBarOpen ? 'transparent' : GLASS_COLOR,
            backdropFilter: 'blur(12px)',
            border: sideBarOpen ? '0px' : '1px solid rgba(255,255,255,0.12)',
            borderRadius: 2,
            width: 44,
            height: 44,
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'rgba(20,20,20,0.8)',
              border: '1px solid rgba(255,255,255,0.25)',
              transform: 'scale(1.05)'
            }
          }}
        >
          ⚙
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{ paper: { sx: menuPaperSx } }}
      >
        <MenuItem
          sx={menuItemSx}
          selected={config.type === 'image'}
          onClick={() => {
            onChange({ type: 'image' });
            close();
          }}
        >
          🌄 Random photo
        </MenuItem>

        {config.type === 'image' && (
          <MenuItem
            sx={menuItemSx}
            onClick={() => {
              onRefresh();
              close();
            }}
          >
            ↻ Refresh image
          </MenuItem>
        )}

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 0.5 }} />

        <Typography
          variant="caption"
          sx={{ px: 2, pt: 0.5, pb: 0.25, opacity: 0.45, display: 'block' }}
        >
          Solid color
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, px: 2, pb: 1.5, pt: 0.5 }}>
          {STATIC_COLORS.map((c) => (
            <Tooltip key={c.value} title={c.label}>
              <Box
                onClick={() => {
                  onChange({ type: 'color', color: c.value });
                  close();
                }}
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: 1,
                  bgcolor: c.value,
                  cursor: 'pointer',
                  border:
                    config.type === 'color' && config.color === c.value
                      ? '2px solid rgba(100,255,150,0.85)'
                      : '2px solid rgba(255,255,255,0.18)',
                  transition: 'transform 0.15s ease, border-color 0.15s ease',
                  '&:hover': { transform: 'scale(1.2)' }
                }}
              />
            </Tooltip>
          ))}
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 0.5 }} />

        <Typography
          variant="caption"
          sx={{ px: 2, pt: 0.5, pb: 0.25, opacity: 0.45, display: 'block' }}
        >
          Animated
        </Typography>

        <MenuItem
          sx={menuItemSx}
          selected={config.type === 'gradient' && config.variant === 'warp'}
          onClick={() => {
            onChange({ type: 'gradient', variant: 'warp' });
            close();
          }}
        >
          ✦ Deep warp
        </MenuItem>
        <MenuItem
          sx={menuItemSx}
          selected={config.type === 'gradient' && config.variant === 'spheres'}
          onClick={() => {
            onChange({ type: 'gradient', variant: 'spheres' });
            close();
          }}
        >
          ◉ Floating spheres
        </MenuItem>
        <MenuItem
          sx={menuItemSx}
          selected={config.type === 'gradient' && config.variant === 'aurora'}
          onClick={() => {
            onChange({ type: 'gradient', variant: 'aurora' });
            close();
          }}
        >
          ∿ Aurora
        </MenuItem>
      </Menu>
    </>
  );
}
