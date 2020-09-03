import * as selectors from 'store/screenSize/screenSizeSelector';
import { initialState } from 'store/initialState';

describe('ScreenSize Selector', () => {

    describe('selector: getScreenSize', () => {
        it('should getScreenSize', () => {
            const actual = selectors.getScreenSize(initialState);
            expect(actual).toBeNull();
        });

    });

  
});