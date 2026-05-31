export type BackgroundConfig =
  | { type: 'image' }
  | { type: 'color'; color: string }
  | { type: 'gradient'; variant: 'warp' | 'spheres' | 'aurora' };

export const STATIC_COLORS: { label: string; value: string }[] = [
  { label: 'Deep Space', value: '#0a0a1a' },
  { label: 'Midnight Forest', value: '#071a0f' },
  { label: 'Deep Ocean', value: '#071520' },
  { label: 'Plum', value: '#12051f' },
  { label: 'Graphite', value: '#1a1a1a' }
];

const STORAGE_KEY = 'healthbreak-bg-config';

export function loadBackgroundConfig(): BackgroundConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      if (parsed.type === 'image') return { type: 'image' };
      if (parsed.type === 'color' && typeof parsed.color === 'string')
        return { type: 'color', color: parsed.color };
      if (parsed.type === 'gradient') {
        const variant =
          parsed.variant === 'spheres'
            ? 'spheres'
            : parsed.variant === 'aurora'
              ? 'aurora'
              : 'warp';
        return { type: 'gradient', variant };
      }
    }
  } catch {
    // ignore
  }
  return { type: 'image' };
}

export function saveBackgroundConfig(config: BackgroundConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}
