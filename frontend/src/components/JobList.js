import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  TextField,
} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const JobList = () => {
  const [jobs, setJobs] = useState([]); // state for storing jobs
  const [filteredJobs, setFilteredJobs] = useState([]); // state for storing filtered jobs
  const [error, setError] = useState(''); // state for storing errors
  const [searchTerm, setSearchTerm] = useState(''); // state  for storing search term
  const [open, setOpen] = useState(false);
  const [selectedJobID, setSelectedJobID] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/openings");
        setJobs(response.data.data);
        setFilteredJobs(response.data.data); // Initially, show all jobs
      } catch (error) {
        console.error("Erro ao buscar as vagas", error);
        setError("Erro ao carregar as vagas.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter jobs based on search term
    setFilteredJobs(
      jobs.filter((job) =>
        job.Role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.Company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, jobs]);

  const handleDeleteClick = (id) => {
    setSelectedJobID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJobID(null);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/opening?id=${selectedJobID}`);
      if (response.status === 200) {
        setJobs(jobs.filter((job) => job.ID !== selectedJobID));
        setSuccess("Vaga excluída com sucesso!");
      }
      handleClose();

      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      console.error("Erro ao excluir a vaga", error);
      setError("Erro ao excluir a vaga.");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/* Search bar */}
      <TextField
        label="Pesquisar"
        variant="outlined"
        margin='normal'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          marginBottom: 4,
          width: '70%',
          marginLeft: '15%',}}
      />

      {/* Exibition of success */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={4}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.ID}>
            <Card
              sx={{
                borderRadius: '20px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent>
                <Typography variant="h6">{job.Role}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Empresa: {job.Company} - {job.Location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Salário: {job.Salary}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Remota: {job.Remote ? 'Sim' : 'Não'}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  href={job.Link}
                  target="_blank"
                  sx={{
                    marginTop: 2,
                    borderRadius: '15px',
                    color: '#F5F5F5',
                    marginRight: 1,
                  }}
                >
                  Ver vaga
                </Button>
                <IconButton
                  aria-label="edit"
                  sx={{
                    marginTop: 2,
                    marginRight: -0.9,
                    color: '#C8C5CB',
                  }}
                  onClick={() => (window.location.href = `/editar/${job.ID}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  sx={{
                    marginTop: 2,
                    color: '#C8C5CB',
                  }}
                  onClick={() => handleDeleteClick(job.ID)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for confirmation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Excluir Vaga</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir esta vaga?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobList;
