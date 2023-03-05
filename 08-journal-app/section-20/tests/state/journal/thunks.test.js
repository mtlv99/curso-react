import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote } from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';

// Nota: Acá NO se está haciendo mock de la libreria de firebase,
// porque si se está conectando a Firebase para hacer las pruebas
// (igual que en el testing de Cloudinary).
describe('Pruebas en Journal thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  // es mejor limpiar todos los mocks en cada test.
  beforeEach(() => jest.clearAllMocks());

  // Se creó un proyecto nuevo de Firebase para poder escribir en base de datos sin
  // estar autenticado.
  test('startNewNote debe de crear una nueva nota en blanco', async () => {
    const uid = 'TEST-UID';

    getState.mockReturnValue({ auth: { uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
      body: '',
      title: '',
      id: expect.any(String),
      date: expect.any(Number),
      imageUrls: [],
    }));

    expect(dispatch).toHaveBeenCalledWith(setActiveNote({
      body: '',
      title: '',
      id: expect.any(String),
      date: expect.any(Number),
      imageUrls: [],
    }));

    // Borrar de inserts temporales de firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    // (Misma forma usada en Cloudinary)
    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromises);
  });
});
