import React from 'react';
import { render } from '@testing-library/react';
import Avatar from '../components/Avatar/Avatar';

test('renders Avatar component with provided URL', () => {
  const { getByAltText } = render(<Avatar avatarUrl="https://reuniontime.deibyod.co/static/media/arenio.0bce68423952d74a4033.png" />);
  const avatarImage = getByAltText('ReuniOnTime Avatar');
  expect(avatarImage).toHaveAttribute('src', 'https://reuniontime.deibyod.co/static/media/arenio.0bce68423952d74a4033.png');
});