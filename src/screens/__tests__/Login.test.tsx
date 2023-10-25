import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import Login from '../Login';

describe('Login Component', () => {
	it('renders correctly', () => {
		const { getByText } = render(<Login />);

		expect(getByText('Login')).toBeDefined();
		expect(getByText('Please sign in to continue.')).toBeDefined();
	});
});
