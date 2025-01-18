import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import EditJob from './components/EditJob';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import theme from theme.js
import { Box } from '@mui/material';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Box
          sx={{
            marginTop: 8,
            padding: 4,
            maxWidth: '1200px',
            margin: 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/cadastrar" element={<JobForm />} />
            <Route path="/editar/:id" element={<EditJob />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
