export type BreakStep =
  | { type: 'eyes-closed'; duration: number }
  | { type: 'look-distance'; duration: number }
  | { type: 'box-breathing'; rounds: number }
  | { type: 'body-prompt'; message: string };

export function getStepLabel(step: BreakStep): string {
  switch (step.type) {
    case 'eyes-closed':
      return 'Close your eyes';
    case 'look-distance':
      return 'Look into the distance';
    case 'box-breathing':
      return 'Box Breathing';
    case 'body-prompt':
      return step.message;
  }
}

export const BREAK_STEPS: BreakStep[] = [
  { type: 'eyes-closed', duration: 15 },
  { type: 'look-distance', duration: 20 },
  { type: 'box-breathing', rounds: 3 },
  {
    type: 'body-prompt',
    message: 'Roll your shoulders slowly — forward, then backward'
  },
  {
    type: 'body-prompt',
    message: 'Unclench your jaw. Let it hang loose.'
  },
  { type: 'body-prompt', message: 'Shake out your hands freely!' }
];
