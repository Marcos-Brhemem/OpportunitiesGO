import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';

const Navbar = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          width: '80%',
          maxWidth: '1200px',
          backgroundColor: '#6200ea',
          color: 'white',
          borderRadius: '20px',
          margin: '10px',
          padding: '5px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo and title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: isSmallScreen ? '10px' : '0',
            }}
          >
            <WorkIcon sx={{ marginRight: 0.8 }} />
            <Typography
              variant={isSmallScreen ? 'subtitle1' : 'h6'}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Opportunities
            </Typography>
          </Box>

          {/* buttons navigation */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              alignItems: isSmallScreen ? 'stretch' : 'center',
              gap: '8px',
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                borderRadius: '15px',
                padding: '8px 16px',
                width: isSmallScreen ? '100%' : 'auto', 
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
                width: isSmallScreen ? '100%' : 'auto', 
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
