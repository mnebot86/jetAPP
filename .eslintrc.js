module.exports = {
	root: true,
	extends: ['universe/native', 'plugin:react-hooks/recommended'],
	globals: {
		__dirname: 'readonly',
	},
	env: {
		jest: true,
	},
};
