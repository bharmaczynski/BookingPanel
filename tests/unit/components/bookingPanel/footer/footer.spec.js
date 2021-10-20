import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/bookingPanel/footer/Footer.vue';

describe('Footer', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = shallowMount(Footer);
        wrapper.vm.$emit = jest.fn();
    });

    it('should match initial snapshot', () => {
        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('should emit proper event after clicking button', () => {
        wrapper.find('.footer__button button').trigger('click');

        expect(wrapper.vm.$emit).toHaveBeenCalledWith('buttonClicked');
    });
});
