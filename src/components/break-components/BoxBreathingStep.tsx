import { Box, Button, Typography } from '@mui/material';
import { BOX_BREATH_PHASES, getBreathPhaseDuration } from './helpers';

interface BoxBreathingStepProps {
  breathRound: number;
  totalRounds: number;
  breathPhaseIndex: number;
  breathAnimKey: number;
  onSkip: () => void;
}

export function BoxBreathingStep({
  breathRound,
  totalRounds,
  breathPhaseIndex,
  breathAnimKey,
  onSkip
}: BoxBreathingStepProps) {
  const phaseDuration = getBreathPhaseDuration(breathRound);

  // Phase 0 = Breathe In (0→100%), Phase 1 = Hold (freeze at 100%),
  // Phase 2 = Breathe Out (100→0%), Phase 3 = Hold (freeze at 0%)
  const isHoldAfterIn = breathPhaseIndex === 1;
  const isOut = breathPhaseIndex === 2;
  const isHoldAfterOut = breathPhaseIndex === 3;
  const isHold = isHoldAfterIn || isHoldAfterOut;

  const initialProgress = isOut || isHoldAfterIn ? '100%' : '0%';
  const animation = isHold
    ? 'none'
    : isOut
      ? `borderTraceOut ${phaseDuration}s linear forwards`
      : `borderTraceIn ${phaseDuration}s linear forwards`;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 1, fontWeight: 300 }}>
        Box Breathing
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.5, mb: 3 }}>
        Round {breathRound + 1} of {totalRounds}
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: 200,
          height: 200,
          mx: 'auto',
          mb: 3
        }}
      >
        <Box
          key={breathAnimKey}
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 2,
            background:
              'conic-gradient(rgba(80,220,120,0.9) var(--progress), rgba(255,255,255,0.1) 0%)',
            '--progress': initialProgress,
            animation,
            '@keyframes borderTraceIn': {
              '0%': { '--progress': '0%' },
              '100%': { '--progress': '100%' }
            },
            '@keyframes borderTraceOut': {
              '0%': { '--progress': '100%' },
              '100%': { '--progress': '0%' }
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: '4px',
            borderRadius: 1.5,
            bgcolor: 'rgba(10, 10, 15, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 300 }}>
            {BOX_BREATH_PHASES[breathPhaseIndex]}
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        onClick={onSkip}
        sx={{
          mt: 1,
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'none',
          '&:hover': { color: 'rgba(255,255,255,0.7)' }
        }}
      >
        Skip
      </Button>
    </Box>
  );
}
