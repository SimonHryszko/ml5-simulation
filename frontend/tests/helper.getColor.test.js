import { test, describe, expect, it } from 'vitest';
import { getColor } from '../src/helper';

describe('getColor', () => {
  const data = [
    {
      in: { name: 'red' },
      out: 'rgba(255, 0, 0, 1)',
    },
    {
      in: { name: 'PowderBlue' },
      out: 'rgba(176, 224, 230, 1)',
    },
    {
      in: { name: 'Violet' },
      out: 'rgba(238, 130, 238, 1)',
    },
    {
      in: { name: 'Pink' },
      out: 'rgba(255, 192, 203, 1)',
    },
  ];

  it('should return correct rgba', () => {
    for (const datum of data) expect(getColor(datum.in)).toBe(datum.out);
  });

  it('should return string', () => {
    for (const datum of data) expect(typeof getColor(datum.in)).toBe('string');
  });

  if (
    ('should throw error',
    () => {
      expect(() => getColor({ name: 'red', type: 'rgb' })).toThrow('Invalid type');
    })
  );
});
