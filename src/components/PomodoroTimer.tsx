import {
  Stack,
  Button,
  Box,
  Typography,
  Collapse,
  Divider
} from '@mui/material';
import { useEffect, useRef, useState, useCallback } from 'react';

type PresetKey = '25:5' | '50:10';

/** Dev helper: set localStorage key 'DEV_TIMER_SPEED' to a number to fast-forward
 *  the timer. E.g. 60 = each real second ticks 60 timer-seconds (25min → ~25s).
 *  Remove the key (or set to 1) to restore normal speed. */
function getDevSpeed(): number {
  const raw = localStorage.getItem('DEV_TIMER_SPEED');
  if (!raw) return 1;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

const WORK_DONE_SOUND = '/sounds/Instrument.wav';

function playWorkDoneSound() {
  const audio = new Audio(WORK_DONE_SOUND);
  audio.play().catch(() => {
    /* autoplay blocked — silently ignore */
  });
}

interface PomodoroTimerProps {
  onStartActiveBreak?: () => void;
}

const PRESETS: Record<PresetKey, { work: number; rest: number }> = {
  '25:5': { work: 25, rest: 5 },
  '50:10': { work: 50, rest: 10 }
};

export function PomodoroTimer({ onStartActiveBreak }: PomodoroTimerProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>('25:5');
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [phase, setPhase] = useState<'work' | 'break'>('work');
  const [timerActive, setTimerActive] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [showBreakPrompt, setShowBreakPrompt] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!timerActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    intervalRef.current = setInterval(() => {
      const speed = getDevSpeed();
      setRemainingSeconds((prev) => (prev <= speed ? 0 : prev - speed));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerActive]);

  useEffect(() => {
    if (remainingSeconds === 0 && timerActive) {
      const timeout = setTimeout(() => {
        if (phase === 'work') {
          playWorkDoneSound();
          setShowBreakPrompt(true);
          setPhase('break');
          setRemainingSeconds(breakMinutes * 60);
        } else {
          setShowBreakPrompt(false);
          setPhase('work');
          setRemainingSeconds(workMinutes * 60);
        }
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [remainingSeconds, timerActive, phase, workMinutes, breakMinutes]);

  const applyPreset = useCallback((preset: PresetKey) => {
    const next = PRESETS[preset];
    setSelectedPreset(preset);
    setWorkMinutes(next.work);
    setBreakMinutes(next.rest);
    setPhase('work');
    setTimerActive(false);
    setShowBreakPrompt(false);
    setRemainingSeconds(next.work * 60);
  }, []);

  const toggleTimer = useCallback(() => {
    setTimerActive((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setTimerActive(false);
    setPhase('work');
    setShowBreakPrompt(false);
    setRemainingSeconds(workMinutes * 60);
  }, [workMinutes]);

  function formatTime(totalSeconds: number) {
    const clamped = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(clamped / 60);
    const seconds = clamped % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack direction="row" spacing={1} justifyContent="center">
        {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
          <Button
            key={key}
            size="small"
            variant={selectedPreset === key ? 'contained' : 'text'}
            onClick={() => applyPreset(key)}
            sx={{
              color: 'white',
              fontWeight: selectedPreset === key ? 700 : 400,
              bgcolor:
                selectedPreset === key
                  ? 'rgba(255,255,255,0.15)'
                  : 'transparent',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            {key}
          </Button>
        ))}
      </Stack>

      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{ opacity: 0.7, letterSpacing: 2, fontSize: '0.75rem' }}
        >
          {phase === 'work' ? 'Focus' : 'Break'}
        </Typography>
        <Typography
          variant="h2"
          component="div"
          sx={{ fontWeight: 300, my: 1, fontFamily: 'monospace' }}
        >
          {formatTime(remainingSeconds)}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} justifyContent="center">
        <Button
          size="large"
          variant="contained"
          onClick={toggleTimer}
          sx={{
            color: 'white',
            bgcolor: timerActive
              ? 'rgba(255,100,100,0.3)'
              : 'rgba(100,255,150,0.25)',
            '&:hover': {
              bgcolor: timerActive
                ? 'rgba(255,100,100,0.45)'
                : 'rgba(100,255,150,0.4)'
            },
            px: 4
          }}
        >
          {timerActive ? 'Pause' : 'Start'}
        </Button>
        <Button
          size="large"
          variant="text"
          onClick={resetTimer}
          sx={{ color: 'rgba(255,255,255,0.6)' }}
        >
          Reset
        </Button>
      </Stack>

      <Typography variant="caption" sx={{ textAlign: 'center', opacity: 0.5 }}>
        {workMinutes}m work • {breakMinutes}m break
      </Typography>

      {onStartActiveBreak && !showBreakPrompt && (
        <>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          <Button
            size="small"
            onClick={onStartActiveBreak}
            sx={{
              alignSelf: 'center',
              color: 'rgba(255, 255, 255, 0.8)',
              textTransform: 'none',
              fontWeight: 400,
              fontSize: '0.75rem',
              py: 0.25,
              '&:hover': {
                color: 'hsla(0, 0%, 100%, 0.95)',
                bgcolor: 'transparent'
              }
            }}
          >
            Take a guided break now
          </Button>{' '}
        </>
      )}

      <Collapse in={showBreakPrompt}>
        <Box
          sx={{
            mt: 1,
            p: 1.5,
            borderRadius: 2,
            bgcolor: 'rgba(100,255,150,0.1)',
            border: '1px solid rgba(100,255,150,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8rem' }}>
            Time for a break!
          </Typography>
          <Stack direction="row" spacing={0.5}>
            {onStartActiveBreak && (
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  setShowBreakPrompt(false);
                  onStartActiveBreak();
                }}
                sx={{
                  fontSize: '0.7rem',
                  py: 0.25,
                  px: 1,
                  color: 'white',
                  bgcolor: 'rgba(100,255,150,0.25)',
                  '&:hover': { bgcolor: 'rgba(100,255,150,0.4)' },
                  textTransform: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                Active break
              </Button>
            )}
            <Button
              size="small"
              variant="text"
              onClick={() => setShowBreakPrompt(false)}
              sx={{
                fontSize: '0.7rem',
                py: 0.25,
                px: 0.5,
                color: 'rgba(255,255,255,0.4)',
                minWidth: 0
              }}
            >
              ✕
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}
