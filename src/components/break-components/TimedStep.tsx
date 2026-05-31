import { Box, Button, Typography } from '@mui/material';

interface TimedStepProps {
  title: string;
  subtitle: string;
  secondsLeft: number;
  /** Optional unit appended to the countdown, e.g. 's' */
  unit?: string;
  onSkip: () => void;
}

export function TimedStep({
  title,
  subtitle,
  secondsLeft,
  unit = '',
  onSkip
}: TimedStepProps) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 300 }}>
        {title}
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.7 }}>
        {subtitle}
      </Typography>
      <Typography
        variant="h1"
        sx={{ mt: 4, fontFamily: 'monospace', fontWeight: 200 }}
      >
        {secondsLeft}
        {unit}
      </Typography>
      <Button
        size="small"
        onClick={onSkip}
        sx={{
          mt: 3,
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
