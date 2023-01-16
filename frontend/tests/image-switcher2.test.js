import { test, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import TextClassification from '../src/views/TextClassification.vue';

const wrapper = mount(TextClassification);

it('The images array should contain only string with image extension', () => {
  test('image switcher', () => {
    const reviews = wrapper.vm.reviews;

    it('should be array', () => {
      expect(reviews).toBeInstanceOf(Array);
    });

    it('should contain only objects', () => {
      expect(reviews).toContainAllValuesOfType('string');
    });

    for (const review in reviews) {
      it('should have prop quote', () => {
        expect(review).toHaveProperty('quote');
      });

      it('quote should be string', () => {
        expect(typeof review.quote).toBe('string');
      });

      it('should have prop label', () => {
        expect(review).toHaveProperty('label');
      });

      it('label should be string', () => {
        expect(typeof review.label).toBe('string');
      });

      it('should have prop bgCol', () => {
        expect(review).toHaveProperty('bgCol');
      });

      it('bgCol should be string', () => {
        expect(typeof review.bgCol).toBe('string');
      });

      it('bgCol should be in hex format', () => {
        expect(review.bgCol).toMatch(/^#[0-9a-f]{6}$/);
      });

      it('should have prop val', () => {
        expect(review).toHaveProperty('val');
      });

      it('val should be number', () => {
        expect(typeof review.val).toBe('number');
      });

      it('val should be between 0 and 100', () => {
        expect(review.val).toBeGreaterThanOrEqual(0);
        expect(review.val).toBeLessThanOrEqual(100);
      });
    }
  });
});
