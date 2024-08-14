import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, MenuItem, Card, CardContent, Typography } from '@mui/material';

const Demandes = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    year: '',
    organizationUnit: '',
    position: '',
    contractType: '',
    employee: '',
    company: '',
    requestStatus: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3002/data')
      .then(response => {
        console.log('API response:', response.data);
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  useEffect(() => {
    const results = data.filter(item => {
      return (
        (filters.year ? item.year === filters.year : true) &&
        (filters.organizationUnit ? item.organizationUnit === filters.organizationUnit : true) &&
        (filters.position ? item.position === filters.position : true) &&
        (filters.contractType ? item.contractType === filters.contractType : true) &&
        (filters.employee ? item.employee === filters.employee : true) &&
        (filters.company ? item.company === filters.company : true) &&
        (filters.requestStatus ? item.requestStatus === filters.requestStatus : true)
      );
    });
    setFilteredData(results);
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Analyse des demandes personnelles
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Année"
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">Toutes</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Unité d'organisation"
            name="organizationUnit"
            value={filters.organizationUnit}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">Toutes</MenuItem>
            <MenuItem value="Unit1">Unit1</MenuItem>
            <MenuItem value="Unit2">Unit2</MenuItem>
            <MenuItem value="Unit3">Unit3</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Poste"
            name="position"
            value={filters.position}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="Poste1">Poste1</MenuItem>
            <MenuItem value="Poste2">Poste2</MenuItem>
            <MenuItem value="Poste3">Poste3</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Type Contrat"
            name="contractType"
            value={filters.contractType}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="CDI">CDI</MenuItem>
            <MenuItem value="CDD">CDD</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Employé"
            name="employee"
            value={filters.employee}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="Employé1">Employé1</MenuItem>
            <MenuItem value="Employé2">Employé2</MenuItem>
            <MenuItem value="Employé3">Employé3</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Société"
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">Toutes</MenuItem>
            <MenuItem value="Société1">Société1</MenuItem>
            <MenuItem value="Société2">Société2</MenuItem>
            <MenuItem value="Société3">Société3</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Statut Demandes"
            name="requestStatus"
            value={filters.requestStatus}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="Validée">Validée</MenuItem>
            <MenuItem value="Rejetée">Rejetée</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {filteredData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">Année: {item.year}</Typography>
                <Typography>Unité d'organisation: {item.organizationUnit}</Typography>
                <Typography>Poste: {item.position}</Typography>
                <Typography>Type de Contrat: {item.contractType}</Typography>
                <Typography>Employé: {item.employee}</Typography>
                <Typography>Société: {item.company}</Typography>
                <Typography>Statut de la Demande: {item.requestStatus}</Typography>
                <Typography>Nombre total des demandes: {item.totalRequests}</Typography>
                <Typography>Total demandes à étudier: {item.requestsToReview}</Typography>
                <Typography>Total demandes validées: {item.approvedRequests}</Typography>
                <Typography>Total demandes rejetées: {item.rejectedRequests}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Demandes;
