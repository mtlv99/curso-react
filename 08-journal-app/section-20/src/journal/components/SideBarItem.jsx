import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import {
  Grid, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({ note }) => {
  const dispatch = useDispatch();

  const {
    title, body, id, date, imageUrls = [],
  } = note;


  const onClickNote = () => {
    dispatch(setActiveNote({
      title, body, id, date, imageUrls,
    }));
  };


  const formattedTitle = useMemo(() => (title.length > 17
    ? `${title.substring(0, 17)}...`
    : title), [title]);

  return (

    <ListItem disablePadding onClick={onClickNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={formattedTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
