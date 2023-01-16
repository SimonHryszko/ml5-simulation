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

  it('should return the correct rgb values', () => {
    expect(rbg[0]).toEqual({ r: 0, g: 0, b: 0 });
    expect(rbg[1]).toEqual({ r: 255, g: 255, b: 255 });
    expect(rbg[2]).toEqual({ r: 255, g: 0, b: 0 });
    expect(rbg[3]).toEqual({ r: 0, g: 255, b: 0 });
    expect(rbg[4]).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('should return null if the hex is invalid', () => {
    expect(hexToRgb('')).toBeNull();
    expect(hexToRgb('invalid')).toBeNull();
    expect(hexToRgb('#0000000')).toBeNull();
    expect(hexToRgb('#00000')).toBeNull();
    expect(hexToRgb('#0000')).toBeNull();
    expect(hexToRgb('#000')).toBeNull();
    expect(hexToRgb('#00')).toBeNull();
    expect(hexToRgb('#0')).toBeNull();
  });

  it('should return null if the hex is not a string', () => {
    expect(hexToRgb(0)).toBeNull();
    expect(hexToRgb(1)).toBeNull();
    expect(hexToRgb(2)).toBeNull();
    expect(hexToRgb(3)).toBeNull();
    expect(hexToRgb(4)).toBeNull();
    expect(hexToRgb(5)).toBeNull();
    expect(hexToRgb(6)).toBeNull();
    expect(hexToRgb(7)).toBeNull();
    expect(hexToRgb(8)).toBeNull();
    expect(hexToRgb(9)).toBeNull();
    expect(hexToRgb(true)).toBeNull();
    expect(hexToRgb(false)).toBeNull();
    expect(hexToRgb(null)).toBeNull();
    expect(hexToRgb(undefined)).toBeNull();
    expect(hexToRgb([])).toBeNull();
    expect(hexToRgb({})).toBeNull();
    expect(hexToRgb(() => {})).toBeNull();
  });
});