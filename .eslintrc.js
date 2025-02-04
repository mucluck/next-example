// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
		amd: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"next",
		"next/core-web-vitals",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "simple-import-sort", "@typescript-eslint"],
	rules: {
		indent: ["warn", "tab"],
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/no-explicit-any": "error",
		// camelcase: [
		// 	"error",
		// 	{
		// 		properties: "never",
		// 	},
		// ],
		// Possible errors
		"no-console": "warn",
		// Best practices
		"dot-notation": "error",
		"no-else-return": "error",
		"no-floating-decimal": "error",
		"no-sequences": "error",
		// Stylistic
		"array-bracket-spacing": "error",
		"computed-property-spacing": ["error", "never"],
		curly: "error",
		"no-lonely-if": "error",
		"no-unneeded-ternary": "error",
		"one-var-declaration-per-line": "error",
		quotes: [
			"error",
			"single",
			{
				allowTemplateLiterals: false,
				avoidEscape: true,
			},
		],

		// ES6
		"array-callback-return": "off",
		"prefer-const": "error",
		// Imports
		"import/prefer-default-export": "off",
		"sort-imports": [
			"error",
			{
				ignoreCase: true,
				ignoreDeclarationSort: true,
			},
		],
		"no-unused-expressions": "off",
		"no-prototype-builtins": "off",
		// https://github.com/lydell/eslint-plugin-simple-import-sort/ Плагин для сортировки импортов
		"simple-import-sort/imports": [
			"error",
			{
				// необходима дополнительная настройка именно под проект, тут приведен пример
				groups: [
					["^react", "^[^\\.]"],
					["^~/"],
					["^[.][.]"],
					["^[.]", "^(./).*[.]css", "(^\\u0000)[.]/.*[.]css"],
				],
			},
		],
		// REACT
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-first-prop-new-line": [2, "multiline"],
		"react/jsx-max-props-per-line": [1, { maximum: 2 }],
		"jsx-a11y/href-no-hash": [0],
		"react/display-name": 0,
		"react/no-deprecated": "error",
		"react/no-unsafe": [
			"error",
			{
				checkAliases: true,
			},
		],
		"react/jsx-sort-props": [
			"error",
			{
				ignoreCase: true,
			},
		],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": 0,
		"react/jsx-indent": [1, "tab"],
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
