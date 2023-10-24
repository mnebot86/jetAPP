import { render, screen } from '@testing-library/react-native';
import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import Main from '../../../Main';

describe('<Main />', () => {
	it('has 1 child', () => {
		const tree = renderer.create(<Main />).toJSON() as ReactTestRendererJSON | null;
		if (tree) {
			expect(tree.children && tree.children.length).toBe(1);
		}
	});

	it('renders correctly', () => {
		const tree = renderer.create(<Main />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('renders Hello World message on the home page', async () => {
		render(<Main />);
		expect(screen.getByText('Main is render')).toBeDefined();
	});
});
