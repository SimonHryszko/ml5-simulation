import { test } from 'vitest';
import { mount } from '@vue/test-utils';
import LandingView from '../src/views/LandingView.vue';

test('image switcher', () => {
  const wrapper = mount(LandingView);
  // const image = wrapper.find('img');
  // expect(image.attributes('src')).toBe('/images/1.jpg');
  // wrapper.find('button').trigger('click');
  // expect(image.attributes('src')).toBe('/images/2.jpg');
});
