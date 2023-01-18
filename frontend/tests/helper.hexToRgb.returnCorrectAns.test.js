import { test, describe, expect, it } from 'vitest';
import { hexToRgb } from '../src/helper';

describe('hexToRgb', () => {
  const hexes = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'];
  const rbg = hexes.map(hex => hexToRgb(hex));

  it('should return the correct rgb values', () => {
    expect(rbg[0]).toEqual({ r: 0, g: 0, b: 0 });
    expect(rbg[1]).toEqual({ r: 255, g: 255, b: 255 });
    expect(rbg[2]).toEqual({ r: 255, g: 0, b: 0 });
    expect(rbg[3]).toEqual({ r: 0, g: 255, b: 0 });
    expect(rbg[4]).toEqual({ r: 0, g: 0, b: 255 });
  });
});