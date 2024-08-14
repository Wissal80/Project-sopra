import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from 'axios';

const Candidatures = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Remplacez l'URL par l'URL de votre API
    axios.get('http://localhost:4848/api/candidatures')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box m="2px">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center" mb="10px">
        <Typography variant="h3">
          Analyse des candidatures
        </Typography>
      </Box>

      {/* Contenu */}
      <Box display="flex" justifyContent="center" mt="5px">
        {/* Affichage des données ici */}
        {/* Exemple d'affichage si les données sont un tableau */}
        {data && data.length > 0 ? (
          <Box>
            {data.map((item, index) => (
              <Typography key={index}>{item.someField}</Typography> // Ajustez selon votre structure de données
            ))}
          </Box>
        ) : (
          <Typography>Aucune donnée disponible</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Candidatures;
