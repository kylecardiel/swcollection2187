import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';

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
