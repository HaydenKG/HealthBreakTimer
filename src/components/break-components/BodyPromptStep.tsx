import { Box, Button, Typography } from '@mui/material';

interface BodyPromptStepProps {
  message: string;
  onSkip: () => void;
}

export function BodyPromptStep({ message, onSkip }: BodyPromptStepProps) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 300 }}>
        {message}
      </Typography>
      <Button
        variant="outlined"
        onClick={onSkip}
        sx={{
          color: 'rgba(255,255,255,0.7)',
          borderColor: 'rgba(255,255,255,0.2)',
          textTransform: 'none',
          fontWeight: 400,
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.5)',
            bgcolor: 'rgba(255,255,255,0.05)'
          }
        }}
      >
        Next
      </Button>
    </Box>
  );
}
