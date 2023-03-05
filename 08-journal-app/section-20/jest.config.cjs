module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  // No es necesario este setup file actualmente, solo si se usa el polyfill del fetch API
  // en versiones de Node anteriores.
  setupFiles: ['./jest.setup.js'],
  // Util para arreglar algunos mocks de librerias
  transformIgnorePatterns: [],
};
