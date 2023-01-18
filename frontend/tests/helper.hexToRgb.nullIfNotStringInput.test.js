import { test, describe, expect, it } from 'vitest';
import { hexToRgb } from '../src/helper';

describe('hexToRgb', () => {
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