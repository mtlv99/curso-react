import { TurnedInNot } from '@mui/icons-material';
import {
  Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export const SideBar = ({ drawerWidth }) => {
  const { displayName } = useSelector((state) => state.auth);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >

      <Drawer
        variant="permanent" // temporary
        open
        // sx es como una mezcla de SASS con propiedades de Material UI, por lo que se puede
        // usar el `&` de SASS para acceder a ciertas clases de CSS.
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {
            ['Enero', 'Febrero', 'Marzo', 'Abril'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={text} />
                    <ListItemText secondary="Lorem ispum lorem ipsum" />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
     }
        </List>
      </Drawer>
    </Box>
  );
};
