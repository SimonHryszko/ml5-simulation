import { test, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ImageSwitcher from '../src/components/image-classification/ImageSwitcher.vue';

const wrapper = mount(ImageSwitcher);

it('The images array should contain only string with image extension', () => {
  test('image switcher', () => {
  const images = wrapper.vm.images;

  // check if images are all ending with .jpg or .png or .jpeg
  for (const image of images) {
    expect(image).toMatch(/(jpg|png|jpeg|svg)$/);
  }
  })
});