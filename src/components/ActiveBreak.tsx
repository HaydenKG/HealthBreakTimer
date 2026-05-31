import { Box, Typography, LinearProgress, Fade, Button } from '@mui/material';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  BREAK_STEPS,
  BOX_BREATH_PHASES,
  getBreathPhaseDuration,
  getStepLabel,
  TimedStep,
  BoxBreathingStep,
  BodyPromptStep
} from './break-components';

interface ActiveBreakProps {
  onComplete: () => void;
}

export function ActiveBreak({ onComplete }: ActiveBreakProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [stepStarted, setStepStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [breathRound, setBreathRound] = useState(0);
  const [breathPhaseIndex, setBreathPhaseIndex] = useState(0);
  const [breathAnimKey, setBreathAnimKey] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStep = BREAK_STEPS[stepIndex];

  const startStep = useCallback(() => setStepStarted(true), []);

  const handleComplete = useCallback(() => {
    setFadingOut(true);
    setTimeout(() => onComplete(), 1200);
  }, [onComplete]);

  const advanceStep = useCallback(() => {
    if (stepIndex < BREAK_STEPS.length - 1) {
      setStepIndex((i) => i + 1);
      setStepStarted(false);
    } else {
      handleComplete();
    }
  }, [stepIndex, handleComplete]);

  // Keyboard: arrow keys start the step or do nothing if already started
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (!stepStarted) startStep();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stepStarted, startStep]);

  // Initialize each step
  useEffect(() => {
    if (!currentStep) return;

    // Body prompts have no timer — skip the ready screen entirely
    if (currentStep.type === 'body-prompt') {
      setStepStarted(true);
      return;
    }

    if (
      currentStep.type === 'eyes-closed' ||
      currentStep.type === 'look-distance'
    ) {
      setSecondsLeft(currentStep.duration);
    } else if (currentStep.type === 'box-breathing') {
      setBreathRound(0);
      setBreathPhaseIndex(0);
      setSecondsLeft(getBreathPhaseDuration(0));
      setBreathAnimKey((k) => k + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  // Countdown ticker — only runs when step is started
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!stepStarted) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stepIndex, breathRound, breathPhaseIndex, stepStarted]);

  // Handle countdown reaching 0
  useEffect(() => {
    if (secondsLeft !== 0) return;
    if (!currentStep) return;
    if (currentStep.type === 'body-prompt') return;

    const timeout = setTimeout(() => {
      if (currentStep.type === 'box-breathing') {
        const nextPhase = breathPhaseIndex + 1;
        if (nextPhase < BOX_BREATH_PHASES.length) {
          setBreathPhaseIndex(nextPhase);
          setSecondsLeft(getBreathPhaseDuration(breathRound));
          setBreathAnimKey((k) => k + 1);
        } else {
          const nextRound = breathRound + 1;
          if (nextRound < currentStep.rounds) {
            setBreathRound(nextRound);
            setBreathPhaseIndex(0);
            setSecondsLeft(getBreathPhaseDuration(nextRound));
            setBreathAnimKey((k) => k + 1);
          } else {
            advanceStep();
          }
        }
      } else {
        if (currentStep.type === 'eyes-closed') {
          new Audio(`${import.meta.env.BASE_URL}sounds/ShadowSoft.wav`)
            .play()
            .catch(() => {});
        }
        advanceStep();
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [secondsLeft, currentStep, breathPhaseIndex, breathRound, advanceStep]);

  const totalSteps = BREAK_STEPS.length;
  const progress = (stepIndex / totalSteps) * 100;

  function renderStep() {
    if (!currentStep) return null;

    switch (currentStep.type) {
      case 'eyes-closed':
        return (
          <TimedStep
            title="Close your eyes"
            subtitle="Relax. A sound will tell you when to open them."
            secondsLeft={secondsLeft}
            onSkip={advanceStep}
          />
        );
      case 'look-distance':
        return (
          <TimedStep
            title="Look into the distance"
            subtitle="Focus on the farthest point you can see. Rest your eyes."
            secondsLeft={secondsLeft}
            unit="s"
            onSkip={advanceStep}
          />
        );
      case 'box-breathing':
        return (
          <BoxBreathingStep
            breathRound={breathRound}
            totalRounds={currentStep.rounds}
            breathPhaseIndex={breathPhaseIndex}
            breathAnimKey={breathAnimKey}
            onSkip={advanceStep}
          />
        );
      case 'body-prompt':
        return (
          <BodyPromptStep message={currentStep.message} onSkip={advanceStep} />
        );
    }
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        bgcolor: 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        p: 4,
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 1.2s ease'
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 3,
            bgcolor: 'rgba(255,255,255,0.05)',
            '& .MuiLinearProgress-bar': {
              bgcolor: 'rgba(100,255,150,0.6)'
            }
          }}
        />
      </Box>

      {!stepStarted ? (
        <Fade in={!stepStarted} timeout={400}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ opacity: 0.5, letterSpacing: 3 }}
            >
              {stepIndex === 0 ? 'First up' : 'Next up'}
            </Typography>
            <Typography variant="h3" sx={{ mt: 1, fontWeight: 300 }}>
              {currentStep ? getStepLabel(currentStep) : ''}
            </Typography>
            <Button
              variant="outlined"
              onClick={startStep}
              sx={{
                mt: 4,
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
              Start
            </Button>
          </Box>
        </Fade>
      ) : (
        <Fade in={stepStarted} timeout={400}>
          <Box>{renderStep()}</Box>
        </Fade>
      )}

      <Typography
        variant="caption"
        onClick={handleComplete}
        sx={{
          position: 'absolute',
          bottom: 24,
          opacity: 0.4,
          cursor: 'pointer',
          '&:hover': { opacity: 0.8 }
        }}
      >
        Leave guided break
      </Typography>
    </Box>
  );
}
