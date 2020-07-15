import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HeaderText } from 'components/common/text/headerText';

describe('HeaderText', () => {

    const text = 'This is the Header';

    afterEach(cleanup);

    it('renders component', () => {
        const { asFragment } = render(<HeaderText text={text}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('inserts text into div', () => {
        const { getByTestId } = render(<HeaderText text={text}/>);
        expect(getByTestId('headerTextId')).toHaveTextContent(text);
    });

    describe('renders className', () => {

        it('adds correct className when staticTextSize is passed', () => {
            const { getByText } = render(<HeaderText text={text} textColor='red' staticTextSize/>);
            expect(getByText(text)).toHaveClass('makeStyles-textStatic-10 makeStyles-textStatic-12');
        });

        it('adds correct className when staticTextSize is not passed', () => {
            const { getByText } = render(<HeaderText text={text} textColor='red'/>);
            expect(getByText(text)).toHaveClass('makeStyles-textSizeChange-13 makeStyles-textSizeChange-15');
        });

    });

    it('styles text with correct color', () => {
        const { getByTestId } = render(<HeaderText text={text} textColor='red'/>);
        expect(getByTestId('headerTextId')).toHaveStyle('color: red')
    });

    it('styles accurately', () => {
        const { getByTestId } = render(<HeaderText text={text} textColor='green' staticTextSize/>);
        const testingComponent = getByTestId('headerTextId');
        expect(testingComponent).toHaveStyle('color: green');
        expect(testingComponent).toHaveStyle('display: flex');
        expect(testingComponent).toHaveStyle('flex-direction: column');
        expect(testingComponent).toHaveStyle('align-items: center');
        expect(testingComponent).toHaveStyle('font-family: Raleway, sans-serif');
        expect(testingComponent).toHaveStyle('font-size: 36px');
        expect(testingComponent).toHaveStyle('font-weight: 800');
        expect(testingComponent).toHaveStyle('text-transform: uppercase');
    });

});