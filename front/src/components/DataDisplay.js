import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const DataDisplay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Typography variant="h4" gutterBottom>{data.title}</Typography>
      <Typography variant="body1" paragraph>{data.description}</Typography>
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Box>
  );
};

export default DataDisplay;
