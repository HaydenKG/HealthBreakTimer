import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import { ActiveBreak } from './components/ActiveBreak';
import { AppBackground } from './components/AppBackground';
import { BackgroundConfigMenu } from './components/BackgroundConfigMenu';
import { PomodoroTimer, usePomodoroTimer } from './components/PomodoroTimer';
import { Sidebar } from './components/Sidebar';
import { SidebarToggleButton } from './components/SidebarToggleButton';
import { GLASS_COLOR } from './components/styles';
import {
  loadBackgroundConfig,
  saveBackgroundConfig,
  type BackgroundConfig
} from './components/backgroundConfig';

type TimerLayout = 'center' | 'sidebar';

function App() {
  const [bgConfig, setBgConfig] =
    useState<BackgroundConfig>(loadBackgroundConfig);
  const [refreshKey, setRefreshKey] = useState(0);
  const timerState = usePomodoroTimer();

  const [timerLayout, setTimerLayout] = useState<TimerLayout>(() => {
    return (
      (localStorage.getItem('healthbreak-timer-layout') as TimerLayout) ||
      'center'
    );
  });

  useEffect(() => {
    localStorage.setItem('healthbreak-timer-layout', timerLayout);
  }, [timerLayout]);

  const handleBgChange = (config: BackgroundConfig) => {
    setBgConfig(config);
    saveBackgroundConfig(config);
  };

  const [activeBreakOpen, setActiveBreakOpen] = useState(false);
  const timerInCenter = timerLayout === 'center';

  return (
    <>
      {activeBreakOpen && (
        <ActiveBreak onComplete={() => setActiveBreakOpen(false)} />
      )}
      <Grid
        container
        spacing={2}
        sx={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          color: 'white',
          padding: '1rem',
          overflow: 'hidden'
        }}
      >
        <AppBackground config={bgConfig} refreshKey={refreshKey} />

        <Grid
          size="grow"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          {timerInCenter && (
            <Box
              sx={{
                backgroundColor: GLASS_COLOR,
                backdropFilter: 'blur(16px)',
                borderRadius: 3,
                p: 4
              }}
            >
              <PomodoroTimer
                {...timerState}
                onStartActiveBreak={() => setActiveBreakOpen(true)}
              />
            </Box>
          )}
        </Grid>
        {timerLayout === 'sidebar' && (
          <Sidebar
            timerState={timerState}
            onStartActiveBreak={() => setActiveBreakOpen(true)}
          />
        )}
      </Grid>

      <SidebarToggleButton
        timerInCenter={timerInCenter}
        onToggle={() =>
          setTimerLayout((l) => (l === 'center' ? 'sidebar' : 'center'))
        }
      />

      <BackgroundConfigMenu
        config={bgConfig}
        onChange={handleBgChange}
        onRefresh={() => setRefreshKey((k) => k + 1)}
        sideBarOpen={timerLayout !== 'center'}
      />
    </>
  );
}

export default App;
