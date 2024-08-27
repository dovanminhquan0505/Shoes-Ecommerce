module.exports = {
    env: {
        browser: true,
        node: true,
        es2023: true,
    },
    extends: ['airbnb-base'], //a list of coding rules that make the code consistent and integrated
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2023,
    },
    rules:{
        'no-console': 0,
    },
}