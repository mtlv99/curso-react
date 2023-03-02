import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined } from '@mui/icons-material';
import {
  Button, Grid, TextField, Typography,
} from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { setActiveNote, startSavingNote } from '../../store/journal';

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote } = useSelector((state) => state.journal);

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


  const onSaveNote = () => {
    dispatch(startSavingNote());
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
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
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
      <ImageGallery />

    </Grid>
  );
};
