'use client';

import Chart, { Props } from 'react-apexcharts';

const state: Props['series'] = [
  {
    name: '2023',
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: '2024',
    data: [11, 32, 45, 32, 34, 52, 41],
  },
];

const options: Props['options'] = {
  chart: {
    type: 'area',
    animations: {
      easing: 'linear',
      speed: 300,
    },
    sparkline: {
      enabled: false,
    },
    brush: {
      enabled: false,
    },
    id: 'basic-bar',
    foreColor: 'hsl(var(--nextui-default-800))',
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    labels: {
      // show: false,
      style: {
        colors: 'hsl(var(--nextui-default-800))',
      },
    },
    axisBorder: {
      color: 'hsl(var(--nextui-nextui-default-200))',
    },
    axisTicks: {
      color: 'hsl(var(--nextui-nextui-default-200))',
    },
  },
  yaxis: {
    labels: {
      style: {
        // hsl(var(--nextui-content1-foreground))
        colors: 'hsl(var(--nextui-default-800))',
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: true,
    borderColor: 'hsl(var(--nextui-default-200))',
    strokeDashArray: 0,
    position: 'back',
  },
  stroke: {
    curve: 'smooth',
    fill: {
      colors: ['red'],
    },
  },
  // @ts-ignore
  markers: false,
};

const Steam = () => {
  return (
    <>
      <div className="z-20 w-full">
        <div id="chart">
          <Chart options={options} series={state} type="area" height={425} />
        </div>
      </div>
    </>
  );
};

export default Steam;