import { test, describe, expect, it } from 'vitest';
import { hslToHex } from '../src/helper';

describe('hslToHex', () => {
  const data = [
    {
      in: [0, 100, 50],
      out: '#ff0000',
    },
    {
      in: [120, 100, 50],
      out: '#00ff00',
    },
    {
      in: [240, 100, 50],
      out: '#0000ff',
    },
  ];

  it('should return correct answer', () => {
    for (const { in: input, out: output } of data) {
      expect(hslToHex(...input)).toBe(output);
    }

    it('should return string', () => {
      expect(typeof hslToHex(0, 100, 50)).toBe('string');
    });

    it('should return correct length', () => {
      expect(hslToHex(0, 100, 50).length).toBe(7);
    });
      
    it('should return correct format', () => {
      expect(hslToHex(0, 100, 50)).toMatch(/^#[0-9a-f]{6}$/);
    });
  });
});




