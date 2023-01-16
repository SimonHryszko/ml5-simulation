import { test, describe, expect, it } from 'vitest';
import { hexToRgb } from '../src/helper';

describe('hexToRgb', () => {
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
});