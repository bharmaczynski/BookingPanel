import { shallowMount } from "@vue/test-utils";
import DateInput from "@/components/BookingPanel/Dates/DateInput/DateInput.vue";

describe('DateInput', () => {
    let propsData: {
        value: string;
        placeholder?: string;
    };

    beforeEach(() => {
        propsData = {
            value: '10-10-2021',
        }
    });

    function createWrapper(propsData = {}) {
        return shallowMount(DateInput,  {
            propsData
        })
    }

    describe('Snapshots', () => {
        it('should match initial snapshot', () => {
            const wrapper = createWrapper(propsData);

            expect(wrapper.vm.$el).toMatchSnapshot();
        })

        it('should match snapshot in case placeholder is given', () => {
            propsData = {
                value: '10-10-2021',
                placeholder: 'lorem ipsum',
            }

            const wrapper = createWrapper(propsData);

            expect(wrapper.vm.$el).toMatchSnapshot();
        })
    })
})
