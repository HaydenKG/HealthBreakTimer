import { Grid, Divider } from '@mui/material';
import { TodoList } from './TodoList';
import { PomodoroTimer } from './PomodoroTimer';
import { GLASS_COLOR } from './styles';

interface SidebarProps {
  onStartActiveBreak?: () => void;
}

export function Sidebar({ onStartActiveBreak }: SidebarProps) {
  return (
    <Grid
      size={3}
      sx={{
        backgroundColor: GLASS_COLOR,
        backdropFilter: 'blur(16px)',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        overflowY: 'auto'
      }}
    >
      <PomodoroTimer onStartActiveBreak={onStartActiveBreak} />
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />
      <TodoList />
    </Grid>
  );
}
