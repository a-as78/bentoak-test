import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Products from '../components/products/ProductsTab';
import Charts from '../components/charts/ChartsTab';

export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 'calc(100% - 40px)', padding: '20px' }}>
      <Box sx={{ paddingBottom: '20px' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Products" />
          <Tab label="Charts" />
        </Tabs>
      </Box>
      {value === 0 && <Products />}
      {value === 1 && <Charts />}
    </Box>
  );
}
