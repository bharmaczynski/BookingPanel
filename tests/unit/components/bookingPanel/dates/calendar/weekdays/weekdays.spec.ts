import { shallowMount } from '@vue/test-utils';
import Weekdays from '@/components/bookingPanel/dates/calendar/weekdays/Weekdays.vue';

describe('Weekdays', () => {
    let propsData = {
        weekdays: ['aaaa', 'bb', 'cc', 'dd'],
    };

    function createWrapper(propsData = {}) {
        return shallowMount(Weekdays, {
            propsData,
        });
    }

    describe('Snapshots', () => {
        it('should match initial snapshot', () => {
            const wrapper = createWrapper(propsData);

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
