import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import ApiService from 'src/ApiService';

const SalesOverview = () => {
  const [storeno, setStoreNo] = React.useState([]);
  const [selectedStore, setSelectedStore] = React.useState([]);

  const handleStoreChange = (event) => {
    const selectedStoreNo = event.target.value;
    setSelectedStore(selectedStoreNo);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('ModernizeToken');

      const response = await ApiService.get('student/storenodata', {
        Authorization: `Bearer ${token}`,
      });
      if (response.status === 200) {
        setStoreNo(response.data);
        // Set default selected store to the first one in the response data
        if (response.data.length > 0) {
          setSelectedStore(response.data[0].StoreID);
        }
      } else {
        console.error('Error fetching data from API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: 'Eanings this month',
      data: [355, 390, 300, 350, 390, 180, 355, 390],
    },
    {
      name: 'Expense this month',
      data: [280, 250, 325, 215, 250, 310, 280, 250],
    },
  ];

  return (
    <DashboardCard
      title="Sales Overview"
      action={
        <Select
          labelId="storeno"
          id="storeno"
          value={selectedStore}
          size="small"
          onChange={handleStoreChange}
          sx={{ width: '125px' }}
        >
          {storeno.map((store) => (
            <MenuItem key={store.StoreID} value={store.StoreID}>
              {store.StoreID}
            </MenuItem>
          ))}
        </Select>
      }
    >
      <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height="370px" />
    </DashboardCard>
  );
};

export default SalesOverview;
