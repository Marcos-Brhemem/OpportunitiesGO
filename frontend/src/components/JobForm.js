import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert } from '@mui/material';
import api from '../services/api'; 

const JobForm = () => {
  const [formData, setFormData] = useState({
    Role: '',
    Company: '',
    Location: '',
    Salary: '',
    Link: '',
    IsRemote: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    const dataToSend = {
      role: formData.Role,
      company: formData.Company,
      location: formData.Location,
      salary: parseFloat(formData.Salary),
      link: formData.Link,
      remote: formData.IsRemote === 'Sim', // convert IsRemote to boolean
    };

    if (isNaN(dataToSend.salary) || dataToSend.salary <= 0) {
      setLoading(false);
      setError('Por favor, insira um valor válido para o salário.');
      return;
    }

    try {
      const response = await api.post('/v1/opening', dataToSend);

      if (response.status === 200) {
        setSuccess('Vaga cadastrada com sucesso!');
        setFormData({
          Role: '',
          Company: '',
          Location: '',
          Salary: '',
          Link: '',
          IsRemote: '', 
        });
      } else {
        setError('Ocorreu um erro inesperado ao cadastrar a vaga.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ocorreu um erro ao cadastrar a vaga.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Cadastrar Nova Vaga
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TextField
        label="Cargo"
        name="Role"
        value={formData.Role}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Empresa"
        name="Company"
        value={formData.Company}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Localização"
        name="Location"
        value={formData.Location}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Salário"
        name="Salary"
        value={formData.Salary}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        type="number"
        inputProps={{ min: 0 }}
      />
      <TextField
        label="Link da Vaga"
        name="Link"
        value={formData.Link}
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
          value={formData.IsRemote}
          onChange={handleChange}
          name="IsRemote"
          label="Vaga Remota"
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
          {loading ? 'Cadastrando...' : 'Cadastrar Vaga'}
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

export default JobForm;
