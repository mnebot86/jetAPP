module.exports = {
	preset: 'jest-expo',
	transform: {
		'^.+\\.(js|tsx)$': 'babel-jest',
	},
	testMatch: ['**/src/**/*.test.tsx', '**/src/**/*.spec.tsx'],
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
	testEnvironment: 'jsdom',
};
