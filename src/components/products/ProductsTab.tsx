import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { TextField, TablePagination } from '@mui/material';
import MUITable from '../layout/MUITable';
import fetchProducts from '../../services/ProductsService';

const ProductsTab = () => {
  const { data: products, isLoading, error } = useQuery('products', fetchProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  const filteredProducts = products.filter((product: any) => 
    Object.values(product).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'price', label: 'Price' },
  ];

  return (
    <>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <MUITable 
        data={filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} 
        headers={tableHeaders}
      />
      <TablePagination
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 15, 20]}
      />
    </>
  );
};

export default ProductsTab;
