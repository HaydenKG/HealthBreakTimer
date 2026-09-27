export const BreakType = {
  EyesClosed: "eyes-closed",
  LookDistance: "look-distance",
  BoxBreathing: "box-breathing",
  BodyPrompt: "body-prompt",
} as const;

export type BreakTypeValue = typeof BreakType[keyof typeof BreakType];

export type BreakStep =
  | { type: typeof BreakType.EyesClosed; duration: number }
  | { type: typeof BreakType.LookDistance; duration: number }
  | { type: typeof BreakType.BoxBreathing; rounds: number }
  | { type: typeof BreakType.BodyPrompt; message: string };


export function getStepLabel(step: BreakStep): string {
  switch (step.type) {
    case BreakType.EyesClosed:
      return "Close your eyes";
    case BreakType.LookDistance:
      return "Look into the distance";
    case BreakType.BoxBreathing:
      return "Box Breathing";
    case BreakType.BodyPrompt:
      return step.message;
  }
}

export const BREAK_STEPS: BreakStep[] = [
  { type: BreakType.EyesClosed, duration: 15 },
  { type: BreakType.LookDistance, duration: 15 },
  { type: BreakType.BoxBreathing, rounds: 3 },
  {
    type: BreakType.BodyPrompt,
    message: "Roll your shoulders slowly — forward, then backward",
  },
  {
    type: BreakType.BodyPrompt,
    message: "Unclench your jaw. Let it hang loose.",
  },
  {
    type: BreakType.BodyPrompt,
    message: "Shake out your hands freely!",
  },
];