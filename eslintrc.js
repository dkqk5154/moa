module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
	rules: {
		'react/jsx-filename-extension': [
			'error',
			{ extensions: ['.js', '.jsx'] },
		],
		"react-hooks/rules-of-hooks": 'error',
		"react-hooks/exhaustive-deps": 'warn' // <--- THIS IS THE NEW RULE
	},
	settings: {
		'import/resolver': {
			node: {
				moduleDirectory: ['node_modules', 'src/'],
			},
		},
	},
};
