const express = require('express');

const app = express();
const port = 3001;

app.use(express.json());

const absencesData = [
  { date: '2024-01-01', nom: 'Mohamed Aloui', absence: 'Maladie', genre: 'Homme', company: 'Societe A' },
  { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'Congé Maternité', genre: 'Femme', company: 'Societe B' },
  { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'Congé Maternité', genre: 'Femme', company: 'Societe B' },
  { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'Congé Maternité', genre: 'Femme', company: 'Societe B' },
  { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'Congé Maternité', genre: 'Femme', company: 'Societe B' },
  { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'Congé Maternité', genre: 'Femme', company: 'Societe B' }, { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'Congé Maternité', genre: 'Femme', company: 'Societe B' },
  { date: '2024-01-02', nom: 'aaaa',            absence: 'Congé Maternité', genre: 'Femme', company: 'Societe B' },
  { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'formation externe', genre: 'Femme', company: 'Societe B' }, { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'Congé Maternité', genre: 'Femme', company: 'Societe B' },
  { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'formation externe', genre: 'Femme', company: 'Societe B' },
  { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'formation interne', genre: 'Femme', company: 'Societe B' },
  { date: '2024-01-02', nom: 'Jafra dhaouadi', absence: 'Congé Maternité', genre: 'Femme', company: 'Societe B' },
  // Ajoutez d'autres absences selon vos besoins
];

app.get('/api/absences', (req, res) => {
  const { year, company } = req.query;
  console.log(`Year: ${year}, Company: ${company}`); // Log des paramètres de la requête

  let filteredAbsences = absencesData;

  if (year) {
    filteredAbsences = filteredAbsences.filter(a => a.date.startsWith(year));
  }
  if (company) {
    filteredAbsences = filteredAbsences.filter(a => a.company === company);
  }

  console.log('Filtered Absences:', filteredAbsences); // Log des données filtrées

  res.json(filteredAbsences);
});

app.get('/api/years', (req, res) => {
  const years = [...new Set(absencesData.map(a => a.date.split('-')[0]))];
  res.json(years);
});

app.get('/api/companies', (req, res) => {
  const companies = [...new Set(absencesData.map(a => a.company))];
  res.json(companies);
});

app.listen(port, () => {
  console.log(`Serveur API en écoute sur le port ${port}`);
});
