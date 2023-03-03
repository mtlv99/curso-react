import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import {
  Button, Grid, IconButton, TextField, Typography,
} from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { setActiveNote, startSavingNote, startUploadingFiles } from '../../store/journal';

export const NoteView = () => {
  const dispatch = useDispatch();

  const fileInputRef = useRef();
  const { activeNote, savedNoteLabel, isSaving } = useSelector((state) => state.journal);

  // Se hizo una pequeña modificación en el useForm para que se actualice
  // cuando detecte cambios en los valores suministrados.
  // (Necesario para cuando se selecciona una nota),
  const {
    body, title, date, onInputChange, formState,
  } = useForm(activeNote);

  const getFormattedDate = useMemo(() => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString();
  }, [date]);

  // Actualiza la info del activeNote cuando el form cambia
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  // Mostrar una alerta cuando la nota se actualiza correctamente.
  useEffect(() => {
    if (savedNoteLabel.length > 0) {
      Swal.fire('Guardado', savedNoteLabel, 'success');
    }
  }, [savedNoteLabel]);


  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    console.log('subiendo archivos', target.files);
    dispatch(startUploadingFiles(target.files));
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">{getFormattedDate}</Typography>

      </Grid>
      <Grid item>

        { /*
          Se recomienda usar ref siempre
          en vez de querySelector, en caso de que hubieran elementos con el mismo id/name
          */}
        <input type="file" multiple ref={fileInputRef} onChange={onFileInputChange} style={{ display: 'none' }} />

        <IconButton
          color="primary"
          disabled={isSaving}
          // El input para subir archivos está oculto. Para poder simular un click en él,
          // se utiliza un useRef a ese input y se genera un evento de click por medio de JS.
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      {/* Image gallery */}
      <ImageGallery imageUrls={activeNote.imageUrls} />

    </Grid>
  );
};
