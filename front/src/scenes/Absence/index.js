import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, MenuItem, FormControl, InputLabel, Select, List, ListItem, CircularProgress, Paper } from '@mui/material';

const AbsenceFilter = () => {
  const [years, setYears] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearResponse = await axios.get('http://localhost:3001/api/years');
        setYears(yearResponse.data);
        const companyResponse = await axios.get('http://localhost:3001/api/companies');
        setCompanies(companyResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement des années et sociétés:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAbsences = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/absences', {
          params: { year: selectedYear, company: selectedCompany }
        });
        setAbsences(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des absences:', error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedYear || selectedCompany) {
      fetchAbsences();
    } else {
      setAbsences([]);
    }
  }, [selectedYear, selectedCompany]);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Filtrer les absences</Typography>

      <FormControl fullWidth style={{ marginBottom: '1rem' }}>
        <InputLabel>Année</InputLabel>
        <Select
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
        >
          <MenuItem value=""><em>Sélectionner une année</em></MenuItem>
          {years.map(year => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: '2rem' }}>
        <InputLabel>Société</InputLabel>
        <Select
          value={selectedCompany}
          onChange={e => setSelectedCompany(e.target.value)}
        >
          <MenuItem value=""><em>Sélectionner une société</em></MenuItem>
          {companies.map(company => (
            <MenuItem key={company} value={company}>{company}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom>Absences:</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper style={{ padding: '1rem' }}>
          <List>
            {absences.length > 0 ? (
              absences.map((absence, index) => (
                <ListItem key={index}>
                  {absence.date} - {absence.nom} - {absence.absence} - {absence.genre}
                </ListItem>
              ))
            ) : (
              <ListItem>Aucune absence trouvée.</ListItem>
            )}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default AbsenceFilter;
