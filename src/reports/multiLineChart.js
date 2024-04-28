import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Services from '../helper/http';
import { TextField } from '@mui/material';
import { MenuItem } from 'mui-core';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  elements: {
    line: {
      tension: 0.4
    }
  },
  scales: {
    xAxes: [{
      type: 'time',
      ticks: {
        autoSkip: true,
        maxTicksLimit: 20,
      },
      display: true,
      scaleLabel: {
        display: true,
        labelString: "Point"
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0
      }
    }],
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      ticks: {
        font: {
          family: 'IRANYekan',
        }
      }
    },
    x: {
      ticks: {
        font: {
          family: 'IRANYekan'
        }
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
    labels: {
      // This more specific font property overrides the global property
      font: {
        size: 14,
        family: 'IRANYekan'
      }
    },
    title: {
      display: true,
    },
  },
};

const labels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهـر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];



export function MultiLineChart(props) {
  const [dataCh, setdata] = useState([])


  // useEffect(() => {
  //   setdata(props?.dataa)
  // }, [props?.dataa])

  const data = {
    labels,
    datasets: [
      {
        label: 'تعداد نصب',
        data: props?.dataa,
        borderColor: 'rgb(20, 200, 220)',
        backgroundColor: 'rgb(20, 200, 220)',
        yAxisID: 'y',
      },
      // {
      //   label: ' نصب',
      //   data: [15,36,87,52,2,24,45],
      //   borderColor: 'rgb(40, 220, 200)',
      //   backgroundColor: 'rgb(40, 220, 200)',
      //   yAxisID: 'y',
      // } 
    ],
  }

  const services = new Services();
  //get Chart By Date
  async function getChartByDate(e) {
    //get all resource data
    props?.GetContractChart({ id: props?.contractId, year: e });
    // let response = await services.get(`${InstalledPowerhouseByMonthReport}?Id=${props?.contractId}&Year=${e}`);
    // let resData = response.result;
    // setAllContracts(resData);

    // setisLoading(false);
  }
  return <>
    <TextField
      id="outlined-select-currency"
      select
      size='small'
      className='chartDateSelect'
      label="سال"
      defaultValue={new Date().getFullYear()}
      // helperText="Please select your currency"
      onChange={(e) => getChartByDate(e.target.value)}
    >
      <MenuItem value={2023}>1402</MenuItem>
      <MenuItem value={2024}>1403</MenuItem>
      <MenuItem value={2025}>1404</MenuItem>
      <MenuItem value={2026}>1405</MenuItem>
      <MenuItem value={2027}>1406</MenuItem>
      <MenuItem value={2028}>1407</MenuItem>
      <MenuItem value={2029}>1408</MenuItem>
      <MenuItem value={2030}>1409</MenuItem>
    </TextField>
    <Line options={options} data={data} height={100} />
  </>
}
