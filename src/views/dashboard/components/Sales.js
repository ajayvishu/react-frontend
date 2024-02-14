import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import ApiService from 'src/ApiService';

const Sales = () => {
    const [sales, setSales] = useState([]);
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
            const token = localStorage.getItem('ModernizeToken');
            const response = await ApiService.get('student/salesdata', {
                Authorization: `Bearer ${token}`,
            });

            if (response.status === 200) {
                setSales(response.data);
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

    const sortedSales = [...sales].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortBy] - b[sortBy];
        } else {
            return b[sortBy] - a[sortBy];
        }
    });

    const filteredAndSortedSales = sortedSales.filter((sale) =>
        Object.values(sale).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );

    return (
        <DashboardCard title="Sales Data">
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
                            <TableRow key="SaleID">
                                <TableCell key="UniqueSessionId">
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                        onClick={() => handleSort('UniqueSessionId')}
                                    >
                                        Unique Id
                                    </Typography>
                                </TableCell>
                                <TableCell key="SaleID">
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                        onClick={() => handleSort('SaleID')}
                                    >
                                        Sale Id
                                    </Typography>
                                </TableCell>
                                <TableCell key="StoreID">
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                        onClick={() => handleSort('StoreID')}
                                    >
                                        Store Id
                                    </Typography>
                                </TableCell>
                                <TableCell key="SaleQty">
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                        onClick={() => handleSort('SaleQty')}
                                    >
                                        Sale Qty
                                    </Typography>
                                </TableCell>
                                <TableCell key="SaleTotal">
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                        onClick={() => handleSort('SaleTotal')}
                                    >
                                        Sale Total
                                    </Typography>
                                </TableCell>
                                <TableCell key="SaleUserName">
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                        onClick={() => handleSort('SaleUserName')}
                                    >
                                        Sale User Name
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAndSortedSales
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((sale) => (
                                    <TableRow key={sale.saleID}>
                                        <TableCell>
                                            <Typography variant="h6">{sale.UniqueSessionId}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">{sale.SaleID}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">{sale.StoreID}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">{sale.SaleQty}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">{sale.SaleTotal}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">{sale.SaleUserName}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                )}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredAndSortedSales.length}
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

export default Sales;
