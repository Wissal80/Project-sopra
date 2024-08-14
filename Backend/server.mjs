import express from 'express';
import { faker } from '@faker-js/faker';

const app = express();
const port = 3001;

app.use(express.json());

const generateEmployees = (num) => {
  const employees = [];
  for (let i = 1; i <= num; i++) {
    employees.push({
      id: i,
      name: faker.person.fullName(), // Updated method
      position: faker.person.jobTitle(), // Updated method
      email: faker.internet.email(),
      department: faker.commerce.department()
    });
  }
  return employees;
};

app.get('/employees', (req, res) => {
  const employees = generateEmployees(100); // Generate 100 employees
  res.json({
    message: 'Data fetched successfully',
    data: employees
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
