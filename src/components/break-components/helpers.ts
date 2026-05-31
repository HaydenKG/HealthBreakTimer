export const BOX_BREATH_BASE_DURATION = 4;
export const BOX_BREATH_INCREMENT = 0.5;
export const BOX_BREATH_PHASES = [
  'Breathe In',
  'Hold',
  'Breathe Out',
  'Hold'
] as const;

export function getBreathPhaseDuration(round: number) {
  return BOX_BREATH_BASE_DURATION + round * BOX_BREATH_INCREMENT;
}

export function playNotificationSound() {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 560;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.8);
}
