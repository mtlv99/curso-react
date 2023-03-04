export const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: 'authenticated',
  uid: 'ABC123',
  email: 'testing@example.com',
  displayName: 'Unit Test',
  photoURL: 'https://dummy.png',
  errorMessage: null,
};


export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: 'ABC123',
  email: 'testing@example.com',
};
