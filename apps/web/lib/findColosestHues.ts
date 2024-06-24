import { hues } from './colors';

export function findClosestColors(hue): { color: string; ratio: number }[] {
  hue = hue % 360;
  const closestHues = Object.keys(hues).reduce(
    (acc, key) => {
      const { avg } = hues[key];
      const diff = Math.abs(hue - avg);
      return diff < acc.diff
        ? { closerDiff: acc.diff, closerKey: acc.key, diff, key }
        : acc;
    },
    { closerDiff: Infinity, closerKey: '', diff: Infinity, key: '' }
  );
  const { closerDiff, closerKey, diff, key } = closestHues;
  if (!hues[closerKey]) {
    return [
      { color: key, ratio: 1 },
      { color: key, ratio: 0 },
    ];
  }
  const ratio = Math.round((diff / (diff + closerDiff)) * 100) / 100;
  // Otherwise, sort the closest colors by their hue value and calculate the ratio between them
  return [
    { color: key, ratio: Number(ratio.toFixed(2)) },
    { color: closerKey, ratio: Number((1 - ratio).toFixed(2)) },
  ];
}
