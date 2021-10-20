import { shallowMount } from '@vue/test-utils';
import ErrorInfo from '@/components/bookingPanel/dates/calendar/errorInfo/ErrorInfo.vue'

describe('ErrorInfo', () => {
    it('should match initial snapshot', () => {
        const wrapper = shallowMount(ErrorInfo);

        expect(wrapper.html()).toMatchSnapshot();
    });
});
