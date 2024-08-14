import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001; // Assurez-vous que c'est le bon port

app.use(cors());

// Données d'exemple
const data  = [
  {
    year: '2021',
    organizationUnit: 'Unit1',
    position: 'Consultante',
    contractType: 'CDI',
    employee: 'Ines Abid',
    company: 'Agile france',
    requestStatus: 'Validée',
    totalRequests: 2182,
    requestsToReview: 292,
    approvedRequests: 271,
    rejectedRequests: 528
  },
  {
    year: '2022',
    organizationUnit: 'Unit2',
    position: 'Poste2',
    contractType: 'CDD',
    employee: 'Employé2',
    company: 'Société2',
    requestStatus: 'Rejetée',
    totalRequests: 1500,
    requestsToReview: 300,
    approvedRequests: 200,
    rejectedRequests: 1000
  },
  {
    year: '2022',
    organizationUnit: 'Unit3',
    position: 'Poste3',
    contractType: 'CDI',
    employee: 'Employé3',
    company: 'Société3',
    requestStatus: 'Validée',
    totalRequests: 1800,
    requestsToReview: 400,
    approvedRequests: 1200,
    rejectedRequests: 200
  },
  {
    year: '2023',
    organizationUnit: 'Unit4',
    position: 'Poste4',
    contractType: 'CDD',
    employee: 'Employé4',
    company: 'Société4',
    requestStatus: 'Validée',
    totalRequests: 2000,
    requestsToReview: 500,
    approvedRequests: 1300,
    rejectedRequests: 200
  },
  {
    year: '2023',
    organizationUnit: 'Unit5',
    position: 'Poste5',
    contractType: 'CDI',
    employee: 'Employé5',
    company: 'Société5',
    requestStatus: 'Rejetée',
    totalRequests: 2200,
    requestsToReview: 600,
    approvedRequests: 1400,
    rejectedRequests: 200
  },
  // Ajoutez d'autres objets de données ici
];

// Endpoint pour obtenir les données d'analyse
app.get('/data', (req, res) => {
  console.log('GET /EntréesSorties called');
  res.json(data);
});
app.get('/test', (req, res) => {
  res.send('Test endpoint is working!');
});


app.get('/api/taux-entree', (req, res) => {
  const tauxEntree = data.reduce((acc, item) => acc + item.approvedRequests, 0) / data.reduce((acc, item) => acc + item.totalRequests, 0) * 100;
  res.json({ tauxEntree: tauxEntree.toFixed(2) });
});


app.get('/api/taux-sortie', (req, res) => {
  const tauxSortie = data.reduce((acc, item) => acc + item.rejectedRequests, 0) / data.reduce((acc, item) => acc + item.totalRequests, 0) * 100;
  res.json({ tauxSortie: tauxSortie.toFixed(2) });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
