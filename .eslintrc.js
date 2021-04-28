module.exports = {
  env: {
    browser: true,
    jest: true,
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  ignorePatterns: ["node_modules/"],
  extends: [
    "airbnb",
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 2, { SwitchCase: 1, MemberExpression: 1 }],
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
    "no-plusplus": "off",
    "comma-dangle": ["error", "always-multiline"],
    "no-unused-vars": ["warn", { argsIgnorePattern: "err|req|res|next" }],
    "func-names": "off",
    "consistent-return": "off",
    "no-underscore-dangle": "off",
    "object-curly-spacing": ["error", "always"],
    "no-restricted-syntax": ["error", "ForOfStatement"],
    "no-use-before-define": ["error", { functions: false }],
    "no-await-in-loop": "off",
    "object-shorthand": ["error", "properties"],
    "no-param-reassign": ["error", { props: false }],
    // "import/no-unresolved": "off",
    "arrow-body-style": ["warn", "as-needed"],
    "wrap-iife": ["error", "inside"],
    "no-unused-expressions": "off",

    // react
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "react/prefer-stateless-function": "off",
    "react/forbid-prop-types": "off",
    // "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/label-has-for": "off",
  },
};
