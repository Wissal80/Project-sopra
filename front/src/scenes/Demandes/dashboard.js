import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
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
    <div>
      <h1>Analyse des demandes personnelles</h1>
      <div>
        <label>
          Année:
          <select name="year" value={filters.year} onChange={handleFilterChange}>
            <option value="">Toutes</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </label>
        <label>
          Unité d'organisation:
          <select name="organizationUnit" value={filters.organizationUnit} onChange={handleFilterChange}>
            <option value="">Toutes</option>
            <option value="Unit1">Unit1</option>
            <option value="Unit2">Unit2</option>
          </select>
        </label>
        <label>
          Poste:
          <select name="position" value={filters.position} onChange={handleFilterChange}>
            <option value="">Tous</option>
            <option value="Poste1">Poste1</option>
            <option value="Poste2">Poste2</option>
          </select>
        </label>
        <label>
          Type Contrat:
          <select name="contractType" value={filters.contractType} onChange={handleFilterChange}>
            <option value="">Tous</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
          </select>
        </label>
        <label>
          Employé:
          <select name="employee" value={filters.employee} onChange={handleFilterChange}>
            <option value="">Tous</option>
            <option value="Employé1">Employé1</option>
            <option value="Employé2">Employé2</option>
          </select>
        </label>
        <label>
          Société:
          <select name="company" value={filters.company} onChange={handleFilterChange}>
            <option value="">Toutes</option>
            <option value="Société1">Société1</option>
            <option value="Société2">Société2</option>
          </select>
        </label>
        <label>
          Statut Demandes:
          <select name="requestStatus" value={filters.requestStatus} onChange={handleFilterChange}>
            <option value="">Tous</option>
            <option value="Validée">Validée</option>
            <option value="Rejetée">Rejetée</option>
          </select>
        </label>
      </div>
      <div>
        {filteredData.map((item, index) => (
          <div key={index}>
            <p>Nombre total des demandes: {item.totalRequests}</p>
            <p>Total demandes à étudier: {item.requestsToReview}</p>
            <p>Total demandes validées: {item.approvedRequests}</p>
            <p>Total demandes rejetées: {item.rejectedRequests}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
