import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TimeConfig from '../components/TimeConfig/TimeConfig';

describe('TimeConfig Component', () => {
    it('should update count when valid time is entered', () => {
        const { getByLabelText } = render(<TimeConfig />);
        const input = getByLabelText('Tiempo:');

        fireEvent.change(input, { target: { value: '02:30' } });
        expect(input.value).toBe('02:30');
    });

    it('should not update count when invalid time is entered', () => {
        const { getByLabelText } = render(<TimeConfig />);
        const input = getByLabelText('Tiempo:');

        fireEvent.change(input, { target: { value: 'invalid' } });
        expect(input.value).toBe('00:00');

        fireEvent.change(input, { target: { value: '99:99' } });
        expect(input.value).toBe('00:00');
    });

    it('should increase count by 10 seconds when increase button is clicked', () => {
        const { getByText, getByLabelText } = render(<TimeConfig />);
        const input = getByLabelText('Tiempo:');
        const increaseButton = getByText('⬆ Aumentar');

        fireEvent.click(increaseButton);
        expect(input.value).toBe('00:10');
    });

    it('should decrease count by 10 seconds when decrease button is clicked', () => {
        const { getByText, getByLabelText } = render(<TimeConfig />);
        const input = getByLabelText('Tiempo:');
        const increaseButton = getByText('⬆ Aumentar');
        const decreaseButton = getByText('⬇ Reducir');

        fireEvent.click(increaseButton);
        fireEvent.click(decreaseButton);
        expect(input.value).toBe('00:00');
    });

    it('should not decrease count below 0', () => {
        const { getByText, getByLabelText } = render(<TimeConfig />);
        const input = getByLabelText('Tiempo:');
        const decreaseButton = getByText('⬇ Reducir');

        fireEvent.click(decreaseButton);
        expect(input.value).toBe('00:00');
    });

    it('should not increase count above 3600 seconds (1 hour)', () => {
        const { getByText, getByLabelText } = render(<TimeConfig />);
        const input = getByLabelText('Tiempo:');
        const increaseButton = getByText('⬆ Aumentar');

        for (let i = 0; i < 361; i++) {
            fireEvent.click(increaseButton);
        }
        expect(input.value).toBe('60:00');
    });
});