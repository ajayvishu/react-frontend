import React, { useState, useEffect } from 'react';
import ApiService from '../../../ApiService';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  CircularProgress,
  Chip,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const SalesLog = () => {
  const [SalesLog, setSalesLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ApiService.get('student/saleslogdata');
      if (response.status === 200) {
        setSalesLog(response.data);
      } else {
        console.error('Error fetching data from API');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedSalesLog = [...SalesLog].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });

  const filteredAndSortedSalesLog = sortedSalesLog.filter((sale) =>
    Object.values(sale).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <DashboardCard title="Sales Log Data">
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearch}
        />
        {loading ? (
          // Display a loading spinner while data is being fetched
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: 'nowrap',
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell key="LogId">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    onClick={() => handleSort('LogId')}
                  >
                    Log Id
                  </Typography>
                </TableCell>
                <TableCell key="CSVFileName">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    onClick={() => handleSort('CSVFileName')}
                  >
                    CSV File Name
                  </Typography>
                </TableCell>
                <TableCell key="SendTime">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    onClick={() => handleSort('SendTime')}
                  >
                    Send Time
                  </Typography>
                </TableCell>
                <TableCell key="ResponseTime">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    onClick={() => handleSort('ResponseTime')}
                  >
                    Response Time
                  </Typography>
                </TableCell>
                <TableCell key="Status">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    onClick={() => handleSort('Status')}
                  >
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedSalesLog
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sale) => (
                  <TableRow key={sale.LogId}>
                    <TableCell>
                      <Typography variant="h6">{sale.LogId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{sale.CSVFileName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {new Date(sale.SendTime).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {new Date(sale.ResponseTime).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {sale.Status === 'S' ? (
                        <Chip
                          sx={{
                            px: '4px',
                            backgroundColor: 'success.main',
                            color: '#fff',
                          }}
                          size="small"
                          label="Success"
                        />
                      ) : (
                        <Chip
                          sx={{
                            px: '4px',
                            backgroundColor: 'error.main', // Adjust color based on your requirements
                            color: '#fff',
                          }}
                          size="small"
                          label="Error"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAndSortedSalesLog.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Box>
    </DashboardCard>
  );
};

export default SalesLog;
