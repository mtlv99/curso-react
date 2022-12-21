// En nuevas versiones de Node, los archivos que contienen modulos de commonjs ahora
// tienen que llevar de extension .cjs

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
};
