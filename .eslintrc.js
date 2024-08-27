module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    extends: ['airbnb-base'], //a list of coding rules that make the code consistent and integrated
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 11,
    },
}