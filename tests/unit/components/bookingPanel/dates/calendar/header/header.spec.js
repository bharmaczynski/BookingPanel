import { shallowMount } from '@vue/test-utils';
import Header from '@/components/bookingPanel/dates/calendar/header/Header.vue';

describe('Header', () => {
    let propsData = {
        headerLabel: 'aaaa',
    };

    function createWrapper(propsData = {}) {
        return shallowMount(Header, {
            propsData,
        });
    }

    describe('Snapshots', () => {
        it('should match initial snapshot', () => {
            const wrapper = createWrapper(propsData);

            expect(wrapper.vm.$el).toMatchSnapshot();
        });
    });

    it('should emit proper event after previous arrow clicking', () => {
        const wrapper = createWrapper(propsData);
        wrapper.vm.$emit = jest.fn();

        wrapper.find('.header__arrow--previous').trigger('click');

        expect(wrapper.vm.$emit).toHaveBeenCalledWith('previousArrowClicked');
    });

    it('should emit proper event after next arrow clicking', () => {
        const wrapper = createWrapper(propsData);
        wrapper.vm.$emit = jest.fn();

        wrapper.find('.header__arrow--next').trigger('click');

        expect(wrapper.vm.$emit).toHaveBeenCalledWith('nextArrowClicked');
    });
});
