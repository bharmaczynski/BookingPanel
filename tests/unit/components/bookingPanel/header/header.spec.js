import { shallowMount } from '@vue/test-utils';
import Header from '@/components/bookingPanel/header/Header.vue';

describe('Header', () => {
    it('should match initial snapshot', () => {
        const wrapper = shallowMount(Header);

        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('should match snapshot with props', () => {
        const wrapper = shallowMount(Header, {
            propsData: {
                price: 100,
                numberOfRates: 43,
                rating: 4.3,
            },
        });

        expect(wrapper.vm.$el).toMatchSnapshot();
    });
});
