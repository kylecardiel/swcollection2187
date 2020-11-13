import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import React from 'react';

describe('FormHeaderSection', () => {

    const text = 'This is test text';
    const FormHeaderSectionComp = <FormHeaderSection text={text} textColor={'white'}/>;

    afterEach(cleanup);

    it('renders component', () => {
        const { asFragment } = render(FormHeaderSectionComp);
        expect(asFragment()).toMatchSnapshot();
    });

    describe('renders className', () => {
        it('adds correct className', () => {
            const { getByTestId } = render(FormHeaderSectionComp);
            expect(getByTestId('FormHeaderId')).toHaveClass('MuiGrid-root makeStyles-headerContainer-109 MuiGrid-container MuiGrid-spacing-xs-1');
        });
    });
});
