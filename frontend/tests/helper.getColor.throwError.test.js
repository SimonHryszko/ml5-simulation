import { test, describe, expect, it } from 'vitest';
import { getColor } from '../src/helper';

describe('getColor', () => {
  it('should throw error the type is not in [rgba]', () => {
    expect(() => getColor({ name: 'red', type: 'rgb' })).toThrow('Invalid type');
  });
});
