import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Usado para navegação entre as páginas
import WorkIcon from '@mui/icons-material/Work';


const Navbar = () => {
  return (
    <Box sx={{
      width: '100%', 
      display: 'flex',
      justifyContent: 'center',
    }}>
      <AppBar
        position="sticky"
        sx={{
          width: '80%', 
          height: '72px',        
          maxWidth: '1200px', 
          backgroundColor: '#6200ea', 
          color: 'white', 
          borderRadius: '20px', 
          margin: '10px', 
          padding: '5px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
        }}
      >
        <Toolbar>
          {/* Logo or title */}
          <WorkIcon sx={{ marginTop: 0,
            marginRight: 0.8,
           }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Opportunities  
          </Typography>

          {/* button navigation */}
          <Box sx={{ display: 'flex' }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                borderRadius: '15px', 
                padding: '8px 16px', 
                marginRight: '10px', 
                '&:hover': { backgroundColor: '#3700b3' },
              }}
            >
              Vagas
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/cadastrar"
              sx={{
                borderRadius: '15px', 
                padding: '8px 16px', 
                '&:hover': { backgroundColor: '#3700b3' }, 
              }}
            >
              Cadastrar Vaga
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
