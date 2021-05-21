module.exports = (w) => ({
  autoDetect: true,
  trace: true,
  files: ['src/*.ts'],
  tests: ['src/**/*.test.ts'],
  compilers: {
    '**/*.ts?(x)': w.compilers.typeScript({
      typescript: require('typescript'),
    }),
  },
  testFramework: 'jest',
})
