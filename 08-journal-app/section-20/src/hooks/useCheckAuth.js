import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { setNotes, startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    // Firebase nos ofrece un Observable para estar pendiente de cualquier
    // cambio en el usuario
    // eslint-disable-next-line consistent-return
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      // eslint-disable-next-line object-curly-newline
      const { uid, email, displayName, photoURL } = user;
      // eslint-disable-next-line object-curly-newline
      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(startLoadingNotes());
    });
  }, []);

  return { status };
};
