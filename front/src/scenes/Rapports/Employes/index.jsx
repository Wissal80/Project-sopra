import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../theme";

const Demandes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/employees';

    axios.get(apiUrl)
      .then(response => {
        console.log('Données reçues:', response.data);
        setMessage(response.data.message);
        setData(response.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur de l\'API:', err);
        setError('Erreur de connexion à l\'API');
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Erreur: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {/* HEADER */}
      <Box textAlign="center" my={4}>
        <Typography variant="h3" gutterBottom>
          Rapport détaillé des employées
        </Typography>
      </Box>

      {/* API Message */}
      {message && (
        <Box mb={4} p={2} bgcolor={colors.background?.alt || '#f5f5f5'} borderRadius={2} boxShadow={3}>
          <Typography color={colors.primary || '#1e88e5'}>
            {message}
          </Typography>
        </Box>
      )}

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Département</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.department}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Aucune donnée disponible.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default Demandes;
