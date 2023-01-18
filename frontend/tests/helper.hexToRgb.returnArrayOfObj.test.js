import { test, describe, expect, it } from 'vitest';
import { hexToRgb } from '../src/helper';

describe('hexToRgb', () => {
  const hexes = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'];
  const rbg = hexes.map(hex => hexToRgb(hex));

  it('should return an object with r, g, and b properties', () => {
    for (const hex of hexes) {
      expect(hexToRgb(hex)).toHaveProperty('r');
      expect(hexToRgb(hex)).toHaveProperty('g');
      expect(hexToRgb(hex)).toHaveProperty('b'); 
    }
  });
});