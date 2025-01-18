import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Alert, Select, MenuItem, InputLabel, FormControl, CircularProgress, Box, Typography} from '@mui/material';
import axios from 'axios';


const EditJob = () => {
  const { id } = useParams(); // get the url id
  const [job, setJob] = useState({}); // state stores vacancy data
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // state for loading

  // load job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/v1/opening?id=${id}`);
        const fetchedJob = response.data.data;
        
        // convert boolean to string
        fetchedJob.Remote = fetchedJob.Remote === true ? 'Sim' : 'Não';
        
        setJob(fetchedJob); // define job
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar os dados da vaga', error);
        setError('Erro ao carregar os dados da vaga.');
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // save changes
  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedJob = {
        ...job,
        Salary: job.Salary ? parseFloat(job.Salary) : 0, 
        Remote: job.Remote === 'Sim', 
      };

      // send data for api
      const response = await axios.put(`http://localhost:8080/api/v1/opening?id=${id}`, updatedJob);

      if (response.status === 200) {
        setSuccess('Vaga atualizada com sucesso!');
        setJob({
          Role: '',
          Company: '',
          Location: '',
          Salary: '',
          Link: '',
          Remote: '',
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Erro ao salvar as alterações', error);
      setError('Erro ao salvar as alterações.');
      setLoading(false);
    }
  };

  // update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({
      ...job,
      [name]: value, // Updates directly with the field value
    });
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (loading) {
    return <CircularProgress size={24} />;
  }

  if (!job) {
    return <p>Carregando...</p>;
  }

  return (
    <Box component="form" onSubmit={handleSave} sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Editar Vaga
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Cargo"
        name="Role"
        value={job.Role || ''}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Empresa"
        name="Company"
        value={job.Company || ''}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Localização"
        name="Location"
        value={job.Location || ''}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Salário"
        name="Salary"
        value={job.Salary || ''}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        type="number"
        inputProps={{ min: 0 }}
      />
      <TextField
        label="Link"
        name="Link"
        value={job.Link || ''}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="remote-label">Vaga Remota</InputLabel>
        <Select
          labelId="remote-label"
          id="remote"
          value={job.Remote || ''} 
          label="Vaga Remota"
          onChange={handleChange}
          name="Remote" 
        >
          <MenuItem value="Sim">Sim</MenuItem>
          <MenuItem value="Não">Não</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ position: 'relative', mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: 'primary.main',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default EditJob;
