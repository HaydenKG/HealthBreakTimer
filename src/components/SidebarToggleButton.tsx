import { IconButton, Tooltip } from '@mui/material';
import { GLASS_COLOR } from './styles';

interface SidebarToggleButtonProps {
  timerInCenter: boolean;
  onToggle: () => void;
}

export function SidebarToggleButton({
  timerInCenter,
  onToggle
}: SidebarToggleButtonProps) {
  return (
    <Tooltip title={timerInCenter ? 'Show sidebar' : 'Hide sidebar'}>
      <IconButton
        onClick={onToggle}
        sx={{
          position: 'fixed',
          bottom: 72,
          right: 20,
          zIndex: 10,
          color: 'white',
          bgcolor: timerInCenter ? GLASS_COLOR : 'transparent',
          backdropFilter: 'blur(12px)',
          border: timerInCenter ? '1px solid rgba(255,255,255,0.12)' : '0px',
          borderRadius: 2,
          width: 44,
          height: 44,
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'rgba(20,20,20,0.8)',
            border: '1px solid rgba(255,255,255,0.25)',
            transform: 'scale(1.05)'
          },
          fontSize: '1.1rem'
        }}
      >
        {timerInCenter ? '☰' : '✕'}
      </IconButton>
    </Tooltip>
  );
}
