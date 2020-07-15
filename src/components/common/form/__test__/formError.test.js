import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FormError } from 'components/common/form/formError';

describe('FormError', () => {

    const errorMessage = 'This is an error message';
    const FormErrorComp = <FormError errorMessage={errorMessage}/>;

    afterEach(cleanup);

    it('renders component', () => {
        const { asFragment } = render(FormErrorComp);
        expect(asFragment()).toMatchSnapshot();
    });

    it('inserts errorMessage', () => {
        const { getByTestId } = render(FormErrorComp);
        expect(getByTestId('FormErrorId')).toHaveTextContent(errorMessage);
    });

    describe('renders className', () => {
        it('adds correct className', () => {
            const { getByTestId } = render(FormErrorComp);
            expect(getByTestId('FormErrorId')).toHaveClass('MuiTypography-root makeStyles-formError-63 MuiTypography-body1');
        });

        it('styles accurately', () => {
            const { getByTestId } = render(FormErrorComp);
            const testingComponent = getByTestId('FormErrorId');
            expect(testingComponent).toHaveStyle('color: rgb(211, 47, 47)');
            expect(testingComponent).toHaveStyle('background-color: rgb(255, 205, 210)');
            expect(testingComponent).toHaveStyle('border-radius: 5px');
            expect(testingComponent).toHaveStyle('text-align: center');
            expect(testingComponent).toHaveStyle('border-style: groove');
            expect(testingComponent).toHaveStyle('border-width: 1px');
            expect(testingComponent).toHaveStyle('border-color: #d32f2f');
            expect(testingComponent).toHaveStyle('font-style: italic');
        });
    });
});