import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import { tokens } from "../../theme";
import Header from "../../components/Header";

const EntréesSorties = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:3002/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box m="2px">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center" mb="10px">
        <Typography variant="h3">
          Analyse des Entrées Sorties
        </Typography>
      </Box>

      {/* Contenu */}
      <Box display="flex" justifyContent="center" mt="5px">
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Année</TableCell>
                  <TableCell>Unité d'organisation</TableCell>
                  <TableCell>Poste</TableCell>
                  <TableCell>Type de contrat</TableCell>
                  <TableCell>Employé</TableCell>
                  <TableCell>Société</TableCell>
                  <TableCell>Status de la demande</TableCell>
                  <TableCell>Demandes totales</TableCell>
                  <TableCell>Demandes à revoir</TableCell>
                  <TableCell>Demandes approuvées</TableCell>
                  <TableCell>Demandes rejetées</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.organizationUnit}</TableCell>
                    <TableCell>{row.position}</TableCell>
                    <TableCell>{row.contractType}</TableCell>
                    <TableCell>{row.employee}</TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.requestStatus}</TableCell>
                    <TableCell>{row.totalRequests}</TableCell>
                    <TableCell>{row.requestsToReview}</TableCell>
                    <TableCell>{row.approvedRequests}</TableCell>
                    <TableCell>{row.rejectedRequests}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default EntréesSorties;
