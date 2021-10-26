import { shallowMount } from '@vue/test-utils';
import Rating from '@/components/bookingPanel/rating/Rating.vue';

describe('Rating', () => {
    let propsData = {
        numberOfRates: 40,
        rating: 3.7,
    };

    function createWrapper(propsData = {}) {
        return shallowMount(Rating, { propsData });
    }

    describe('Snapshots', () => {
        it('should match initial snapshot', () => {
            const wrapper = createWrapper();

            expect(wrapper.vm.$el).toMatchSnapshot();
        });

        it('should match snapshot with props', () => {
            const wrapper = createWrapper(propsData);

            expect(wrapper.vm.$el).toMatchSnapshot();
        });
    });

    describe('Methods', () => {
        describe('starClass', () => {
            it('should return "active" for number less than rounded rating', () => {
                const wrapper = createWrapper(propsData);

                expect(wrapper.vm.starClass(3)).toEqual('active');
            });

            it('should return "half" for number which after subtraction 0.5 is equal rounded rating ', () => {
                const wrapper = createWrapper(propsData);

                expect(wrapper.vm.starClass(4)).toEqual('half');
            });

            it('should return "inactive" for number which after subtraction 0.5 is greater rounded rating ', () => {
                const wrapper = createWrapper(propsData);

                expect(wrapper.vm.starClass(5)).toEqual('inactive');
            });
        });
    });
});
