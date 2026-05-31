import { Grid, Divider } from '@mui/material';
import { TodoList } from './TodoList';
import { PomodoroTimer, usePomodoroTimer } from './PomodoroTimer';
import { GLASS_COLOR, GLASS_BORDER } from './styles';

interface SidebarProps {
  onStartActiveBreak?: () => void;
  timerState: ReturnType<typeof usePomodoroTimer>;
}

export function Sidebar({ onStartActiveBreak, timerState }: SidebarProps) {
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
      <PomodoroTimer {...timerState} onStartActiveBreak={onStartActiveBreak} />
      <Divider sx={{ borderColor: GLASS_BORDER, my: 1 }} />
      <TodoList />
    </Grid>
  );
}
