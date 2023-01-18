import { test, describe, expect, it } from 'vitest';
import { randomHexColor } from '../src/helper';

describe('randomHexColor', () => {
  const color = randomHexColor();

  it('should return a string', () => {
    expect(typeof color).toBe('string');
  });

  it('should return a string with only hex characters', () => {
    expect(color).toMatch(/^#[0-9A-F]{3,6}$/i);
  });
    
  it('should return a string starting with #', () => {
    expect(color[0]).toBe('#');
  });
});
